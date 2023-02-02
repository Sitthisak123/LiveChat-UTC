// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
// eslint-disable-next-line no-unused-vars
import { gapi } from 'gapi-script';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { USERContext, AppDataContext } from '../../App.js';
const Signup = () => {
  const [useFormdata, setFormdata] = useState({});
  // eslint-disable-next-line no-unused-vars
  const USER_data = useContext(USERContext);
  // eslint-disable-next-line no-unused-vars
  const App_Data= useContext(AppDataContext);

  function handleChange(event) {
    if(event.target.type === 'checkbox'){
      return setFormdata({
        ...useFormdata,
        [event.target.name]: event.target.checked
      })
    }
    setFormdata({
      ...useFormdata,
      [event.target.id]: event.target.value
    })
  }

  function onSubmit(event) {
    event.preventDefault();
    axios.post(`http://localhost:9001/API/user/register`, { ...useFormdata }).then(response => {
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
        <input type="text"     id="Username"  className="formFieldInput" placeholder="Username" onChange={handleChange} />
      </div>

      <div className="formField">
        <label className="formFieldLabel" htmlFor="Password">Password</label>
        <input type="Password" id="Password"  className="formFieldInput" placeholder="Password" onChange={handleChange} />
      </div>

      <div className="formField">
        <label className="formFieldLabel" htmlFor="Confirm Password">Confirm Password</label>
        <input type="Password" id="Confirm Password"  className="formFieldInput" placeholder="Confirm Password" onChange={handleChange} />
      </div>

      <div className="formField">
        <label className="formFieldLabel" htmlFor="Email">E-mail</label>
        <input type="email"   id="Email"   className="formFieldInput" placeholder="E-mail" onChange={handleChange} />

        <br /><br /><label className="formFieldCheckboxLabel">
          <input className="formFieldCheckbox" type="checkbox" name="hasAgreed" onChange={handleChange} />{" "} I agree all statements in{" "}
          <a href="null" className="formFieldTermsLink"> terms of service </a>
        </label>
      </div>

      <div className="formField google-login">
        <button className="formFieldButton" onClick={onSubmit}>Sign Up</button>
        <label className="email_or_google">or</label>
        <GoogleLogin className='Google-button' buttonText='Sign Up with Google' />
      </div>
    </>
  )
}

export default Signup;