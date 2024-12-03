import React, { useState } from 'react';
import axios from 'axios';

const Update = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmpassword: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        // Validate passwords
        if (data.password !== data.confirmpassword) {
            setMessage("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.put('https://loginauthen-mern.onrender.com/updatepassword', {
                email: data.email,
                password: data.password,
                confirmpassword: data.confirmpassword
            });
            setMessage(res.data.message || 'Password updated successfully.');
        } catch (error) {
            setMessage(
                error.response && error.response.data
                    ? error.response.data
                    : 'An error occurred. Please try again later.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <center>
                <h3>Update Password</h3>
                <div className="card bg-dark text-white pt-5" style={{ width: '30rem' }}>
                    <form onSubmit={submitHandler} className="form-group">
                        <input
                            type="email"
                            onChange={changeHandler}
                            value={data.email}
                            name="email"
                            placeholder="Email"
                            className="form-control"
                            required
                        />
                        <br />
                        <input
                            type="password"
                            onChange={changeHandler}
                            value={data.password}
                            name="password"
                            placeholder="New Password"
                            className="form-control"
                            required
                        />
                        <br />
                        <input
                            type="password"
                            onChange={changeHandler}
                            value={data.confirmpassword}
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            className="form-control"
                            required
                        />
                        <br />
                        <input
                            type="submit"
                            value={loading ? 'Updating...' : 'Update'}
                            className="btn btn-primary"
                            disabled={loading}
                        />
                        <br />
                    </form>
                    {message && (
                        <div
                            className={`alert ${
                                message.includes('successfully') ? 'alert-success' : 'alert-danger'
                            } mt-3`}
                        >
                            {message}
                        </div>
                    )}
                </div>
            </center>
        </div>
    );
};

export default Update;
