import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_GetAllUser } from '../../_APIs/system';
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Avatar from '@mui/material/Avatar';


const columns = [
    {
        field: 'user_image', headerName: 'Image', width: 80,
        renderCell: (params) => {
            return (
                <Avatar alt={`${params.row.user_name}`} src={`http://localhost:9001/user/image/${params.row.user_id}/${params.row.user_profile_img}`} />
            )
        }
    },
    { field: 'user_id', headerName: 'User ID', width: 100 },
    { field: 'google_id', headerName: 'google ID', width: 110 },
    { field: 'user_custom_id', headerName: '@ID', width: 110 },
    { field: 'user_username', headerName: 'Username', width: 140 },
    { field: 'user_name', headerName: 'Name', width: 180, },
    { field: 'user_email', headerName: 'Email', width: 190, },
    { field: 'user_password', headerName: 'Password', width: 150, },
    { field: 'user_phone', headerName: 'Phone', width: 130, },
    {
        field: 'actions', headerName: 'Actions',
        width: 150,
        renderCell: (params) => {
            return (
                <div>
                    <button onClick={() => console.log(params.row)}>Edit</button>
                    <button onClick={() => console.log(params.row)}>Delete</button>
                </div>
            );
        },
    }
];


function customCheckbox() {
    return {
        '& .MuiCheckbox-root svg': {
            width: 16,
            height: 16,
            backgroundColor: 'transparent',
            border: `1px solid #d9d9d9'
                }`,
            borderRadius: 2,
        },
        '& .MuiCheckbox-root svg path': {
            display: 'none',
        },
        '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
        },
        '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
            position: 'absolute',
            display: 'table',
            border: '2px solid #fff',
            borderTop: 0,
            borderLeft: 0,
            transform: 'rotate(45deg) translate(-50%,-50%)',
            opacity: 1,
            transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
            content: '""',
            top: '50%',
            left: '39%',
            width: 5.71428571,
            height: 9.14285714,
        },
        '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
            width: 8,
            height: 8,
            backgroundColor: '#1890ff',
            transform: 'none',
            top: '39%',
            border: 0,
        },
    };
}

const StyledDataGrid = styled(DataGrid)(() => ({
    border: 0,
    color: 'rgba(0,0,0,.85)',
    // eslint-disable-next-line no-sparse-arrays
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"', ,
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: '#fafafa',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid #f0f0f0
            }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid #f0f0f0
            }`,
    },
    '& .MuiDataGrid-cell': {
        color: 'rgba(0,0,0,.85)',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },
    ...customCheckbox(),
}));

function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            page={page + 1}
            count={pageCount}
            // @ts-expect-error
            renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    );
}

const PAGE_SIZE = 15;

const UserDataTable = () => {
    const [UserData, setUserData] = useState([]);
    const Navigate = useNavigate();
    const { admin_Store } = useSelector((state) => ({ ...state }));


    useEffect(() => {
        API_GetAllUser(admin_Store.admin_data.admin_TOKEN).post('', {},).then((response) => {
            const newData = response.data.AllUserData.map((user, idx) => { return { id: idx, ...user } })
            setUserData([...newData, ...newData]);
            console.log(newData);
        }).catch((error) => {
            const data = error.response.data;
            alert(data.text)
            console.log(data);
            localStorage.removeItem('TOKEN');
            if (data.route) {
                Navigate(data.route);
            }
            console.log(error);
        })
    }, [])


    const [paginationModel, setPaginationModel] = useState({
        pageSize: PAGE_SIZE,
        page: 0,
    });

    return (
        <div style={{ maxHeight: '', width: '100%' }}>
            <StyledDataGrid
                checkboxSelection
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[PAGE_SIZE]}
                slots={{
                    pagination: CustomPagination,
                }}
                rows={UserData}
                columns={columns}
                autoHeight
            />
        </div>
    );
}
export default UserDataTable;