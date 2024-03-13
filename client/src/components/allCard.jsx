import React, { useEffect, useState } from 'react';
import auth from '../utils/auth';
import { useMutation } from '@apollo/client'; 
import { ADD_LIFT } from '../utils/mutations';

const AllCard = ({ lift }) => {
    const [addLift] = useMutation(ADD_LIFT);
    const userId = auth.loggedIn() ? auth.getProfile().data._id : "";


    const handleAddLift = async () => {
        try{
            await addLift({
                variables: { userId: userId, liftId: lift._id }
            });
            alert('Lift Added, You can now view it in the My Workouts Page')
        } catch (error) {
            console.error('Error adding lift:', error);
            alert('An error occurred while adding the lift.');
        }
    };

    return(
        <div>
            <h2>{lift.name}</h2>
            <p>This Lift's Target: {lift.targets}</p>
            <p>Comments on This Lift: {lift.liftComments}</p>
            <button onClick={handleAddLift}>Add Lift</button>
           
        </div>
    )
}

export default AllCard;
