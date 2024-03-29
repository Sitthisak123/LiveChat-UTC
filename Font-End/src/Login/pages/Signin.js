// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
// eslint-disable-next-line no-unused-vars
import { gapi } from 'gapi-script';
import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CREATE_USER } from '../../_stores/Slices/user.js';
import { API_Login } from '../../_APIs/user.js';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import useErrorHandling from '../../_methods/HandleError.js';
import { LanguageContext } from '../../App.js';
const Signin = () => {
  const [loginOnload, setLoginOnload] = useState(false);
  const Navigate = useNavigate();
  const [useFormdata, setFormdata] = useState();
  const { handleErrors } = useErrorHandling();
  const dispatch = useDispatch()
  const { Language } = useContext(LanguageContext);

  // const { useAppData, setAppData } = useContext(AppDataContext);
  function handleChange(event) {
    setFormdata({
      ...useFormdata,
      [event.target.id]: event.target.value
    });
  }
  async function onSubmit(event) {
    setLoginOnload(true);
    event.preventDefault();
    try {
      const response = await API_Login.post('', { ...useFormdata });
      setLoginOnload(false);
      dispatch(CREATE_USER(response.data));
      console.log(response.data)
      localStorage.setItem("TOKEN", JSON.stringify({ user_TOKEN: response.data.user_TOKEN }));
      Navigate('/Auth');
    } catch (error) {
      setLoginOnload(false);
      handleErrors(error);
    }
  }


  return (
    <>
      <div className="formField">
        <label className="formFieldLabel" htmlFor="Username">{Language.SignIn.username}</label>
        <input type="text" id="Username" className="formFieldInput" placeholder={`${Language.SignIn.username} ${Language.Login.or} ${Language.SignUp.email}`} onChange={handleChange} />
      </div>

      <div className="formField">
        <label className="formFieldLabel" htmlFor="Password">{Language.SignIn.password}</label>
        <input type="Password" id="Password" className="formFieldInput" placeholder={Language.SignIn.password} onChange={handleChange} />
        <br /><br /><label className="formFieldCheckboxLabel">
          <a href="../Services/ForgotPassword" className="formFieldTermsLink forgotPSW" >{Language.SignIn.forgotPSW}</a>
        </label>
      </div>

      <div className="formField google-login">
        {
          !loginOnload ?
            <button className="formFieldButton submit-btn" onClick={onSubmit}>{Language.SignIn.signin}</button>
            :
            <button className="formFieldButton">
              <Fade
                in={true}
                style={{
                  transitionDelay: '0ms'
                }}
                unmountOnExit
              >
                <CircularProgress color='secondary' size={20} />
              </Fade>
            </button>
        }
        <label className="email_or_google">{Language.Login.or}</label>
        <GoogleLogin className='Google-button' />
      </div>
    </>
  )
}


export default Signin;