import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import { CREATE_SCHEDULE, ADD_DAY } from '../utils/mutations';




function Planner() {
    const userId = auth.loggedIn() ? auth.getProfile().data._id : "";
    const [name, setName] = useState('');
    const [createSchedule] = useMutation(CREATE_SCHEDULE);
    const [addDay] = useMutation(ADD_DAY);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createSchedule({
                variables: { name: name, userId: userId }
            });
            setName('');
        } catch (error) {
            console.error(error, "Error In form submit function: plannerjsx");
        }
    };


    return (
        <div className='PlannerWholeCon'>
            <h2>Create Schedule</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <button type="submit">Create Schedule</button>
            </form>
        </div>
    );
};

export default Planner;
