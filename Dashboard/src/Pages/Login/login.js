import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API_Login } from '../../_APIs/admin.js'
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import { CREATE_ADMIN } from '../../_stores/Slices/admin';
import { useDispatch } from 'react-redux';
const Login = () => {
    useEffect(() => {
        const TOKEN = JSON.parse(localStorage.getItem('TOKEN'));
        if (TOKEN) {
            dispatch(CREATE_ADMIN(TOKEN));
            Navigate("/Auth");
        }
    }, [])


    const [loginOnload, setLoginOnload] = useState(false);
    const Navigate = useNavigate();
    const [useFormdata, setFormdata] = useState();
    const dispatch = useDispatch();


    function handleChange(event) {
        setFormdata({
            ...useFormdata,
            [event.target.id]: event.target.value
        })
    }

    async function onSubmit(event) {
        setLoginOnload(true)
        event.preventDefault();
        try {
            const response = await API_Login.post('', { ...useFormdata });
            setLoginOnload(false)
            dispatch(CREATE_ADMIN(response.data))
            localStorage.setItem("TOKEN", JSON.stringify({ admin_TOKEN: response.data.admin_TOKEN }));
            Navigate('/Auth');
        } catch (error) {
            setLoginOnload(false)
            if (error.response) {
                console.log(error.response.data);
                alert(error.response.data)
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
            <div className='Login-page'>
                <form className='Form-login'>
                    <div className='Header-login'><h1>Login</h1></div>
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="Username">Username</label>
                        <input type="text" id="Username" className="formFieldInput" placeholder="Username or E-mail" onChange={handleChange} />
                    </div>

                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="Password">Password</label>
                        <input type="Password" id="Password" className="formFieldInput" placeholder="Password" onChange={handleChange} />
                    </div>

                    <div className="formField google-login">
                        {
                            !loginOnload ?
                                <button className="formFieldButton" onClick={onSubmit}>Sign In</button>
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
                    </div>
                </form>
            </div>
        </>

    )
}


export default Login;