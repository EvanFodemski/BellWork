import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';
import { ADD_DESCRIPTION } from '../utils/mutations';


const plus = <svg width="30px" height="30px" viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 48 48">
<circle fill="#4CAF50" cx="24" cy="24" r="21"/>
<g fill="#ffffff">
    <rect x="21" y="14" width="6" height="20"/>
    <rect x="14" y="21" width="20" height="6"/>
</g>
</svg>


const ImgUpload = ({
    onChange,
    src
}) => (
    <div>
        <label htmlFor="photo-upload" className="custom-file-upload fas">
            <div className="profplus">
                {plus}
            </div>

        </label>
        <div className="img-wrap img-upload">
            <img src={src} alt="Profile" className="profile-image" />
        </div>
        <input id="photo-upload" type="file" onChange={onChange} />
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
                <h1>{user.username}</h1>
                <p>{user.email}</p>
                <p>{user.description}</p>
                <p>Friends: {user.friends.length}</p>
                <p>Lifts: {user.lifts.length}</p>
                <div className="profuserinfo">

                </div>
            </div>


        </div>

    )
}

export default ProfileCard;



