import { useContext } from "react";
import { UserOnline } from "../Main/main";
const RealTime = () => {
    const {onlineUser} = useContext(UserOnline);
    return (
        <>
        OnLine: {onlineUser}
        </>
    )
}

export default RealTime;