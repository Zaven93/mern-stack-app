import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions/auth'

const Navbar = () => {
    const dispatchData = useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return (
        <nav className="navbar bg-dark">
            <h1>
                {/* <a href="index.html">
                    <i className="fas fa-code"></i> DevConnector
                </a> */}
                <NavLink
                    exact
                    to="/"
                    activeStyle={{
                        color: '#17a2b8'
                    }}>
                    <i className="fas fa-code"></i> DevConnector
                </NavLink>
            </h1>
            <ul>
                {isAuthenticated ? (
                    <>
                        <li>
                            <NavLink to="/profiles">Developers</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard"
                                activeStyle={{
                                    color: '#17a2b8'
                                }}>
                                Dashboard <i className="fas fa-user"></i>
                            </NavLink>
                        </li>
                        <li>
                            <Link to="/" onClick={() => dispatchData(logout())}>
                                Logout <i className="fas fa-sign-out-alt"></i>
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink
                                to="/register"
                                activeStyle={{
                                    color: '#17a2b8'
                                }}>
                                Register
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="login"
                                activeStyle={{
                                    color: '#17a2b8'
                                }}>
                                Login
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
