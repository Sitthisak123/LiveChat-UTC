import { useEffect, useState } from 'react';
import '../Service.css';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
    const [newPass, setNewPass] = useState({ pass_1: '', pass_2: '', FORGOT_PASS_TOKEN: '' });
    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setNewPass({ ...newPass, FORGOT_PASS_TOKEN: queryParams.get('Token') })
    }, [])
    const onSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <>
            <p className="headers-subService">Verify Your Email Address</p>
            <p className="infomatios-subService">A verification code has been sent to<br />
             <b>{'64301282028@utc.ac.th'}</b>
            </p>
            <p className="infomatios-subService">
                please check your inbox and enter the verification code below to verify your email address. the code will expire in 
                <b>{' >time<'}</b>
            </p>

            <div className="formField">
                <input type='number' className='formFieldInput-number'/>
            </div>
            
            <div className="formField Btns">
                <button className='Btn-subService' >Resend</button>
                <button className='Btn-subService' >Verify</button>
            </div>
            

        </>
    )
}

export default VerifyEmail;