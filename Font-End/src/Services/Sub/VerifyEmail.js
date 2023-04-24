import { useEffect, useState } from 'react';
import '../Service.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_verifyEmail, API_verifyCode_reSend } from '../../_APIs/system';

const VerifyEmail = () => {
    const [Email, setEmail] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const Navigate = useNavigate();

    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setEmail(queryParams.get('Email'));
    }, [])
    const onVerify = (event) => {
        event.preventDefault();
        API_verifyEmail().post('', { Email, verifyCode }).then((response) => {
            console.log(response.data);
            Navigate("/Login/Signin");
            alert(response.data.text);
        }).catch((error) => {
            alert(error.response.data.text);
            console.log(error.response.data);
        });
    }
    const onResendVerifyCode = (event) => {
        event.preventDefault();
        API_verifyCode_reSend().post('', { Email }).then((response) => {
            alert(response.data.text);
            console.log()(response.data);
        }).catch((error) => {
            alert(error.response.data.text);
            console.log(error.response.data);
        })

    }
    return (
        <>
            <p className="headers-subService">Verify Your Email Address</p>
            <p className="infomatios-subService">A verification code has been sent to<br />
                <b>{Email}</b>
            </p>
            <p className="infomatios-subService">
                please check your inbox and enter the verification code below to verify your email address. the code will expire in
                <b>{' >time<'}</b>
            </p>
            <p className="infomatios-subService danger-info">
                please verify e-mail in 24 hour. Your data will has delete
            </p>

            <div className="formField">
                <input type='number' className='formFieldInput2-number' onChange={(event) => setVerifyCode(event.target.value)} />
            </div>

            <div className="formField Btns">
                <button className='Btn-subService' onClick={onResendVerifyCode} >Resend</button>
                <button className='Btn-subService' onClick={onVerify} >Verify</button>
            </div>


        </>
    )
}

export default VerifyEmail;