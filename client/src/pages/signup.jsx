import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


const Signup = () => {

    return (
        <div className="signup-container">
            <div className="login-box">
                <h1 className="login-title">Sign Up</h1>
                <form className="login-form">
                    <input type="text" placeholder="Username" className="login-input" />
                    <input type="password" placeholder="Password" className="login-input" />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="login-signup">
                    Already Have an account? <Link to="/" className="login-signup-link">Log In</Link>
                </div>
            </div>
        </div>
    )
};

export default Signup;