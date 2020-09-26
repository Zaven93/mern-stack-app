const { validationResult } = require('express-validator')
const config = require('config')
const request = require('request')
const Profile = require('../models/Profile')
const User = require('../models/User')
const Post = require('../models/Post')
const { remove } = require('../models/User')

module.exports = {
    getProfile: async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
                'name',
                'avatar'
            ])

            if (!profile) {
                return res.status(400).json({ message: 'There is no any profile for this user' })
            }

            res.json(profile)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    createProfile: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body

        let profileFields = {}
        profileFields.user = req.user.id
        if (company) profileFields.company = company
        if (website) profileFields.website = website
        if (location) profileFields.location = location
        if (bio) profileFields.bio = bio
        if (status) profileFields.status = status
        if (githubusername) profileFields.githubusername = githubusername
        if (skills) {
            profileFields.skills = skills.split(',').map((skill) => skill.trim())
        }

        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube
        if (facebook) profileFields.social.facebook = facebook
        if (twitter) profileFields.social.twitter = twitter
        if (instagram) profileFields.social.instagram = instagram
        if (linkedin) profileFields.social.linkedin = linkedin

        try {
            let profile = await Profile.findOne({ user: req.user.id })

            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                return res.json(profile)
            }

            profile = new Profile(profileFields)

            await profile.save()
            res.json(profile)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    getAllProfiles: async (req, res) => {
        try {
            const profiles = await Profile.find().populate('user', ['name', 'avatar'])

            if (!profiles) {
                return res.status(400).json({ message: 'Sorry no profile was found' })
            }

            res.json(profiles)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    getProfileById: async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [
                'name',
                'avatar'
            ])

            if (!profile) {
                return res.status(400).json({ message: 'There is no any profile for this user' })
            }

            res.json(profile)
        } catch (error) {
            console.log(error)
            if (error.kind == 'ObjectId') {
                return res.status(400).json({ message: 'Profile not found' })
            }
            res.status(500).send('Server error')
        }
    },

    deleteProfile: async (req, res) => {
        try {
            await Post.deleteMany({ user: req.user.id })
            await Profile.findOneAndRemove({ user: req.user.id })
            await User.findOneAndRemove({ _id: req.user.id })

            res.json({ message: 'User has been successfully deleted' })
        } catch (error) {
            console.log(error)
            res.status(500).json('Server error')
        }
    },

    addExperience: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { title, company, location, from, to, current, description } = req.body

        let experience = {}
        experience.title = title
        experience.company = company
        experience.from = from
        if (location) experience.location = location
        if (to) experience.to = to
        if (current) experience.current = current
        if (description) experience.description = description

        try {
            let profile = await Profile.findOne({ user: req.user.id })
            profile.experience.unshift(experience)

            await profile.save()
            res.json(profile)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    removeExperience: async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id })
            const removeIndex = profile.experience
                .map((item) => item.id)
                .indexOf(req.params.experience_id)
            profile.experience.splice(removeIndex, 1)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    addEducation: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { school, degree, fieldofstudy, from, to, current, description } = req.body

        let education = {
            school,
            degree,
            fieldofstudy,
            from,
            current,
            to,
            description
        }

        // if (to) education.to = to
        // if (description) education.description = description

        try {
            const profile = await Profile.findOne({ user: req.user.id })

            profile.education.unshift(education)

            await profile.save()
            res.json(profile)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    removeEducation: async (req, res) => {
        try {
            const profile = await Profile.findOne({ user: req.user.id })

            const removeIndex = profile.education
                .map((educ) => educ.id)
                .indexOf(req.params.education_id)

            profile.education.splice(removeIndex, 1)

            await profile.save()
            res.json(profile)
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    },

    getGithubUser: async (req, res) => {
        try {
            const options = {
                uri: `https://api.github.com/users/${
                    req.params.username
                }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                    'GITHUB_CLIENT_ID'
                )}&client_secret=${config.get('GITHUB_SECRET')}`,
                method: 'GET',
                headers: { 'user-agent': 'node.js' }
            }

            request(options, (error, response, body) => {
                if (error) console.log(error)

                if (response.statusCode !== 200) {
                    return res.status(404).json({ message: 'No Github profile found' })
                }

                res.json(JSON.parse(body))
            })
        } catch (error) {
            console.log(error)
            res.status(500).send('Server error')
        }
    }
}
