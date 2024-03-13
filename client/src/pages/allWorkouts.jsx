import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_LIFTS } from '../utils/queries';
import AllCard from '../components/allCard';



const AllWorkouts = () => {
    const { loading, data , error} = useQuery(GET_LIFTS);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Internal Error!!</div>;
    }

    return (
        <div>
            <h1>Workouts created by other users:</h1>
            <div className="event-list">
                {data.lifts.map(lift => (
                    <AllCard key={lift._id} lift={lift} />
                ))}
            </div>
        </div>
    )
}

export default AllWorkouts;