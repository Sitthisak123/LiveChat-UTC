// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
// eslint-disable-next-line no-unused-vars
import { gapi } from 'gapi-script';
import { useState, useEffect, useContext, useRef } from 'react';
import { API_Register } from '../../_APIs/user';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

const Signup = () => {
  const [useFormdata, setFormdata] = useState({});
  const Navigate = useNavigate();
  const Submit_btn = useRef();
  const [resOnload, setResOnload] = useState(false);

  function handleChange(event) {
    if (event.target.type === 'checkbox') {
      // if(event.target.value){
      //   Submit_btn.current.disabled = true
      // }else{
      //   Submit_btn.current.disabled = false

      // }
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
    setResOnload(true)
    API_Register().post('', { ...useFormdata }).then(response => {
      setResOnload(false);
      console.log(response)
      localStorage.setItem("TOKEN", JSON.stringify({ user_TOKEN: response.data.TOKEN }));
      Navigate('/Auth');
    }).catch(error => {
      setResOnload(false);
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
        <input type="text" id="Username" className="formFieldInput" placeholder="Username" onChange={handleChange} />
      </div>

      <div className="formField">
        <label className="formFieldLabel" htmlFor="Password">Password</label>
        <input type="Password" id="Password" className="formFieldInput" placeholder="Password" onChange={handleChange} />
      </div>

      <div className="formField">
        <label className="formFieldLabel" htmlFor="Confirm Password">Confirm Password</label>
        <input type="Password" id="ConfirmPassword" className="formFieldInput" placeholder="Confirm Password" onChange={handleChange} />
      </div>

      <div className="formField">
        <label className="formFieldLabel" htmlFor="Email">E-mail</label>
        <input type="email" id="Email" className="formFieldInput" placeholder="E-mail" onChange={handleChange} />

        <br /><br /><label className="formFieldCheckboxLabel">
          <input className="formFieldCheckbox" type="checkbox" name="hasAgreed" onChange={handleChange} />{" "} I agree all statements in{" "}
          <a href="null" className="formFieldTermsLink"> terms of service </a>
        </label>
      </div>

      <div className="formField google-login">
        {
          !resOnload ?
            <button className="formFieldButton" ref={Submit_btn} onClick={onSubmit}>Sign Up</button>
            :
            <button className="formFieldButton" disabled={true} ref={Submit_btn} >
              <Fade
                in={true}
                style={{
                  transitionDelay: '0ms'
                }}
                unmountOnExit
              >
                <CircularProgress color='secondary' size={20}/>
              </Fade>
            </button>

        }
        <label className="email_or_google">or</label>
        <GoogleLogin className='Google-button' buttonText='Sign Up with Google' />
      </div>
    </>
  )
}

export default Signup;