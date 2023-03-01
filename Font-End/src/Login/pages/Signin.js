// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
// eslint-disable-next-line no-unused-vars
import { gapi } from 'gapi-script';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_USER } from '../../_stores/Slices/user.js';
import { API_Login } from '../../_APIs/user.js';
const Signin = () => {

  const Navigate = useNavigate();
  const [useFormdata, setFormdata] = useState();

  const user1 = useSelector((state) => state.value)
  const dispatch = useDispatch()

  // const { useAppData, setAppData } = useContext(AppDataContext);
  function handleChange(event) {
    setFormdata({
      ...useFormdata,
      [event.target.id]: event.target.value
    })
  }
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await API_Login.post('',{ ...useFormdata });
      alert('login')
      dispatch(CREATE_USER(response.data));
      localStorage.setItem("TOKEN", JSON.stringify({user_TOKEN: response.data.user_TOKEN}));
      Navigate('/Auth');
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  }

  ///////// Debug ////////////
  useEffect(() => {
    console.log(useFormdata);
  }, [useFormdata]);
  /////////////////////////////

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