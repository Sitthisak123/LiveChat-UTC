import './Chat_personSearch.css';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const Chat_personSearch = () => {
  return (
    <div className="input_box">
      <div className="input_icon"> { <PersonSearchIcon sx={{ fontSize: 35 }} /> } </div>
      <input type="text" placeholder="Search" className="input_text" />
    </div>
    )
}
export default Chat_personSearch;