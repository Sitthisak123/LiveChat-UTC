import './Chat_message.css';

const Chat_message = (props) => {
  const from_one_class = 'from_one'
  const from_two_class = 'from_two'
  const {id, from_id, message, timest} = props
  
  return(
    <div className={`message_Box-${ from_id === "one" ? from_one_class:from_two_class }`}>
      <div className={`message_class ${ from_id === "one" ? from_one_class:from_two_class }`}>
      { ` ${message} ${from_id}`}
      </div>
    </div>
    )
}
export default Chat_message;