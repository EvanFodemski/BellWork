import { NavLink, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation, gql } from '@apollo/client';
import auth from '../utils/auth';
import { GET_NOTIFICATIONS } from '../utils/queries';


function Header() {
    const [notificationsCount, setNotificationsCount] = useState(0);
    const userId = auth.loggedIn() ? auth.getProfile().data._id : "";

    const { loading, error, data } = useQuery(GET_NOTIFICATIONS, {
        variables: { id: userId }
    });

    useEffect(() => {
        if (data && data.user && data.user.notifications) {
            setNotificationsCount(data.user.notifications.length);
        }
    }, [data]);

    const loggedIn = auth.loggedIn();

    const handleLogout = () => {
        auth.logout();
    };

    const logOut = <svg width="30px" height="30px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" >
        <rect width="16" height="16" id="icon-bound" fill="none" />
        <path d="M14,14l0,-12l-6,0l0,-2l8,0l0,16l-8,0l0,-2l6,0Zm-9.002,-0.998l-4.998,-5.002l5,-5l1.416,1.416l-2.588,2.584l8.172,0l0,2l-8.172,0l2.586,2.586l-1.416,1.416Z" />
    </svg>

    const home = <svg width="30px" height="30px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.8254 0.120372C7.63815 -0.0401239 7.36185 -0.0401239 7.1746 0.120372L0 6.27003V13.5C0 14.3284 0.671573 15 1.5 15H5.5C5.77614 15 6 14.7761 6 14.5V11.5C6 10.6716 6.67157 10 7.5 10C8.32843 10 9 10.6716 9 11.5V14.5C9 14.7761 9.22386 15 9.5 15H13.5C14.3284 15 15 14.3284 15 13.5V6.27003L7.8254 0.120372Z" fill="#000000" />
    </svg>

    const profile = <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="style=fill">
            <g id="profile">
                <path id="vector (Stroke)" d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z" fill="#000000" />
                <path id="rec (Stroke)" d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z" fill="#000000" />
            </g>
        </g>
    </svg>

    const notifications = <svg fill="#000000" width="30px" height="30px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <title>notification-solid</title>
        <path className="clr-i-solid clr-i-solid-path-1" d="M32.85,28.13l-.34-.3A14.37,14.37,0,0,1,30,24.9a12.63,12.63,0,0,1-1.35-4.81V15.15A10.81,10.81,0,0,0,19.21,4.4V3.11a1.33,1.33,0,1,0-2.67,0V4.42A10.81,10.81,0,0,0,7.21,15.15v4.94A12.63,12.63,0,0,1,5.86,24.9a14.4,14.4,0,0,1-2.47,2.93l-.34.3v2.82H32.85Z"></path><path className="clr-i-solid clr-i-solid-path-2" d="M15.32,32a2.65,2.65,0,0,0,5.25,0Z"></path>
        <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
    </svg>

    return (
        <div className="headermainContainer">
            <div className="headerverytop">
                Workout on your Time
            </div>

            <div className="mainheader">
                <img className='headerlogo' src="/bellwork.png" alt="barbell" />

                <div className="rightheaderlinks">


                    {loggedIn ? (
                        <>
                            <NavLink to="/createworkout" activeclassname="active">My Workouts</NavLink>

                            <NavLink to="/allworkouts" activeclassname="active">All Workouts</NavLink>

                            <NavLink to="/" onClick={handleLogout} className="logout">{logOut}</NavLink>

                            <NavLink to="/notifications" activeclassname="active">
                                {notifications}
                                {notificationsCount > 0 && (
                                    <span className="notification-count">{notificationsCount}</span>
                                )}
                            </NavLink>

                            <NavLink to="/profilepage" activeclassname="active">{profile}</NavLink>
                        </>
                    ) : (
                        <>

                            <NavLink to="/signup" className="signup">Sign Up</NavLink>
                            <NavLink to="/login" className="signin">Log In</NavLink>
                        </>
                    )}

                    <NavLink to="/" activeclassname="active">{home}</NavLink>




                </div>
            </div>
        </div>
    );
}

export default Header;
