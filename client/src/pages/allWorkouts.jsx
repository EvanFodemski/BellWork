import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_LIFTS } from '../utils/queries';



const AllWorkouts = () => {
    const { loading, data , error} = useQuery(GET_LIFTS);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Internal Error!!</div>;
    }

}