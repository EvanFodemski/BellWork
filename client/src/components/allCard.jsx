import React, { useEffect, useState } from 'react';
import auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_LIFT } from '../utils/mutations';

const AllCard = ({ lift }) => {
    const [addLift] = useMutation(ADD_LIFT);
    const userId = auth.loggedIn() ? auth.getProfile().data._id : "";


    const handleAddLift = async () => {
        try {
            await addLift({
                variables: { userId: userId, liftId: lift._id }
            });
            alert('Lift Added, You can now view it in the My Workouts Page')
        } catch (error) {
            console.error('Error adding lift:', error);
            alert('An error occurred while adding the lift.');
        }
    };

    return (
        <div className='allCardContainer'>
            <h2 className='allCardHeader'>{lift.name}</h2>
            <div className='allCardmainex'>
                <p className='allTargets'>{lift.targets}</p>
                <p className='allComments'>{lift.liftComments}</p>
            </div>

            <div className='allcardsexc'>
                <h3>Excercises:</h3>
                <div className='exerciseContainer'>
                    {lift.excercises.map(exercise => (
                        <div key={exercise._id} className='exerciseBlock'>
                            <p className='allexcname'>{exercise.name}</p>
                            <div className='allsetsreps'>
                                <p className='allSets'><span className="setsLabel">Sets:</span> {exercise.sets}</p>
                                <p className='allSets'><span className="repsLabel">Reps:</span> {exercise.reps}</p>
                            </div>
                            <div className='allexcComments'>
                                <p className='excomtitle'>Excercise Comments:</p>
                                <p className='excomwriting'>{exercise.comments}</p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="allbuttcon">
            <button className='allButton' onClick={handleAddLift}>Add To your Workouts</button> 
            </div>

        </div>

    )
}

export default AllCard;


