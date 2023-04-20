import './components.css';
import EastIcon from '@mui/icons-material/East';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const EditField = (props) => {
    const { keyitem, fieldName, previousData , unchoose} = props;
    return (
        <>
            <div className="add-btn-frame">
                <p className='add-frame-field-namez'>{fieldName}</p>
                <div className='add-frame-data'>
                    <p className='previous-data'>{previousData}</p>
                    <EastIcon className='add-frame-data-icon' />
                    <input type='text' />
                </div>
                <CheckIcon />
                <div className='add-frame-action'>
                    <ClearIcon 
                    onClick={()=>{
                        unchoose(keyitem);
                    }} />
                </div>
            </div>
        </>
    )
}
export default EditField;