import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client'; 
import auth from '../utils/auth';


const MyCard = ({ lift }) => {
    const userId = auth.loggedIn() ? auth.getProfile().data._id : "";


    return(
        <div>
            <h2>{lift.name}</h2>
            <p>This Lift's Target: {lift.targets}</p>
            <p>Comments on This Lift: {lift.liftComments}</p>

           <h3>This Lift's Excercises:</h3>

            <ul>
                {lift.excercises.map(exercise => (
                    <li key={exercise._id}>
                        <p>Exercise Name: {exercise.name}</p>
                        <p>Sets: {exercise.sets}</p>
                        <p>Reps: {exercise.reps}</p>
                        <p>Comments: {exercise.comments}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default MyCard;