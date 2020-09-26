import axios from 'axios'
import {
    GET_PROFILE,
    PROFILE_ERROR,
    CREATE_PROFILE,
    UPDATE_PROFILE,
    DELETE_EXPERIENCE,
    DELETE_EDUCATION,
    GET_PROFILES
} from './types'
import { setAlert } from '../actions/alert'

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({ type: GET_PROFILE, payload: res.data })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const createProfile = (data, history, edit = false) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(data)
    try {
        const res = await axios.post('/api/profile', body, config)

        dispatch({ type: CREATE_PROFILE, payload: res.data })

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

        if (!edit) {
            history.push('/dashboard')
        }
    } catch (error) {
        const errors = error.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.message, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const addExperience = (data, history) => async (dispatch) => {
    const config = {
        headers: {
            'Conent-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put('/api/profile/experience', data, config)

        dispatch({ type: UPDATE_PROFILE, payload: res.data })

        dispatch(setAlert('Experience added', 'success'))

        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.message, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const addEducation = (data, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.put('/api/profile/education', data, config)

        dispatch({ type: UPDATE_PROFILE, payload: res.data })

        dispatch(setAlert('Education is added', 'success'))

        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.message, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const deleteExperience = (exp_id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/experience/${exp_id}`)

        dispatch({ type: DELETE_EXPERIENCE, payload: res.data })

        dispatch(setAlert('Experience has been deleted', 'success'))
    } catch (error) {
        const errors = error.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.message, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const deleteEducation = (educ_id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/education/${educ_id}`)

        dispatch({ type: DELETE_EDUCATION, payload: res.data })

        dispatch(setAlert('Education has been deleted', 'success'))
    } catch (error) {
        const errors = error.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.message, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}

export const getAllProfiles = () => async (dispatch) => {
    try {
        const res = await axios.get('api/profile')
        dispatch({ type: GET_PROFILES, payload: res.data })
    } catch (error) {
        const errors = error.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.message, 'danger')))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { message: error.response.statusText, status: error.response.status }
        })
    }
}
