import React, { useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addExperience } from '../../actions/profile'

const initialState = {
    title: '',
    company: '',
    location: '',
    from: '',
    to: null,
    current: false,
    description: ''
}

const reducer = (state, { field, value }) => {
    return {
        ...state,
        [field]: value
    }
}

const AddExperience = ({ history }) => {
    const dispatchData = useDispatch()

    const [state, dispatch] = useReducer(reducer, initialState)

    const [disableToData, toggleToDate] = useState(false)

    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        dispatchData(addExperience(state, history))
    }

    const { title, company, location, from, to, current, description } = state

    console.log('State data', state)
    return (
        <>
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming positions that
                you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={company}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
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
                                toggleToDate(!disableToData)
                            }}
                        />{' '}
                        Current Job
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={onChange}
                        disabled={disableToData}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
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

export default AddExperience
