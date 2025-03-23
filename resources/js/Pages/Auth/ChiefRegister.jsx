import { useForm } from "@inertiajs/react";
import { useState } from "react";
import Select from "react-select";

const ChiefRegister = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [portfolioPreviews, setPortfolioPreviews] = useState([]); // Multiple images preview

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        avatar: null,
        phone_number: '',
        portfolio: [],
        experience_years: "",
        hourly_rate: "",
        bio: ""
    });

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    function handlePortfolioChange(e) {
        const files = Array.from(e.target.files);

        setData('portfolio', files); 
        const previews = files.map((file) => URL.createObjectURL(file));
        setPortfolioPreviews(previews);
    }

    function submit(e) {
        e.preventDefault();
        post('/submit-chief-register', { data });
    }

    const options = [
        { value: "italian", label: "Italian" },
        { value: "chinese", label: "Chinese" },
        { value: "mexican", label: "Mexican" },
        { value: "indian", label: "Indian" },
    ];

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
                    <div className="col-6 mb-4">
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="img-thumbnail" style={{ height: "80px" }} />
                        )}
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label">Chief Bio</label>
                        <textarea
                            value={data.bio}
                            onChange={e => setData('bio', e.target.value)}
                            rows={5}
                            placeholder="Enter a chief bio..."
                            className="form-control"></textarea>
                    </div>
                    <div className="col-6 mb-3">
                        <label className="form-label">Select Cuisine Specialization</label>
                        <Select
                            options={options}
                            classNamePrefix="form-select"
                            isMulti
                            onChange={(selected) => setData('cuisine_specialization', selected.map(opt => opt.value))}
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="" className="form-label">Year of Experience</label>
                        <input type="number" placeholder="Number of years" className="form-control"
                            value={data.experience_years}
                            onChange={e => setData('experience_years', e.target.value)}
                        />
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="" className="form-label">Hourly Rate</label>
                        <input type="number" placeholder="Hourly Rate" className="form-control"
                            value={data.hourly_rate}
                            onChange={e => setData('hourly_rate', e.target.value)}
                        />
                    </div>
                    <div className="col-6 mb-3">
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="" className="form-label">Portfolio (Multiple Images)</label>
                        <input type="file" name="portfolio" className="form-control" multiple onChange={handlePortfolioChange} />
                    </div>
                    <div className="col-6 mb-3">
                        <div className="d-flex flex-wrap">
                            {portfolioPreviews.map((preview, index) => (
                                <img key={index} src={preview} alt={`Portfolio ${index}`} className="img-thumbnail m-2" style={{ height: "80px" }} />
                            ))}
                        </div>
                    </div>
                    <div className="col-12 mb-4">
                        <button className='btn btn-dark' disabled={processing}>
                            {processing ? (
                                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing..</>
                            ) : "Register"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChiefRegister;
