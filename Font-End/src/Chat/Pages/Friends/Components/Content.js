import './Content..css'
import FriendCard from "./FreindCard";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
const FriendContent = () => {
    const { pathname } = useLocation();
    const pathnamelowcase = pathname.toLowerCase();
    useEffect(()=>{
        if(pathnamelowcase === '/home/friend/friends'){
            
        }else if(pathnamelowcase === '/home/friend/favorites'){

        }else if(pathnamelowcase === '/home/friend/request'){

        }
    },[])
    return (
        <div className="Friends">
            <div className="Friends-Content">
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
            </div>
        </div>
    );
}
export default FriendContent;