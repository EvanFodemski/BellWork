import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import { CREATE_WORKOUT } from '../utils/mutations';
import { ACTIVE_USER_LIFTS } from '../utils/queries';
import { DELETE_LIFT } from '../utils/mutations';
import MyCard from '../components/myCard';

const CreateWorkout = ({ onCreateEvent }) => {
    const userId = auth.loggedIn() ? auth.getProfile().data._id : "";
    const [lift, setLift] = useState('');
    const [name, setName] = useState('');
    const [targets, setTargets] = useState('');
    const [liftComments, setLiftComments] = useState('');
    const [deleteName, setDeleteName] = useState('');
    const [createWorkout] = useMutation(CREATE_WORKOUT);
    const [deleteLift] = useMutation(DELETE_LIFT, {
        refetchQueries: [{ query: ACTIVE_USER_LIFTS, variables: { id: userId } }]
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createWorkout({
                variables: { name: name, userId: userId, targets: targets, liftComments: liftComments }
            });
            setName('');
            setTargets('');
            setLiftComments('');
        } catch (error) {
            console.error(error, "Error In form submit function: createworkoutjsx");
        }
    };

    const handleDeleteLift = async () => {
        try {
            const { data } = await deleteLift({
                variables: { name: deleteName }
            });
            setDeleteName('');

        } catch (error) {
            console.error(error, "Error While Deleting your workout.");
        }
    }

    const { loading, error, data } = useQuery(ACTIVE_USER_LIFTS, {
        variables: { id: userId }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="wholecreatecontainer">

            <div className='createcontainer'>
                <div className='createformmain'>
                    <h2>Create a Workout</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="">
                            <input className="NameofYourLift" placeholder='Name of Your Lift' id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="optionsOfLift">
                            <select className="optionsOfLift2" id="targets" value={targets} onChange={(e) => setTargets(e.target.value)}>
                                <option className="options3" value="">Select an Option</option>
                                <option value="Upper Body">Upper Body</option>
                                <option value="Lower Body">Lower Body</option>
                                <option value="Cardio">Cardio</option>
                                <option value="Full Body">Full Body Workout</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="">
                            <input className="commentsOfYourLift" placeholder='Comments/Description' id="liftComments" type="text" value={liftComments} onChange={(e) => setLiftComments(e.target.value)} />
                        </div>

                        <div className="createsubmit">
                            <button className="createButtonSubmit" type='submit'>Create Your Lift</button>
                        </div>
                    </form>
                    <div className="mainOtherOptions">
                        <h1 className="otheroptionshead">
                            Other Options
                        </h1>
                        <div className="optionsListmain">
                            <ul>
                                <li className='linkToAllWorkoutscon'><Link className='linkToAllWorkouts' to="/allworkouts">Find New Workouts</Link></li>
                                <h3 className="deleteworkhead">Delete a Workout</h3>

                                <li>
                                    <input className='deleteWorkoutInput'
                                        type="text"
                                        placeholder="Enter Workout Name to Delete"
                                        value={deleteName}
                                        onChange={(e) => setDeleteName(e.target.value)}
                                    />
                                    <button className='deleteLiftButton' onClick={handleDeleteLift}>Delete</button>
                                </li>
                            </ul>
                        </div>
                    </div>


                </div>


                <div className='myworkoutscardcon'>
                    <div >


                        <div>
                            {data.user.lifts.map((lift) => {
                                return (
                                    <MyCard lift={lift} key={lift._id} />
                                )
                            })}
                        </div>
                    </div>
                </div>





            </div>

            <div className="workoutscardarea">

                <h1 className="yourworkoutshead">Your Workouts</h1>

                <div className="yourworkline">
                    
                </div>
            </div>


        </div>

    )
}

export default CreateWorkout;



