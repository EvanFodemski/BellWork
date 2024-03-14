import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import { CREATE_WORKOUT } from '../utils/mutations';
import { ACTIVE_USER_LIFTS } from '../utils/queries';
import MyCard from '../components/myCard';

const CreateWorkout = ({ onCreateEvent }) => {
    const userId = auth.loggedIn() ? auth.getProfile().data._id : "";
    const [lift, setLift] = useState('');
    const [name, setName] = useState('');
    const [targets, setTargets] = useState('');
    const [liftComments, setLiftComments] = useState('');
    const [createWorkout] = useMutation(CREATE_WORKOUT);

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
            console.error(error);
        }
    };

    const { loading, error, data } = useQuery(ACTIVE_USER_LIFTS, {
        variables: { id: userId }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='createcontainer'>
            <div className='createformmain'>
                <h2>Create a Workout</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name of Your Lift:</label>
                        <input className="form-control" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="targets">What Muscle Group Does this Lift Target?</label>
                        <select className="form-control" id="targets" value={targets} onChange={(e) => setTargets(e.target.value)}>
                            <option value="">Select an Option</option>
                            <option value="Upper Body">Upper Body</option>
                            <option value="Lower Body">Lower Body</option>
                            <option value="Cardio">Cardio</option>
                            <option value="Full Body">Full Body Workout</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="liftComments">Any Comments to Add?</label>
                        <input className="form-control" id="liftComments" type="text" value={liftComments} onChange={(e) => setLiftComments(e.target.value)} />
                    </div>

                    <div className="createsubmit">
                        <button className="createButtonSubmit" type='submit'>Create Your Lift</button>
                    </div>
                </form>
            </div>
            <div className="yourworkoutsheadcon">
                <h1 className='yourmytitle'>Your Workouts</h1>
            </div>

            {/* <div>
                <div className='myworkoutscardcon'>


                    <div>
                        {data.user.lifts.map((lift) => {
                            return (
                                <MyCard lift={lift} key={lift._id} />
                            )
                        })}
                    </div>
                </div>
            </div> */}



        </div>
    )
}

export default CreateWorkout;



