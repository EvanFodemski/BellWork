import { useQuery, useMutation } from "@apollo/client";
import React, { useState } from 'react';



function Planner() {

    const [days, setDays] = useState(null); //State to store days selections
    const [customDays, setCustomDays] = useState(""); // State to store custom number of days


    const renderDays = (count) => {
        const boxes = [];

        for (let i = 0; i < count; i++) {
            boxes.push(
                <div key={i} className="plannerbox">
                    <div className="boxNumber">{i + 1}</div>
                    <div className="plannerplusbutton">
                    <svg width="100px" height="100px" viewBox="0 0 1024 1024"   version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z" fill="#FFCB9A" /><path d="M448 298.666667h128v426.666666h-128z" fill="#FFFFFF" /><path d="M298.666667 448h426.666666v128H298.666667z" fill="#FFFFFF" /></svg>

                    </div>
                    
                </div>
            );
        }
        return boxes;
    };

    const handleCustomDaysSubmit = () => {
        if (customDays && !isNaN(customDays)) {
            setDays(Number(customDays));
        } else {
            alert("Please enter a valid number.");
        }
    };


    return (
        <div className="plannercontainer">


            {/* Top two bars of planning page */}
            <div className="plannerheads">
                <div className="plannerhead">Your Trainging Schedule</div>
                <div className="headerlower">Schedule your workouts for a week, or a month</div>
            </div>




            {/* Body of planning page */}
            <div className="plannerbody">
                <div className="getplan">Getting Started</div>
                <div className="wouldplan">
                    Would you like to schedule your workouts for
                    <br />
                    <button className="weekplan" onClick={() => setDays(7)}> A Week?</button> ,
                    <button className="monthplan" onClick={() => setDays(30)}> A Month?</button>
                    <br />
                    <p className="planOr">OR</p>
                    <div className="Customplan">
                        <input className="customdaysinput"
                            type="number"
                            placeholder="A Custom Amount of Days?"
                            value={customDays}
                            onChange={(e) => setCustomDays(e.target.value)}
                        />
                        <button className="customplanbutton" onClick={handleCustomDaysSubmit}>Continue</button>
                    </div>

                </div>
            </div>


            {/* Dynamic Scheduling based on selected amount of days */}

            <div className="lowerhalfplan">

                <div className="lowermainwriting">
                    <h1 className="lowerhead">
                        
                    </h1>
                </div>



            {days && (
                <div className="scheduleCon">
                    {renderDays(days)}
                    
                </div>
            )}


            </div>
            




        </div>

    )
}

export default Planner;
