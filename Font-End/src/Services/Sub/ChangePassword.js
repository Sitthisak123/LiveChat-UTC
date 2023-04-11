import { useEffect, useState } from 'react';
import '../Service.css';
import { useLocation } from 'react-router-dom';
import { API_ChangePassword } from '../../_APIs/system';
const ChangePassword = () => {
    const [newPass, setNewPass] = useState({ pass_1: '', pass_2: '' ,FORGOT_PASS_TOKEN: ''});
    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setNewPass({...newPass, FORGOT_PASS_TOKEN: queryParams.get('Token')})
    },[])
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(newPass)
        if ((newPass.pass_1 === newPass.pass_2) && (newPass.pass_1 !== '' && newPass.pass_2 !== '')) {
            API_ChangePassword().post('', { ...newPass }).then((response) => {
                alert(response.data.text);
            }).catch((error) => {
                alert(error.response.data.text);
            })
        } else {
            alert('your new password not Match')
        }
    }
    return (
        <>
            <div className="formField">
                <label className="formFieldLabel" htmlFor="password1">new password</label>
                <input type="password" id="password1" className="formFieldInput" placeholder="new password" onChange={(event) => setNewPass({ ...newPass, pass_1: event.target.value })} />
            </div>
            <div className="formField">
                <label className="formFieldLabel" htmlFor="password2">confirm new password</label>
                <input type="password" id="password2" className="formFieldInput" placeholder="confirm new password" onChange={(event) => setNewPass({ ...newPass, pass_2: event.target.value })} />
            </div>

            <div className="formField google-login">
                <button className="formFieldButton" onClick={onSubmit}>Submit</button>
            </div>
        </>
    )
}

export default ChangePassword;