import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

const UserRegister = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        avatar: null,
        phone_number: '',
    });

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    function submit(e) {
        e.preventDefault();
        post('/submit-user-register', { data });
    }

    return (
        <div>
            <h4 className="mb-4 fw-semibold">Chief Register</h4>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-6 mb-4">
                        <label className="form-label">Name</label>
                        <input
                            type="text" className="form-control"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="Enter your name"
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="col-6 mb-4">
                        <label className="form-label">Email</label>
                        <input
                            type="email" className="form-control"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            placeholder="Enter your email"
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="col-6 mb-4">
                        <label className="form-label">Password</label>
                        <input
                            type="password" className="form-control"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            placeholder="Enter your password"
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <div className="col-6 mb-4">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="tel" className="form-control"
                            value={data.phone_number}
                            onChange={e => setData('phone_number', e.target.value)}
                            placeholder="Enter your phone number"
                        />
                        {errors.phone_number && <div className="text-danger">{errors.phone_number}</div>}
                    </div>
                    <div className="col-6 mb-4">
                        <label className="form-label">Avatar</label>
                        <input
                            type="file" className="form-control"
                            onChange={handleImageChange}
                        />
                        {errors.avatar && <div className="text-danger">{errors.avatar}</div>}
                    </div>
                    {imagePreview && (
                        <div className="col-6 mb-4">
                            <img src={imagePreview} alt="Preview" className="img-thumbnail" style={{ height: "80px" }} />
                        </div>
                    )}
                    <div className="col-12 mb-4">
                        <button className='btn btn-dark' disabled={processing}>
                            {processing ? (
                                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>processing..</>
                            ) : "Register"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserRegister;
