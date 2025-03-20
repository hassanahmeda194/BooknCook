import React from 'react'
import Navbar from '../Components/Navbar'

const Layout = ({ children }) => {
    return (
        <div className=''>
            <Navbar />
            <div className="container mt-5">
                {children}
            </div>
        </div>
    )
}

export default Layout