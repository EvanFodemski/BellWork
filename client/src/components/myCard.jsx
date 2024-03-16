import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';
import { ADD_EXERCISE } from '../utils/mutations';


const MyCard = ({ lift }) => {
    const userId = auth.loggedIn() ? auth.getProfile().data._id : "";
    const [addEx] = useMutation(ADD_EXERCISE);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        sets: '',
        reps: '',
        comments: ''
    });

    const handleAddEx = async () => {
        try {
            await addEx({
                variables: { 
                    liftId: lift._id, 
                    name: formData.name, 
                    sets: formData.sets, 
                    reps: formData.reps, 
                    comments: formData.comments 
                }
            });
            alert('Exercise Added');
            setShowForm(false); // Close the form after adding the exercise
        } catch (error) {
            console.error('Error adding lift:', error);
            alert('An error occurred while adding the lift.');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'sets' || name === 'reps' ? parseInt(value, 10) : value });
    }

    const toggleForm = () => {
        setShowForm(!showForm);
    }



    return (
        <div className='mycardconn'>
            <div className="mycardheadercon">
                <h2>{lift.name}</h2>
            </div>
            <div className="myworktargets">
                <p>{lift.targets}</p>
            </div>
            <div className="allworkcomm">
                <p>{lift.liftComments}</p>

            </div>
            <div className="myworkexctitle">
                <h2> Excercises:</h2>

            </div>

            <div className=''>
                <div className=''>
                    {lift.excercises.map(exercise => (
                        <div key={exercise._id} className='exerciseBlock2'>
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
                {showForm && (
                <div className="add-exercise-form">
                    <input type="text" name="name" placeholder="Exercise Name" value={formData.name} onChange={handleChange} />
                    <input type="number" name="sets" placeholder="Sets" value={formData.sets} onChange={handleChange} />
                    <input type="number" name="reps" placeholder="Reps" value={formData.reps} onChange={handleChange} />
                    <input name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange}></input>
                    <button onClick={handleAddEx}>Add Exercise</button>
                </div>
            )}
            <div className="addexcbutton">
                <button className='myButton' onClick={toggleForm}>
                <svg width="100px" height="100px" viewBox="0 0 1024 1024"   version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#FFCB9A" /><path d="M448 298.666667h128v426.666666h-128z" fill="#FFFFFF" /><path d="M298.666667 448h426.666666v128H298.666667z" fill="#FFFFFF" /></svg>
                </button> 
            </div>
            </div>
            

           
        </div>
    )
}


export default MyCard;