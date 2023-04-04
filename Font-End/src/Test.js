import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_getOtherUsersImage } from './_APIs/user';

const UserImages = () => {
    const { User_data } = useSelector((state) => ({ ...state }));
    const [images, setImages] = useState([
        { user_id: 2, img: 'earb8fh2_1678727112923.jpg' },
        { user_id: 3, img: '1fe4ygcw_1678725051473.jpg' }
    ]);

    useEffect(() => {

    }, []);

    return (
        <div>
            {images.map((image, index) => (
                <img key={index} src={image.image} alt={`User ${index + 1}`} />
            ))}
        </div>
    );
};

export default UserImages;
