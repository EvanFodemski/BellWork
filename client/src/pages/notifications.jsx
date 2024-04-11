import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation, gql } from '@apollo/client';
import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';
import auth from '../utils/auth';
import { ReactDOM } from 'react';


const NotificationsPage = () => {
    return(
        <div className="notisallcon">
                <h1>Hello World</h1>

        </div>
    
    )
}


export default NotificationsPage;