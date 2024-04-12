import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation, gql } from '@apollo/client';
import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';
import auth from '../utils/auth';
import { ReactDOM } from 'react';
import { GET_NOTIFICATIONS } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';



const NotificationsPage = () => {
    const userId = auth.loggedIn() ? auth.getProfile().data._id : ""
    const { loading, error, data } = useQuery(GET_NOTIFICATIONS, {
        variables: { id: userId }
    });

    const [addFriend] = useMutation(ADD_FRIEND);
    const [notificationss, setNotifications] = useState([]);


    const handleAddFriend = async (friendName) => {
        try {
            await addFriend({
                variables: { userId: userId, friendName: friendName }
            });
            console.log("Friend added successfully!");
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error! ${error.message}</div>;

    const notifications = data.user.notifications;
    console.log(notifications);
    console.log(data);


    const noti = <svg fill="#000000" width="30px" height="30px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>notification-solid</title>
    <path className="clr-i-solid clr-i-solid-path-1" d="M32.85,28.13l-.34-.3A14.37,14.37,0,0,1,30,24.9a12.63,12.63,0,0,1-1.35-4.81V15.15A10.81,10.81,0,0,0,19.21,4.4V3.11a1.33,1.33,0,1,0-2.67,0V4.42A10.81,10.81,0,0,0,7.21,15.15v4.94A12.63,12.63,0,0,1,5.86,24.9a14.4,14.4,0,0,1-2.47,2.93l-.34.3v2.82H32.85Z"></path><path className="clr-i-solid clr-i-solid-path-2" d="M15.32,32a2.65,2.65,0,0,0,5.25,0Z"></path>
    <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
</svg>

const addsvg = <svg width="30px" height="30px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
        strokeWidth="3" stroke="#000000" fill="none"><circle cx="29.22" cy="16.28" r="11.14" />
        <path d="M41.32,35.69c-2.69-1.95-8.34-3.25-12.1-3.25h0A22.55,22.55,0,0,0,6.67,55h29.9" />
        <circle cx="45.38" cy="46.92" r="11.94" /><line x1="45.98" y1="39.8" x2="45.98" y2="53.8" />
        <line x1="38.98" y1="46.8" x2="52.98" y2="46.8" /></svg>

const Xout = <svg width="30px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#000000" d="M12.78 4.28a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72z"/></svg>



    return(
        <div className="notisallcon">
        <div className="notistop">
            <h1>Notifications</h1>
        </div>
        <div className="notisbox">
            {notifications.length === 0 ? (
                <div className='noNotis'>You don't have any Notifications</div>
            ) : (
                notifications.map(notification => (
                    <div key={notification._id} className="notification">
                        <p className='notimsg'>{noti}{notification.message}</p>
                        <button className='notisAddFriend'>
                                Add Friend 
                            </button>
                            <button className='notisViewProfile'>
                                View Profile
                            </button>

                            <button className='closeNoti'> {Xout} </button>

                    </div>
                ))
            )}
        </div>
    </div>
    
    );
};


export default NotificationsPage;