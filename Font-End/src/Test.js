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
    const [imagePaths, setImagePaths] = useState([]);
    useEffect(() => {
        API_getOtherUsersImage(User_data.value.TOKEN).post('', { users: [images[0]] })
            .then(res => {
                setImagePaths(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            {imagePaths.map((imagePath, index) => (
                <div key={index}>
                    <img src={imagePath} alt={`User ${index + 1}`} />
                </div>
            ))}
        </div>
    );
}

export default UserImages;
