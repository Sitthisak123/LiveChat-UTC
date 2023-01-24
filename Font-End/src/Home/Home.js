import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.js';
import './Home.css';
import Axios from 'axios';


const Home = () => {
  return (
    <>
      <div className="App">
        <Navbar />
        <div className="App-content">
          <Outlet />
        </div>
      </div>
    </>
  )
}
export default Home;
