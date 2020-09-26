import React from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { deleteExperience } from '../../actions/profile'

const Experience = ({ experience }) => {
    const dispatchData = useDispatch()
    return (
        <>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                    </tr>
                </thead>
                <tbody>
                    {experience.map((exp) => (
                        <tr key={exp._id}>
                            <td>{exp.company}</td>
                            <td className="hide-sm">{exp.title}</td>
                            <td>
                                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
                                {exp.to === null ? (
                                    ' Current'
                                ) : (
                                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                                )}
                            </td>
                            <td>
                                <button
                                    onClick={() => dispatchData(deleteExperience(exp._id))}
                                    className="btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Experience
