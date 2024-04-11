import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation, gql } from '@apollo/client';
import { GET_ALL_USERS } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { ADD_DESCRIPTION } from '../utils/mutations';
import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';
import auth from '../utils/auth';
import { ReactDOM } from 'react';
import ProfileCard from '../components/profileCard';



const ProfilePage = () => {
    const { loading, error, data } = useQuery(GET_ALL_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const userId = auth.loggedIn() ? auth.getProfile().data._id : "";
    const [addFriend] = useMutation(ADD_FRIEND)
    const [selectedUser, setSelectedUser] = useState(null);




    const addsvg = <svg width="25px" height="25px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
        strokeWidth="3" stroke="#000000" fill="none"><circle cx="29.22" cy="16.28" r="11.14" />
        <path d="M41.32,35.69c-2.69-1.95-8.34-3.25-12.1-3.25h0A22.55,22.55,0,0,0,6.67,55h29.9" />
        <circle cx="45.38" cy="46.92" r="11.94" /><line x1="45.98" y1="39.8" x2="45.98" y2="53.8" />
        <line x1="38.98" y1="46.8" x2="52.98" y2="46.8" /></svg>

    const viewsvg = <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 8.5C15 10.433 13.433 12 11.5 12C9.567 12 8 10.433 8 8.5C8 6.567 9.567 5 11.5 5C13.433 5 15 6.567 15 8.5Z" fill="#000000" />
        <path d="M17.6305 20H5.94623C5.54449 20 5.31716 19.559 5.56788 19.2451C6.68379 17.8479 9.29072 15 12 15C14.7275 15 17.0627 17.8864 18.0272 19.2731C18.2474 19.5897 18.0161 20 17.6305 20Z" fill="#000000" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

    const handleAddFriend = async (selectedUser) => {
        try {
            await addFriend({
                variables: { userId: userId, friendName: selectedUser.username }
            });
            // Optional: You can perform additional actions after adding a friend
            console.log("Friend added successfully!");
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };





    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>Error</h1>;
    }



    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const filteredUsers = data.users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
        .slice(0, 5);



    return (
        <div className='profilecontainer'>




            <div className="allUsersMainCon">
                <div className="innerallcon">
                <div className="topyoumay">
                    <h1>People you may know</h1>

                </div>

                <div className="friendsboxsearch">
                    <input
                        type="text"
                        placeholder="Search by username..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                </div>
                <div className="friendboxbody">
                    <ul>
                        {filteredUsers.map((user) => (
                            <li key={user._id}>
                                <div className="indfriendbox">
                                    <h1>{user.username}</h1>
                                    <p className='friendsdesc'>{user.description}</p>
                                    <button onClick={() => {
                                        setSelectedUser(user);
                                        handleAddFriend(user);
                                    }}>{addsvg}</button>
                                    <button onClick={handleError}>{viewsvg}</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
                </div>
                
            </div>


            <div className="loggedprocon">
                <ProfileCard user={data.users.find(user => user._id === userId)} />
            </div>


        </div>

    )
};





export default ProfilePage;
