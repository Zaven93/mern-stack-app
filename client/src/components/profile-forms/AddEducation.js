import React, { useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addEducation } from '../../actions/profile'

const initialState = {
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    current: false,
    to: null,
    description: ''
}

const reducer = (state, { field, value }) => {
    return {
        ...state,
        [field]: value
    }
}

const AddEducation = ({ history }) => {
    const dispatchData = useDispatch()

    const [state, dispatch] = useReducer(reducer, initialState)

    const [disableToDate, toggleToDate] = useState(false)

    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        dispatchData(addEducation(state, history))
    }

    const { school, degree, fieldofstudy, from, current, to, description } = state

    return (
        <>
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that you
                have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field Of Study"
                        name="fieldofstudy"
                        value={fieldofstudy}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={onChange} />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            value={current}
                            onChange={(e) => {
                                dispatch({ field: e.target.name, value: !current })
                                toggleToDate(!disableToDate)
                            }}
                        />{' '}
                        Current School or Bootcamp
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={onChange}
                        disabled={disableToDate}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Program Description"
                        value={description}
                        onChange={onChange}></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </>
    )
}

export default AddEducation
