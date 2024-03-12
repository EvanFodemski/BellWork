import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client'; 


const MyCard = ({ lift }) => {
    const liftId = lift._id;

    return(
        <div>
            <h2>{lift.name}</h2>
            <p>This Lift's Target: {lift.targets}</p>
            <p>Comments on This Lift: {lift.liftComments}</p>
           
        </div>
    )
}


export default MyCard;