import axios from 'axios'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    DELETE_ACCOUNT
} from '../actions/types'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'

export const login = ({ email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post('/api/auth', body, config)

        dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    } catch (error) {
        dispatch({ type: LOGIN_FAIL })
        console.log(error)
    }
}

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT })
    dispatch({ type: CLEAR_PROFILE })
}

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth')

        dispatch({ type: USER_LOADED, payload: res.data })
    } catch (error) {
        dispatch({ type: AUTH_ERROR })
        console.log(error)
    }
}

export const register = ({ name, email, password, avatar }) => async (dispatch) => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    if (avatar) {
        formData.append('avatar', avatar)
    }
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const res = await axios.post('/api/users', formData, config)

        dispatch({ type: REGISTER_SUCCESS, payload: res.data })

        console.log('Data from the server', res.data)
    } catch (error) {
        const errors = error.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.message, 'danger')))

            dispatch({
                type: REGISTER_FAIL
            })
        }
    }
}

export const deleteAccount = () => async (dispatch) => {
    window.confirm('Are you sure you want to delete your account?')
    try {
        const res = await axios.delete('/api/profile')

        dispatch({ type: DELETE_ACCOUNT })

        dispatch({ type: CLEAR_PROFILE })

        dispatch(setAlert(res.data.message, 'success'))
    } catch (error) {
        console.log(error)
    }
}
