import '../Service.css';
import { API_ForgotPassword } from '../../_APIs/system';
import { useState } from 'react';

const ForgotPassword = () => {
    const [Email, setEmail] = useState('');
    const onSubmit = (event) => {
        event.preventDefault();
        API_ForgotPassword().post('',{Email}).then((response)=>{
            alert(response.data.text)
        }).catch((error) => {
            alert(error.response.data.text)
        })
    }
    return (
        <>
            <div className="formField">
                <label className="formFieldLabel" htmlFor="Email">Your E-mail</label>
                <input type="Email" id="Email" className="formFieldInput" placeholder="E-mail" onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div className="formField google-login">
                <button className="formFieldButton" onClick={onSubmit}>Send</button>
            </div>
        </>
    )
}

export default ForgotPassword;