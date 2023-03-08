import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { Responsive } from "../../../../../styles/variables";
import { useNavigate } from "react-router-dom";
import {
    StyledPageHeaders,
    StyledAddFriendIconButton,
} from '../../../../styles';

const Headbar = (props) => {
    const { HeadName } = props;
    const Navigate = useNavigate();
    return (
        <StyledPageHeaders style={{ marginBottom: '.5rem' }}>
            <StyledAddFriendIconButton
                aria-label={'Back to Friend list'}
                style={{
                    height: Responsive.sidebar,
                    minWidth: '2rem',
                    padding: 0,
                    paddingLeft: '.6rem',
                    paddingRight: '.8rem',
                    fontSize: '1.2rem',
                    top: 0,
                    left: 0,
                }}
                onClick={() => Navigate(-1)}
            >
            </StyledAddFriendIconButton>
            <ArrowBackIosNewOutlinedIcon />
            <p style={{ textAlign: 'unset', marginLeft: '.5rem', fontSize: '1.3rem' }}>
                {HeadName? HeadName:'undefined Name of Headbar'}
            </p>
        </StyledPageHeaders>
    )
}
export default Headbar;