import Axios from 'axios';
import { useState } from 'react';

const Profile = () => {
  const [useUser, setUser] = useState([]);
  
  const getAlluser = () => {
    Axios.get("http://localhost:9000/getalluser").then((response) => {
      setUser(response.data)
      console.log(response.data)
    })
  }
  return (
    <>
    <button onClick={getAlluser} > Google </button>
    </>
  )
}
export default Profile;