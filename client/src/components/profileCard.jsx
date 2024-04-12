import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';
import { ADD_DESCRIPTION } from '../utils/mutations';


const photo = <svg fill="#ffffff" width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19,6.5H17.72l-.32-1a3,3,0,0,0-2.84-2H9.44A3,3,0,0,0,6.6,5.55l-.32,
    1H5a3,3,0,0,0-3,3v8a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3v-8A3,3,0,0,0,19,6.5Zm1,11a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1v-8a1,1,0,0,1,1-1H7a1,1,0,0,0,1-.68l.54
    -1.64a1,1,0,0,1,.95-.68h5.12a1,1,0,0,1,.95.68l.54,1.64A1,1,0,0,0,17,8.5h2a1,1,0,0,1,1,1Zm-8-9a4,4,0,1,0,4,4A4,4,0,0,0,12,8.5Zm0,6a2,2,0,1,1,2-2A2,
    2,0,0,1,12,14.5Z"/></svg>


const edit = <svg fill="#000000" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M21,20 C21.5522847,20 22,20.4477153 22,21 C22,21.5522847 21.5522847,22 21,22 L3,22 C2.44771525,22 2,21.5522847 2,21 C2,20.4477153 2.44771525,20 3,20 L21,20 Z M6.29289322,13.2928932 L17.2928932,2.29289322 C17.6533772,1.93240926 18.2206082,1.90467972 18.6128994,2.20970461 L18.7071068,2.29289322 L21.7071068,5.29289322 C22.0675907,5.65337718 22.0953203,6.22060824 21.7902954,6.61289944 L21.7071068,6.70710678 L10.7071068,17.7071068 C10.5508265,17.8633871 10.3481451,17.9625983 10.131444,17.9913276 L10,18 L7,18 C6.48716416,18 6.06449284,17.6139598 6.00672773,17.1166211 L6,17 L6,14 C6,13.7789863 6.07316447,13.565516 6.20608063,13.3919705 L6.29289322,13.2928932 L17.2928932,2.29289322 L6.29289322,13.2928932 Z M18,4.41421356 L8,14.4142136 L8,16 L9.58578644,16 L19.5857864,6 L18,4.41421356 Z" />
</svg>








const ProfileCard = ({ user }) => {
    const userId = auth.loggedIn() ? auth.getProfile().data._id : "";
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [addDescription] = useMutation(ADD_DESCRIPTION);
    const [file, setFile] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState(
        'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true'
    );

    


    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        addDescription({ variables: { userId, description } });
        setIsEditing(false);
    };







    return (
        <div className="profmaincont">
            <div className="profileCard">
                <h1 className="userusername">{user.username}</h1>
                <p className="useremail">{user.email}</p>
                <div className="proflinething"></div>
                <p className="userfriends">{user.friends.length} Friends</p>
                <p className="userlifts">{user.lifts.length} Saved Lifts</p>
                <div className="desccon">
                    {isEditing ? (
                        <div>
                            <textarea
                                maxLength={120}
                                className="protextarea"
                                placeholder="Add a new description"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                            <p className="charrempro">{120 - description.length} characters remaining</p>
                            <button className="profsavebutton" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <div>
                            
                            <button className="editbuttonpro" onClick={() => setIsEditing(true)}>
                                About{edit}
                            </button>
                            <p className="userdescrip">{user.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;



