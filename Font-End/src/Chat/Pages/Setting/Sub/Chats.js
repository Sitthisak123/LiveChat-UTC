import Headbar from './Component/Headbar.js';
import { StyledOptionSection, StyledSettingIconButton } from '../../../styles.js';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useRef } from 'react';


function Chats() {
    const [fontSelet, setFontSelect] = useState({ isOpen: false, value: 'Small' });
    return (
        <>
            <Headbar HeadName={'Chats'} />
            <div className='option' >
                <StyledOptionSection>Manage friends</StyledOptionSection>
                <StyledSettingIconButton
                    disableRipple
                    sx={{ fontSize: '1.2rem' }}
                    onClick={() => setFontSelect({ ...fontSelet, isOpen: true })}
                >
                    <p>Fontsize</p>
                    {`<${fontSelet.value}>`}
                </StyledSettingIconButton>
            </div>

            <Dialog
                fullWidth={null}
                maxWidth={null}
                open={fontSelet.isOpen}
                onClose={() => setFontSelect({ ...fontSelet, isOpen: false })}
            >
                <DialogTitle sx={{ userSelect: 'none' }}>Optional sizes</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        <FormControl sx={{ mt: 2, minWidth: 120 }}>
                            <InputLabel htmlFor="max-width" sx={{ userSelect: 'none' }}>Fontsize</InputLabel>
                            <Select
                                autoFocus
                                value={fontSelet.value}
                                onChange={(event) => setFontSelect({...fontSelet, value: event.target.value})}
                                label="maxWidth"
                                inputProps={{
                                    name: 'max-width',
                                    id: 'max-width',
                                }}
                            >
                                <MenuItem value="Small">Small</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Large">Large</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setFontSelect({ ...fontSelet, isOpen: false })}>Apply</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Chats;
