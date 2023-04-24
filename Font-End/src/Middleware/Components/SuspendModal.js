import './Conponents.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CLEAR_SUSPEND_STATUS } from '../../_stores/Slices/system';
import { useDispatch } from 'react-redux';


const SuspendModal = (props) => {
    const { suspendAt, expiresIn, text } = props;
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    function handleBack() {
        Navigate("/Login");
        dispatch(CLEAR_SUSPEND_STATUS());
        return;
    }

    function getTimeLeft() {
        const difference = new Date(expiresIn) - new Date();
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor(difference / (1000 * 60 * 60 * 24) % 365);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return { years, days, hours, minutes, seconds };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='container'>
            <div className='Suspend-Modal'>
                <div className='Suspend-Modal-Header'>
                    <p>Your account has Baned</p>
                </div>
                <div className='Modal-Content' >
                    Time left: {timeLeft.years ? `${timeLeft.years}y` : ''}{timeLeft.days}d {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
                </div>
                <div className='Modal-Action' >
                    <button onClick={handleBack}>OK</button>
                </div>
            </div>
        </div>

    )
}
export default SuspendModal;