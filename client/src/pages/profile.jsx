import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import { GET_ALL_USERS } from '../utils/queries';

const ProfilePage = () => {

    const { loading, error, data } = useQuery(GET_ALL_USERS)

    if(loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>Error</h1>
    }

    return (
        <div>
            <h1>Filler spot</h1>
            <h1>filler spot</h1>
            <h1>filler spot</h1>

      <h1>All Users</h1>
      <ul>
        {data.users.map((user) => (
          <li key={user._id}>
            <h1>{user.username}</h1>
            {/* <ul>
              {user.lifts.map((lift) => (
                <li key={lift._id}>
                  <h3>{lift.name}</h3>
                  <p>Targets: {lift.targets}</p>
                  <p>Lift Comments: {lift.liftComments}</p>
                  <ul>
                    {lift.excercises.map((exercise) => (
                      <li key={exercise._id}>
                        <h4>{exercise.name}</h4>
                        <p>Sets: {exercise.sets}</p>
                        <p>Reps: {exercise.reps}</p>
                        <p>Comments: {exercise.comments}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul> */}
          </li>
        ))}
      </ul>
    </div>
    );
}

export default ProfilePage;