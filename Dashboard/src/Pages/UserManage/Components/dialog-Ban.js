import './components.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useRef, useState, useCallback } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { API_Ban_User } from '../../../_APIs/system';
import { useSelector } from 'react-redux';
const DialogBan = (props) => {
    const { admin_Store } = useSelector((state) => ({ ...state }));
    const { dialogs, setDialogs, UID } = props;
    const [timeOption, setTimeOption] = useState('');
    const [expire, setExpire] = useState('');
    const TimeInputField = useRef();
    const TimeOption = useRef();
    const handleChangeInputTime = useCallback(() => {
        const OptionValue = TimeOption.current?.value;
        const inputDate = TimeInputField.current?.value;
        const now = new Date();
        const resultDate = new Date(
          now.getTime() +
            (OptionValue === "Hour"
              ? inputDate * 60 * 60 * 1000
              : OptionValue === "Day"
              ? inputDate * 24 * 60 * 60 * 1000
              : OptionValue === "Month"
              ? inputDate * 30 * 24 * 60 * 60 * 1000
              : OptionValue === "Year"
              ? inputDate * 365 * 24 * 60 * 60 * 1000
              : 0)
        );
      
        const options = {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        };
      
        setExpire(
          resultDate
            ? resultDate.toLocaleString("en-GB", options)
            : ""
        );
      }, [setExpire]);
      
      

    const handleChangeTimeOption = useCallback(() => {
        const OptionValue = TimeOption.current?.value;
        setTimeOption(OptionValue);
        handleChangeInputTime();
    }, [handleChangeInputTime, setTimeOption]);

    const handleCloseModal = useCallback(() => {
        setDialogs({ ...dialogs, ban: false });
        setTimeOption(null);
        setExpire(null);
    }, [setDialogs, dialogs, setTimeOption, setExpire]);

    const handleBanUser = () => {
        API_Ban_User(admin_Store.admin_data.admin_TOKEN).post('', { user_id: UID, expireDateTime: expire })
            .then((response) => {
                alert(response.data.text);
            }).catch((error) => {
                alert(error.response.data.text);
            })
    }



    return (
        <>
            <Dialog
                open={dialogs.ban}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Ban'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <label for="time-option">Select Time Option:</label>
                        <select
                            id="time-option"
                            name="time-option"
                            onChange={handleChangeTimeOption}
                            ref={TimeOption}
                        >
                            <option value="Default" selected disabled hidden >Select</option>
                            <option value="Hour">Hour</option>
                            <option value="Day">Day</option>
                            <option value="Month">Month</option>
                            <option value="Year">Year</option>
                            <option value="DatePicker">DatePicker</option>
                            <option value="Permanent">Permanent</option>
                        </select>
                        <FormControl fullWidth>

                            {
                                timeOption === 'Hour' || timeOption === 'Day' || timeOption === 'Month' || timeOption === 'Year' ?
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        type='number'
                                        endAdornment={<InputAdornment position="end">{timeOption}</InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                        onChange={handleChangeInputTime}
                                        inputRef={TimeInputField}
                                    />
                                    :
                                    timeOption === 'DatePicker' ?
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker label="date picker" />
                                            </DemoContainer>
                                        </LocalizationProvider> : ''
                            }
                            {
                                timeOption === 'Hour' || timeOption === 'Day' || timeOption === 'Month' || timeOption === 'Year' ?
                                    <FormHelperText id="outlined-weight-helper-text">{expire}</FormHelperText>
                                    : timeOption === 'Permanent' ? ''
                                        : ''

                            }
                        </FormControl>
                    </DialogContentText>
                </DialogContent >
                <DialogActions>
                    <Button onClick={handleCloseModal} > Close </Button>
                    <Button onClick={handleBanUser} > Ban </Button>
                </DialogActions>
            </Dialog >
        </>
    )
}
export default DialogBan;