import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

const Login = () => {

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Login</h1>
                <form className="login-form">
                    <input type="text" placeholder="Username" className="login-input" />
                    <input type="password" placeholder="Password" className="login-input" />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <div className="login-signup">
                    Don't have an account? <Link to="/signup" className="login-signup-link">Sign Up</Link>
                </div>
            </div>
        </div>
    )
};

export default Login;