import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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

    return (
        <div className="headermainContainer">
            <div className="headerverytop">
                Workout on your Time
            </div>
           

            <div className="mainheader">
            <div className="sigloghead">
                <div className="signup">
                    <NavLink to="/Signup" activeclassname="active">Sign Up</NavLink>
                    </div>
                    <div className="signin">
                    <NavLink to="/Login" activeclassname="active">Log In</NavLink>
                    </div>
                    
                </div>

                <img className='headerlogo' src="/bellwork.png" alt="barbell" />
                <div className="leftheaderlinks">
                    <NavLink to="/" activeclassname="active">Home</NavLink>
                    <NavLink to="/" activeclassname="active">My Workouts</NavLink>
                    <NavLink to="/" activeclassname="active">Social</NavLink>
                </div>
                
                
            </div>
        </div>
    )
}

export default Header;
