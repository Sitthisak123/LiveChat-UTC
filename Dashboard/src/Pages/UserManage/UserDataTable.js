import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'user_id',          headerName: 'ID',        width: 70 },
    { field: 'google_id',        headerName: 'google ID', width: 70 },
    { field: 'user_custom_id',   headerName: '@ID',       width: 130 },
    { field: 'user_username',    headerName: 'Username',  width: 130 },
    { field: 'user_name',        headerName: 'Name',      type: 'number', width: 90, },
    { field: 'user_email',       headerName: 'Email',     type: 'number', width: 90, },
    { field: 'user_password',    headerName: 'Password',  type: 'number', width: 90, },
    { field: 'user_phone',       headerName: 'Phone',     type: 'number', width: 90, },
];

const rows = [

];

const UserDataTable = () => {
    return (
            <DataGrid
                sx={{height: 'calc(100vh - 3.5rem)'}}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
    );
}
export default UserDataTable;