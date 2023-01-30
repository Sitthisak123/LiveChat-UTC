// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
// eslint-disable-next-line no-unused-vars
import { gapi } from 'gapi-script';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { USERContext, AppDataContext } from '../../_data_provider/Chat.js';


const Signin = () => {
  const Navigate = useNavigate();
  const [useFormdata, setFormdata] = useState({});
  // eslint-disable-next-line no-unused-vars
  const { useUserData, setUserData } = useContext(USERContext);
  // eslint-disable-next-line no-unused-vars
  const { useAppData, setAppData } = useContext(AppDataContext);

  function handleChange(event) {
    setFormdata({
      ...useFormdata,
      [event.target.id]: event.target.value
    })
  }
  function onSubmit(event) {
    event.preventDefault();
    axios.post(`http://localhost:9001/API/user/login`, { ...useFormdata }).then(response => {
      //Login SUccess
      setUserData(response.data);
      //console.log(useUserData);
      //console.log(response.data);
      localStorage.setItem("user", JSON.stringify(""));
      //Navigate('/Home')
    }).catch(error => {
      alert(error.response.data);
    });
  }
  useEffect(() => {
    console.log(useFormdata);
  }, [useFormdata]);

  return (
    <>
      <div className="formField">
        <label className="formFieldLabel" htmlFor="Username">Username</label>
        <input type="text" id="Username" className="formFieldInput" placeholder="Username or E-mail" onChange={handleChange} />
      </div>

      <div className="formField">
        <label className="formFieldLabel" htmlFor="Password">Password</label>
        <input type="Password" id="Password" className="formFieldInput" placeholder="Password" onChange={handleChange} />
      </div>

      <div className="formField google-login">
        <button className="formFieldButton" onClick={onSubmit}>Sign In</button>
        <label className="email_or_google">or</label>
        <GoogleLogin className='Google-button' />
      </div>
    </>
  )
}


export default Signin;