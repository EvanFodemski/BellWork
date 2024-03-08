import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import { CREATE_WORKOUT } from '../utils/mutations';

const CreateWorkout = ({ onCreateEvent }) => {
    let user = auth.loggedIn() ? auth.getProfile().data._id : "";
    const [lift, setLift] = useState('');
    const [name, setName] = useState('');
    const [targets, setTargets] = useState('');
    const [liftComments, setLiftComments] = useState('');
    const [createWorkout] = useMutation(CREATE_WORKOUT);


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createWorkout({
                variables: { name: name, userId: user, targets: targets, liftComments: liftComments }
            });
            setName('');
            setTargets('');
            setLiftComments('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='createcontainer'>
            <div>
                <div>
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
            </div>

        </div>
    )

}

export default CreateWorkout;