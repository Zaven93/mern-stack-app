import React, { useReducer } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { register, loadUser } from '../../actions/auth'

const initialState = {
    name: '',
    email: '',
    password: '',
    password2: '',
    avatar: ''
}

const reducer = (state, { field, value }) => {
    return {
        ...state,
        [field]: value
    }
}

const Register = () => {
    const dispatchData = useDispatch()

    const [state, dispatch] = useReducer(reducer, initialState)

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            return dispatch({ field: 'avatar', value: e.target.files[0] })
        }
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (password !== password2) {
            return dispatchData(setAlert("Passwords don't match", 'danger'))
        }
        try {
            await dispatchData(register(state))

            await dispatchData(loadUser())
        } catch (error) {
            console.log(error)
        }
    }

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    const { name, email, password, password2 } = state
    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" encType="multpart/form-data" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={password2}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="file"
                        placeholder="Upload Avatar"
                        name="avatar"
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </>
    )
}

export default Register
