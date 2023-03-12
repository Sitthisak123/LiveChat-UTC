// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const ENDPOINT = 'http://localhost:9001';

// const Chat = () => {
//   const [socket, setSocket] = useState(null);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const newSocket = io(ENDPOINT,{
//       // pass the token in the headers field
//       extraHeaders: {
//         'access-token-key':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2VtYWlsIjoiamFtZXMyNTEyNTMzNzAxN0BnbWFpbC5jb20iLCJpYXQiOjE2Nzg2MzE0MTgsImV4cCI6MTY3ODY2NzQxOH0.Dnf3z9jRu9-sctEJgZNd7Z6WNl38LaXKSI9esS5D2Ys"
//       }});
//     // Assuming you have access to the user_id value on the client-side
//     setSocket(newSocket);
//     return () => newSocket.close();
//   }, []);

//   useEffect(() => {
//     if (!socket) return;

//     socket.on('send', (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     socket.on('message', (data) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     return () => socket.off('send');
//   }, [socket]);

//   const handleInputChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     socket.emit('send', message);
//     setMessage('');
//   };

//   return (
//     <div>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>{msg}</li>
//         ))}
//       </ul>
//       <form onSubmit={handleFormSubmit}>
//         <input type="text" value={message} onChange={handleInputChange} />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
