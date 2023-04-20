import { StyledAddEditFieldBTN } from "../UserManage-styled";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { API_ChangeName } from '../../../_APIs/system';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import Button from '@mui/material/Button';


const EditField = (props) => {
    const { unchoose, choose, availableItems } = props;
    const [dialog, setDialog] = useState(false)

    return (
        <>
            <StyledAddEditFieldBTN onClick={() => setDialog(true)} className='add-edit-field-btn'>Add</StyledAddEditFieldBTN >

            <Dialog
                open={dialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Select'}
                </DialogTitle>
                <DialogContent>
                    {
                        availableItems.map((item) => {
                            return <Button
                                onClick={() => {
                                    choose(item.keyitem);
                                    setDialog(false);
                                }
                                }
                                id={item.keyitem}>
                                {item.fieldName}
                            </Button>
                        })
                    }
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={null} id='yes'> Yes </Button>
                    <Button onClick={null} id='no' autoFocus> No </Button> */}
                </DialogActions>
            </Dialog>

        </>
    )
}
export default EditField;