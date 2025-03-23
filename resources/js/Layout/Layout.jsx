import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { usePage } from '@inertiajs/react';

const Layout = ({ children }) => {
    const { flash } = usePage().props;
    const [alert, setAlert] = useState({ type: '', message: '' });

    useEffect(() => {
        if (flash.success) {
            setAlert({ type: 'success', message: flash.success });
        } else if (flash.error) {
            setAlert({ type: 'danger', message: flash.error });
        }
    }, [flash]);

    return (
        <div>
            <Navbar />

            <div className="container mb-2">
                <div className='my-2'>
                    {alert.message && (
                        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                            {alert.message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert({ type: '', message: '' })}></button>
                        </div>
                    )}
                </div>
                <div className='mt-2 pt-4'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
