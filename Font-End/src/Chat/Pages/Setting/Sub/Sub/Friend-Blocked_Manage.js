import { useContext, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FriendCard from "../../../Friends/Components/FreindCard";
import { useNavigate } from "react-router-dom";
import Headbar from '../Component/Headbar.js';
import { LanguageContext } from '../../../../../App';

const FriendBlockedManage = () => {
    const { User_data, Chat_data_conversation, Chat_data_users, Chat_data_msg, Friends_relation } = useSelector((state) => ({ ...state }));
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const { Language } = useContext(LanguageContext);

    useEffect(() => {
        const BlockedFiltered = Friends_relation.Friend_data.filter(relation =>
            relation.fk_user_one === User_data.value.user_id && relation.relation_status === 0
        )
        const UserFiltered = Chat_data_users.users.filter(user => BlockedFiltered.find(b => b.fk_user_two === user.user_id));
        setUserData(UserFiltered);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Friends_relation.Friend_data, Chat_data_users.users])
    return (
        <>
            <Headbar HeadName={'Friends Blocked Manage'} />
            {
                userData.length ? userData.map(blockedUser =>
                    <FriendCard
                        CardType={0}
                        CardName={blockedUser.user_name}
                        FriendID={blockedUser.user_id}
                        CardImage={blockedUser.user_profile_img}
                    />
                )
                    :
                    <h1>Not found</h1>

            }
        </>

    )
}
export default FriendBlockedManage;