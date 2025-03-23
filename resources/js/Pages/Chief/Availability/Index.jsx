import { Link } from '@inertiajs/react'
import React from 'react'

const Index = () => {
    return (
        <div>
            <div className="mb-5 d-flex align-items-center justify-content-between">
                <div>
                    <h4>Availability</h4>
                </div>
                <div>
                    <Link className="btn btn-dark" href="/add-availability">Add</Link>
                </div>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <td>Sno</td>
                        <td>start time</td>
                        <td>end time</td>
                        <td>date</td>
                        <td>booking status</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Index