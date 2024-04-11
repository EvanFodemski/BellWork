import React, { useEffect, useState } from 'react';
import auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_LIFT } from '../utils/mutations';
import { ADD_DISLIKE } from '../utils/mutations';
import { ADD_LIKE } from '../utils/mutations';

const whitelike = <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter">
    <polygon points="7 9 11 2 14 2 13 9 22 9 20 22 7 22 7 9" fill="#059cf7" opacity="0.1" stroke-width="0">
        </polygon><polygon points="7 9 11 2 14 2 13 9 22 9 20 22 7 22 7 9">
    </polygon><rect x="2" y="9" width="5" height="13"></rect></svg>

    const whitedislike = <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" 
    fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="miter">
        <polygon points="17 15 13 22 10 22 11 15 2 15 4 2 17 2 17 15">
        </polygon><rect x="17" y="2" width="5" height="13"></rect></svg>

const AllCard = ({ lift }) => {
    const [addLift] = useMutation(ADD_LIFT);
    const [addLike] = useMutation(ADD_LIKE);
    const [addDislike] = useMutation(ADD_DISLIKE);
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
    const handleLike = async () => {
        try {
            await addLike({
                variables: { liftId: lift._id }
            });
        } catch (error) {
            console.error('Error adding like:', error);
            alert('An error occurred while liking the lift.');
        }
    };

    const handleDislike = async () => {
        try {
            await addDislike({
                variables: { liftId: lift._id }
            });
        } catch (error) {
            console.error('Error adding dislike:', error);
            alert('An error occurred while disliking the lift.');
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

            <div className="likedislikecon">
                <div className="blanklike" onClick={handleLike}>
                    {whitelike}
                    <div className="liftlikenum">
                        {lift.likes}
                    </div>
                </div>

                <div className="blankdislike" onClick={handleDislike}>
                    {whitedislike}
                    <div className="liftdislikenum">
                        {lift.dislikes}
                    </div>
                </div>
            </div>

        </div>

    )
}

export default AllCard;


