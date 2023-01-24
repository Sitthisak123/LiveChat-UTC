import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Signin = () => {
  const [useFormdata, setFormdata] = useState({});

  function handleChange(event) {
    setFormdata({
      ...useFormdata,
      [event.target.id]: event.target.value
    })
  }
  function onSubmit(event) {
    console.log(useFormdata);
    event.preventDefault();
    axios.post(`http://localhost:9001/API/user/login`, { ...useFormdata }).then(response => {
      alert(response.data);
    }).catch(error => {
      console.log(error.response.data);
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