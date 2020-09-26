import React from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../layout/Spinner'

const Profile = ({ match }) => {
    const profiles = useSelector((state) => state.profile.profiles)
    const searchingProfile = profiles.find((profile) => profile.user._id === match.params.id)
    return <div>Hello</div>
}

export default Profile
