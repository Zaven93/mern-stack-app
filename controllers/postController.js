const { validationResult } = require('express-validator')
const User = require('../models/User')
const Post = require('../models/Post')

module.exports = {
    createPost: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const user = await User.findById(req.user.id).select('-password')

            const post = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })

            await post.save()

            res.json(post)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    getPosts: async (req, res) => {
        try {
            const posts = await Post.find().sort({ date: -1 })

            res.json(posts)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    getPostById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.post_id)

            if (!post) {
                return res.status(404).json({ message: 'Post is not found' })
            }

            res.json(post)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    removePostById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.post_id)

            if (!post) {
                return res.status(404).json({ message: "Post doesn't exist" })
            }

            //Check user
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({ message: 'User not authorized' })
            }

            await post.remove()

            res.json({ message: 'Post is removed' })
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    addLike: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            if (!post) {
                return res.status(400).json({ message: "Post doesn't exist" })
            }

            if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({
                    message: 'The comment has already been liked'
                })
            }

            post.likes.unshift({ user: req.user.id })

            await post.save()
            res.json(post)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    removeLike: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({ message: 'Post has not yet been liked' })
            }

            const removeIndex = post.likes.map((like) => like.user.toString()).indexOf(req.user.id)

            post.likes.splice(removeIndex, 1)

            await post.save()

            res.json(post)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    addComment: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const post = await Post.findById(req.params.id)
            const user = await User.findById(req.user.id)

            if (!post) {
                return res.status(400).json({ message: "Post doesn't exist" })
            }

            if (!user) {
                return res.status(400).json({ message: "User doesn't exist" })
            }

            const newComment = {
                user: req.user.id,
                text: req.body.text,
                name: user.name,
                avatar: user.avatar
            }

            post.comments.unshift(newComment)

            await post.save()
            res.json(post)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    removeCommentById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            if (!post) {
                return res.status(400).json({ message: "Post doesn't exist" })
            }

            const comment = post.comments.find((comment) => comment.id === req.params.comment_id)

            if (!comment) {
                return res.status(404).json({ message: "Comment doesn't exist" })
            }

            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({ message: 'User is not authorized' })
            }

            const removeIndex = post.comments
                .map((comment) => comment.id.toString())
                .indexOf(req.params.comment_id)

            post.comments.splice(removeIndex, 1)

            await post.save()

            res.json(post)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    }
}
