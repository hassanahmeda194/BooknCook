import React, { useState, useEffect, useRef } from 'react';
import Logo from "../../assets/logo.png";
import { Link, usePage } from '@inertiajs/react';

const Navbar = () => {
    const { auth } = usePage().props;
    console.log(auth);

    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null); // Reference for detecting outside clicks

    // Function to handle clicks outside the dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-body-secondary">
            <div className="container">
                <a className="navbar-brand fw-semibold" href="#">
                    <img src={Logo} alt="Logo" style={{ height: "45px" }} />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {auth.user && (
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                            </li>
                        )}
                        {auth.user?.role == "chief" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/appointments">Appointments</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/availability">Availability</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/propsals">Propsal</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/earning">Earning</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {auth.user ? (
                            <li className="nav-item dropdown" ref={dropdownRef}>
                                <divF className="nav-link dropdown-toggle" role="button" onClick={() => setDropdown(!dropdown)}>
                                    <img src={auth.user.avatar || 'https://placehold.co/600x600'} alt="User" className="rounded-circle" style={{ width: "40px", height: "40px" }} />
                                </divF>
                                <ul className={`dropdown-menu dropdown-menu-end ${dropdown ? "d-block" : "d-none"}`}>
                                    <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                                    <li><Link className="dropdown-item" href="/logout" method="post" as="button">Logout</Link></li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/user-register">Book a Chef</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/chief-register">Become a Chef</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/login">Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
