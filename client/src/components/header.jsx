import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import auth from '../utils/auth';
import Home from '../pages/homePage';
import Login from '../pages/login';
import Signup from '../pages/signup';

// import Nav from './Navbar';
// import '../index.css'

function Header() {
    const loadPage = () => {
        switch (currentPage) {
            case 'Home':
                return <Home />
            case 'Signup':
                return <Signup />
            case 'Login':
                return <Login />
            default:
                return <Home />
        }
    };

    const loggedIn = auth.loggedIn();

    const handleLogout = () => {
        auth.logout();
    };

    return (
        <div className="headermainContainer">
            <div className="headerverytop">
                Workout on your Time
            </div>
            
            <div className="mainheader">
                <img className='headerlogo' src="/bellwork.png" alt="barbell" />

                <div className="rightheaderlinks">
                    <NavLink to="/" activeclassname="active">Home</NavLink>
                    <NavLink to="/createworkout" activeclassname="active">My Workouts</NavLink>
                    <NavLink to="/allworkouts" activeclassname="active">All Workouts</NavLink>
                    {loggedIn ? (
                        <>
                            <NavLink to="/" onClick={handleLogout} className="logout">Logout</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/signup" className="signup">Sign Up</NavLink>
                            <NavLink to="/login" className="signin">Log In</NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
