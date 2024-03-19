import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import { GET_ALL_USERS } from '../utils/queries';
import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';

const ProfilePage = () => {
    const { loading, error, data } = useQuery(GET_ALL_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);


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

    const closeClick = () => {
      setSelectedUser(null);
    }

    const filteredUsers = data.users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='profilecontainer'>
           
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
                                <button onClick={handleError}>Add Friend</button>
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
    );
};

export default ProfilePage;
