import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';
import { ADD_DESCRIPTION } from '../utils/mutations';


const photo = <svg fill="#ffffff" width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19,6.5H17.72l-.32-1a3,3,0,0,0-2.84-2H9.44A3,3,0,0,0,6.6,5.55l-.32,1H5a3,3,0,0,0-3,3v8a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3v-8A3,3,0,0,0,19,6.5Zm1,11a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1v-8a1,1,0,0,1,1-1H7a1,1,0,0,0,1-.68l.54-1.64a1,1,0,0,1,.95-.68h5.12a1,1,0,0,1,.95.68l.54,1.64A1,1,0,0,0,17,8.5h2a1,1,0,0,1,1,1Zm-8-9a4,4,0,1,0,4,4A4,4,0,0,0,12,8.5Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14.5Z"/></svg>


const ImgUpload = ({
    onChange,
    src
}) => (
    <div className="img-upload-container">
        <input type="file" id="photo-upload" className="hidden" onChange={onChange} />
        <label htmlFor="photo-upload" className="custom-file-upload fas">
        </label>
        <div className="img-wrap">
            <img src={src} alt="Profile" className="profile-image" />
            <button className="change-photo-button">{photo}</button>
            <div className="changehovertext">Change Photo</div>
        </div>
    </div>
);






const ProfileCard = ({ user }) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true');
    const [name, setName] = useState(user.username);
    const [status, setStatus] = useState(user.description || '');

    const photoUpload = e => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
        }
        reader.readAsDataURL(file);
    }
    const handleSubmit = e => {
        e.preventDefault();
    }



    return (
        <div className="profmaincont">



            <div className="profileCard">
                <div className="profileCardHeader">
                    <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />

                </div>
                <h1 className='userusername'>{user.username}</h1>
                <p className='useremail'>{user.email}</p>
                <div className="proflinething"></div>
                <p className='userfriends'>{user.friends.length} Friends</p>
                <p className='userlifts'>{user.lifts.length} Saved Lifts</p>
                <h2 className="aboutheadincard">About</h2>
                <p className='userdescrip'>{user.description}</p>
                <div className="profuserinfo">

                </div>
            </div>


        </div>

    )
}

export default ProfileCard;



