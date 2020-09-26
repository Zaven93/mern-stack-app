import React from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { deleteEducation } from '../../actions/profile'

const Education = ({ education }) => {
    const dispatchData = useDispatch()
    return (
        <>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                    </tr>
                </thead>
                <tbody>
                    {education.map((educ) => (
                        <tr key={educ._id}>
                            <td>{educ.school}</td>
                            <td className="hide-sm">{educ.degree}</td>
                            <td>
                                <Moment format="YYYY/MM/DD">{educ.from}</Moment> -{' '}
                                {educ.to === null ? (
                                    ' Current'
                                ) : (
                                    <Moment format="YYYY/MM/DD">{educ.to}</Moment>
                                )}
                            </td>
                            <td>
                                <button
                                    onClick={() => dispatchData(deleteEducation(educ._id))}
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

export default Education
