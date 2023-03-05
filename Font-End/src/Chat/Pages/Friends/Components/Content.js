import './Content..css'
import FriendCard from "./FreindCard";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { SearchText } from '../Friends';
import { CSSTransition } from 'react-transition-group';

const FriendContent = () => {
    const { textinput, setTextInput } = useContext(SearchText);
    const { pathname } = useLocation();
    const pathnamelowcase = pathname.toLowerCase();
    const [relationFilteredData, setRelationFilteredData] = useState([]);
    const [UserfilteredData, setUserFilteredData] = useState([]);
    const { User_data, Chat_data_users, Friends_relation } = useSelector((state) => ({ ...state }));
    const user_id = User_data.value.user_id;



    useEffect(() => {
        if (pathnamelowcase === '/home/friend/friends') {
            setRelationFilteredData(Friends_relation.Friend_data.filter((item) => item.relation_status === 1 || item.relation_status === 2));
        } else if (pathnamelowcase === '/home/friend/favorites') {
            setRelationFilteredData(Friends_relation.Friend_data.filter((item) => item.relation_status === 2));
        } else if (pathnamelowcase === '/home/friend/request') {
            setRelationFilteredData(Friends_relation.Friend_data.filter((item) => item.relation_status === 3));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, Friends_relation, Chat_data_users]);

    useEffect(() => {
        const filteredUsers = relationFilteredData.map((relation) => {
            return Chat_data_users.users.find(user => user.user_id === relation.fk_user_one) || Chat_data_users.users.find(user => user.user_id === relation.fk_user_two);
        });
        setUserFilteredData(filteredUsers);

    }, [relationFilteredData, relationFilteredData]);
    useEffect(() => { }, []);

    return (
        <div className="Friends">
            <div className="Friends-Content">

                {
                    relationFilteredData.map((data) => {
                        const friend_id = data.fk_user_one === user_id ? data.fk_user_two : data.fk_user_one;
                        const relation = data.relation_status;
                        const friendUsers = UserfilteredData.filter(user => user.user_id === friend_id);
                        if (textinput && textinput.trim() !== '') {
                            const filteredUsers = friendUsers.filter(user =>
                                user.user_name.toLowerCase().includes(textinput.toLowerCase())
                            );
                            return filteredUsers.map((user) => (
                                <CSSTransition   classNames="friend-card" >
                                    <FriendCard CardID={friend_id} CardType={relation} CardName={user.user_name} FriendID={friend_id} />
                                </CSSTransition>
                            ));
                        } else {
                            return friendUsers.map((user) => (
                                <CSSTransition   classNames="friend-card" unmounOnExit>
                                    <FriendCard CardID={friend_id} CardType={relation} CardName={user.user_name} FriendID={friend_id} />
                                 </CSSTransition>
                            ));
                        }
                    })
                }

            </div>
        </div>
    );
}

export default FriendContent;