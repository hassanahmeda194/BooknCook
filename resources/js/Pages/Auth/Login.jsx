import React from 'react'
import { useForm } from '@inertiajs/react' // Inertia.js ka hook

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(e) {
        e.preventDefault();
        post('/submit-login');
    }

    return (
        <div>
            <h4 className='fw-semibold mb-4'>Login to your Account</h4>
            <form onSubmit={submit}>
                <div className="row col-6">
                    <div className="col-12 mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" id="email" className='form-control' name='email'
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>

                    <div className="col-12 mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" className='form-control' name='password'
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>

                    <div className="col-12 mb-3">
                        <button className='btn btn-dark' disabled={processing}>
                            {processing ? (
                                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>processing..</>
                            ) : "Login"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;
