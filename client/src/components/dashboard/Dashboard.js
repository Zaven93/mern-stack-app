import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'
import { deleteAccount } from '../../actions/auth'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import Spinner from '../layout/Spinner'

const Dashboard = () => {
    const dispatchData = useDispatch()

    const profile = useSelector((state) => state.profile)

    console.log('profile experience', profile.profile && profile.profile.education)

    const auth = useSelector((state) => state.auth)
    useEffect(() => {
        dispatchData(getCurrentProfile())
    }, [dispatchData])
    return profile.loading && profile.profile === null ? (
        <Spinner />
    ) : (
        <>
            <h1 className="large text-primary">Dashboard</h1>
            <div className="profile-container">
                <img
                    className="profile-avatar"
                    src={auth.user && auth.user.avatar}
                    alt="User avatar"
                />
                <p className="lead">
                    <i className="fas fa-user"></i>
                    Welcome {auth.user && auth.user.name}
                </p>
            </div>
            {profile.profile === null ? (
                <>
                    <p>You haven't setup a profile yet, please add some info </p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </>
            ) : (
                <>
                    <DashboardActions />
                    {profile.profile.experience.length > 0 && (
                        <Experience experience={profile.profile && profile.profile.experience} />
                    )}
                    {profile.profile.education.length > 0 && (
                        <Education education={profile.profile && profile.profile.education} />
                    )}

                    <div className="my-2">
                        <button
                            className="btn btn-danger"
                            onClick={() => dispatchData(deleteAccount())}>
                            <i className="fas fa-user-minus"></i> Delete My Account
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

export default Dashboard
