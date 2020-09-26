import React, { useReducer } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login, loadUser } from '../../actions/auth'

const initialState = {
    email: '',
    password: ''
}

const reducer = (state, { field, value, type }) => {
    if (type && type === 'CLEAR_STATE') {
        return {
            ...initialState
        }
    }
    return {
        ...state,
        [field]: value
    }
}

const Login = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const dispatchData = useDispatch()

    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            await dispatchData(login(state))

            await dispatchData(loadUser())

            await dispatch({ type: 'CLEAR_STATE' })
        } catch (error) {
            console.log(error)
        }
    }

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    const { email, password } = state
    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign Into Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </>
    )
}

export default Login
