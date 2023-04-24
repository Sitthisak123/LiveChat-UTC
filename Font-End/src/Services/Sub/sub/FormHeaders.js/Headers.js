import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from 'react-router-dom';
const FormHeaders = (props) => {
    const { HeaderName } = props;
    const navigate = useNavigate();
    return (
        <div className='Form-headers'>
            <ArrowBackIosNewOutlinedIcon onClick={() => navigate("/Login")} />
            <p>{HeaderName}</p>
            <div></div>
        </div>
    )
}
export default FormHeaders;