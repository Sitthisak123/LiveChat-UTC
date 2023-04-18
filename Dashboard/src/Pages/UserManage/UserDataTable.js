import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_GetAllUser } from '../../_APIs/system';
const columns = [
    { field: 'user_id',          headerName: 'ID',        width: 70 },
    { field: 'google_id',        headerName: 'google ID', width: 70 },
    { field: 'user_custom_id',   headerName: '@ID',       width: 70 },
    { field: 'user_username',    headerName: 'Username',  width: 90 },
    { field: 'user_name',        headerName: 'Name',      width: 90, },
    { field: 'user_email',       headerName: 'Email',     width: 190, },
    { field: 'user_password',    headerName: 'Password',  width: 90, },
    { field: 'user_phone',       headerName: 'Phone',     width: 90, },
];

const UserDataTable = () => {
    const [UserData, setUserData] = useState([]);
    const Navigate = useNavigate();
    const { admin_Store } = useSelector((state) => ({ ...state }));

    useEffect(()=>{
        API_GetAllUser(admin_Store.admin_data.admin_TOKEN).post('',{},).then((response)=>{
            const newData = response.data.AllUserData.map((user,idx) => {return {id: idx, ...user} })
            setUserData(newData);
            console.log(newData);
        }).catch((error)=>{
            const data = error.response.data;
            alert(data.text)
            console.log(data);
            // localStorage.removeItem('TOKEN');
            if (data.route) {
                Navigate(data.route);
            }
            console.log(error);
        })
    },[])
    return (
            <DataGrid
                sx={{height: 'calc(100vh - 3.5rem)'}}
                rows={UserData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
    );
}
export default UserDataTable;