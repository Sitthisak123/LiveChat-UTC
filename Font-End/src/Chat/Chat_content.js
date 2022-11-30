import './Chat_content.css';
import Chat_friend from './Chat_friend';
import Chat_message from './Chat_message';
import Chat_TextField from './Chat_TextField';

const Chat_content = () => {
  const message = [ /* test data */
    {"id":1, "from_id":"one", "message": "ycyvuuvuvu", "timest": "12/12/2012 12:12"},
    {"id":2, "from_id":"two", "message": "ycyug7g5d4d5f6gvu", "timest": "12/12/2012 12:12"},
    {"id":3, "from_id":"one", "message": "ycjbuvycyvu", "timest": "12/12/2012 12:12"},
    {"id":4, "from_id":"two", "message": "huvub567874", "timest": "12/12/2012 12:12"},
    {"id":5, "from_id":"two", "message": "ycyvujbub", "timest": "12/12/2012 12:12"},
    {"id":6, "from_id":"one", "message": "ycyubbvu", "timest": "12/12/2012 12:12"},
    {"id":7, "from_id":"one", "message": "ycyvuggguvu", "timest": "12/12/2012 12:12"},
    {"id":8, "from_id":"two", "message": "ycbibiycyyyycbibiniihuvuvuvyyvuyycbibiniihuvuvuvyyvucbibiniihuvuvuvyyvucbibiniihuvuvuvyyvuycbibiniihuvuvuvyyvucbibiniihuvuvuvyyvucbibiniihuvuvuvyyvubibiniihuvuvuvyyvuniihuvuvuvyyvu", "timest": "12/12/2012 12:12"},
    {"id":9, "from_id":"one", "message": "ycy4688888vu", "timest": "12/12/2012 12:12"},
    {"id":10, "from_id":"one", "message": "ycyv56r7t8ru5e7r7u", "timest": "12/12/2012 12:12"}]
    const friends = [ /* test data */
      {"id":1, "name": "XDA-7", "last_message": "Hello what are you doing."},
      {"id":2, "name": "James", "last_message": "Hello."},
      {"id":3, "name": "XDA-6", "last_message": "Hello what."},
      {"id":4, "name": "XDA-5", "last_message": "Hello what are."},
      {"id":5, "name": "XDA-4", "last_message": "Hello what are you."},
      {"id":6, "name": "XDA-3", "last_message": "Hello what are you doing."}
      ]
  return (
    <div className="Chat_content-section">
      <div className="Chat_friends">
       <Chat_friend key={99} name={'XDA-MASTER_123456789'} last_message={'Hello what are you doing.hccycyvycycy uvubibub ihihihib ihigg'}/>
        {friends.map((data, key) => {
          return <Chat_friend key={data.id} name={data.name} last_message={data.last_message}/>
        })}
      </div>
      <div className="Chat_conversation">
        {message.map((data,key) => {
          return <Chat_message {...data} />
        })}
       <Chat_TextField />
      </div>
    </div>
    )
}
export default Chat_content;