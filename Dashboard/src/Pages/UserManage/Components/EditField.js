import './components.css';
import EastIcon from '@mui/icons-material/East';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useRef, useState } from "react";
import { API_User_validate } from "../../../_APIs/system";
import { useSelector } from 'react-redux';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


const EditField = (props) => {
    const { keyitem, fieldName, previousData, unchoose, HandleChange, onFieldFocus } = props;
    const { admin_Store } = useSelector((state) => ({ ...state }));
    const InputField = useRef();
    const [onValidate, setOnValidate] = useState({ load: false, state: false });

    useEffect(() => {
        InputField.current.value = previousData;
        HandleChange({ keyitem, fieldName, FieldData: previousData, state: false })
    }, [])
    const HanndleInputBlur = () => {
        const FieldData = InputField.current.value;
        if (FieldData !== previousData && FieldData.trim() !== '' && FieldData !== undefined) {
            setOnValidate({ ...onValidate, load: true });
            API_User_validate(admin_Store.admin_data.admin_TOKEN).post('', { itemKey: keyitem, itemData: FieldData }).then((response) => {
                setOnValidate({ ...onValidate, load: false, state: response.data });
                HandleChange({ keyitem, fieldName, FieldData, state: response.data })
                onFieldFocus(false)

            }).catch((error) => {
                onFieldFocus(false)

                setOnValidate({ ...onValidate, load: false });
                console.log(error.response)
                // alert(error.response.data.text);
            })
        } else {
            onFieldFocus(false)

            setOnValidate({ ...onValidate, state: false });
        }
    }
    return (
        <>
            <div className="add-btn-frame">
                <p className='add-frame-field-namez'>{fieldName}</p>
                <div className='add-frame-data'>
                    <p className='previous-data'>{previousData}</p>
                    {

                        <EastIcon className='add-frame-data-icon' />
                    }

                    <input
                        type='text'
                        ref={InputField}
                        onChange={() => setOnValidate({ ...onValidate, state: null })}
                        onBlur={HanndleInputBlur}
                        onFocus={() => onFieldFocus(true)}
                    />
                </div>
                {
                    onValidate.load ?
                        <Fade in={true} style={{ transitionDelay: '0ms' }} unmountOnExit >
                            <CircularProgress />
                        </Fade>
                        :
                        onValidate.state === true ?
                            <CheckIcon />
                            :
                            onValidate.state === false ?
                                <ReportProblemIcon />
                                : <div style={{ width: '1.5rem' }} ></div>

                }

                {
                    onValidate.load ?
                        <div className='add-frame-action'>
                            <ClearIcon />
                        </div>
                        :
                        <div className='add-frame-action' onMouseDown={() => unchoose(keyitem)}>
                            <ClearIcon
                                 />
                        </div>
                }

            </div>
        </>
    )
}
export default EditField;