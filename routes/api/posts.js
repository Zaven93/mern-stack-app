const { Router } = require('express')
const auth = require('../../middleware/auth')
const postController = require('../../controllers/postController')
const { postValidator, commentValidator } = require('../../utils/validator')
const { route } = require('./auth')
const router = Router()

//@route POST /api/posts
//@description Create a new post
//@access Private
router.post('/', auth, postValidator, postController.createPost)

//@route GET /api/posts
//@description Get all the posts
//@access Private
router.get('/', auth, postController.getPosts)

//@route GET /api/post:post_id
//@description Get post by id
//@access Private
router.get('/:post_id', auth, postController.getPostById)

//@route DELETE /api/post/:post_id
//@description Delete post by id
//@access Private
router.delete('/:post_id', auth, postController.removePostById)

//@route PUT /api/posts/like/:id
//@description Add like to the post
//@access Private
router.put('/like/:id', auth, postController.addLike)

//@route PUT /api/posts/unlike/:id
//@description Remove like by id
//@access Private
router.put('/unlike/:id', auth, postController.removeLike)

//@route PUT /api/posts/comment
//@description Add comment to the post
//@access Public
router.put('/comment/:id', auth, commentValidator, postController.addComment)

//@route DELETE /api/posts/comment/:id/:comment_id
//@description Delete comment by id
//@access Private
router.delete('/comment/:id/:comment_id', auth, postController.removeCommentById)

module.exports = router
