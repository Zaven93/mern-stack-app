import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getAllProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = () => {
    const { profiles, loading } = useSelector((state) => state.profile)

    const dispatchData = useDispatch()

    useEffect(() => {
        dispatchData(getAllProfiles())
    }, [dispatchData])

    console.log('Profiles', profiles)
    console.log('Loading', loading)
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdeveloper"></i> Browse and connect with
                        developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.map((profile) => (
                                <ProfileItem key={profile._id} profile={profile && profile} />
                            ))
                        ) : (
                            <h4>No profile found...</h4>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default Profiles
