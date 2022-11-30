import { Routes, Route } from 'react-router-dom';
import Navbar from './Nav/Navbar.js';
import Profile from './Profile/Profile.js';
import Chat from './Chat/Chat.js';
import Friends from './Friends/Friends.js';
import Settings from './Settings/Settings.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="App-content">
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Routes>
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Routes>
          <Route path="/friends" element={<Friends />} />
        </Routes>
        <Routes>
          <Route path="/settings" element={<Settings />} />
        </Routes>
        
      </div>
    </div>
  );
}

export default App;
