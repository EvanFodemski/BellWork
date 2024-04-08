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


const Modal = ({ isOpen, onClose }) => {
    return isOpen ? (
        <div className="modal">
            <div className="modal-content">
                <h2>Friend Added!</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    ) : null;
};

const ProfilePage = () => {
    const { loading, error, data } = useQuery(GET_ALL_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [pfp, setPfp] = useState(null)
    const userId = auth.loggedIn() ? auth.getProfile().data._id : "";


    const [addFriend] = useMutation(ADD_FRIEND);



    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <h1>Error</h1>;
    }



    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleClick = (user) => {
        setSelectedUser(user);
    }

    const handleAddFriend = async () => {
        try {
            await addFriend({
                variables: { userId: userId, friendName: selectedUser.username }
            });
            setShowModal(true);
        } catch (e) {
            console.error(e);
        }
    }

    const closeClick = () => {
        setSelectedUser(null);
    }

    const filteredUsers = data.users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
        .slice(0, 5);



    return (
        <div className='profilecontainer'>




            <div className="allUsersMainCon">
            <h1>All Users</h1>
            <input
                type="text"
                placeholder="Search by username..."
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <ul>
                {filteredUsers.map((user) => (
                    <li key={user._id}>
                        <h1 onClick={() => handleClick(user)}>{user.username}</h1>
                        {selectedUser === user && (
                            <div>
                                <button onClick={handleAddFriend}>Add Friend</button>
                                <button onClick={handleError}>View Profile</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <div>
                    <button onClick={closeClick}>Close</button>
                </div>
            )}
            </div>


            <div className="loggedprocon">
                <ProfileCard user={data.users.find(user => user._id === userId)} />
            </div>


           
    







        </div>
    );
};



export default ProfilePage;
