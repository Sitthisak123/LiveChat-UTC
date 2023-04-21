import './UserManage.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_Delete_User, API_GetAllUser } from '../../_APIs/system';
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
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import {
    StyledModalBox,
    StyledBTN,
} from './UserManage-styled';
import EditField from './Components/EditField';
import AddEditField from './Components/AddEditField';



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

const StyledGridOverlay = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: '#aeb8c2',
    },
    '& .ant-empty-img-2': {
        fill: '#f5f5f7',
    },
    '& .ant-empty-img-3': {
        fill: '#dce0e6',
    },
    '& .ant-empty-img-4': {
        fill: '#fff',
    },
    '& .ant-empty-img-5': {
        fillOpacity: '0.8',
        fill: '#f5f5f5',
    },
}));


function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <svg
                width="120"
                height="100"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                </g>
            </svg>
            <Box sx={{ mt: 1 }}>No Rows</Box>
        </StyledGridOverlay>
    );
}

const PAGE_SIZE = 15;

const UserDataTable = () => {
    const [UserData, setUserData] = useState([]);
    const [EditModal, setEditModal] = useState({ open: false, user: {} });
    const Navigate = useNavigate();
    const { admin_Store } = useSelector((state) => ({ ...state }));
    const [FieldsData, setFieldData] = useState([]);

    const HandleChangeFieldsData = (item) => {
        const key = item.keyitem;
        setFieldData([...FieldsData.filter((item) => item.keyitem !== key), item])
    }
    useEffect(() => {
        console.log(FieldsData);
    }, [FieldsData])

    useEffect(() => {
        API_GetAllUser(admin_Store.admin_data.admin_TOKEN).post('', {},).then((response) => {
            const newData = response.data.AllUserData.map((user, idx) => { return { id: idx, ...user } })
            setUserData([...newData]);
            // console.log(newData);
        }).catch((error) => {
            const data = error.response.data;
            console.log(data);
            if (data.route) {
                Navigate(data.route);
            }
            console.log(error);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [paginationModel, setPaginationModel] = useState({
        pageSize: PAGE_SIZE,
        page: 0,
    });
    const handleEdit = (user) => {
        setEditModal({ open: true, user });
    }
    const handleDelete = (user_id) => {
        alert('handleDelete');
        API_Delete_User(admin_Store.admin_data.admin_TOKEN).post('', { user_id }).then((response) => {
            alert(response.data.text)
        }).catch((error) => {
            const data = error.response.data;
            console.log(data);
        })
    }
    const handleCloseModal = () => {
        setFieldData([])
        setEditModal({ ...EditModal, open: false });
    }
    const handleUpdate = () => {
        console.log(FieldsData);
    }
    const columns = [
        { field: 'user_id', headerName: 'User ID', width: 80 },
        {
            field: 'user_image', headerName: 'Image', width: 80,
            renderCell: (params) => {
                return (
                    <Avatar alt={`${params.row.user_name}`} src={`http://localhost:9001/user/image/${params.row.user_id}/${params.row.user_profile_img}`} />
                )
            }
        },
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
                        <button onClick={() => handleEdit(params.row)}>Edit</button>
                        <button onClick={() => handleDelete(params.row.user_id)}>Delete</button>
                    </div>
                );
            },
        }
    ];

    const [availableItems, setAvailableItems] = useState([]);
    const [chosenItems, setChosenItems] = useState([]);

    useEffect(() => {
        // setAvailableItems(prevAvailableItems => {
        //   return prevAvailableItems.map(item => {
        //     switch(item.keyitem) {
        //       case 1:
        //         return { ...item, previousData: EditModal.user.user_id };
        //       case 2:
        //         return { ...item, previousData: EditModal.user.user_name };
        //       case 3:
        //         return { ...item, previousData: EditModal.user.user_password };
        //       case 4:
        //         return { ...item, previousData: EditModal.user.user_email };
        //       case 5:
        //         return { ...item, previousData: EditModal.user.user_phone };
        //       default:
        //         return item;
        //     }
        //   });
        // });
        setAvailableItems([
            { keyitem: 1, fieldName: '@ID', previousData: EditModal.user.user_custom_id },
            { keyitem: 2, fieldName: 'Name', previousData: EditModal.user.user_name },
            { keyitem: 3, fieldName: 'Password', previousData: EditModal.user.user_password },
            { keyitem: 4, fieldName: 'Email', previousData: EditModal.user.user_email },
            { keyitem: 5, fieldName: 'Phone', previousData: EditModal.user.user_phone }
        ])
        setChosenItems([])
    }, [EditModal]);

    const chooseItem = (keyitem) => {
        setChosenItems([...chosenItems, availableItems.find((item) => item.keyitem === keyitem)]);
        setAvailableItems(availableItems.filter((item) => item.keyitem !== keyitem));
    };

    const unchooseItem = (keyitem) => {
        setAvailableItems([...availableItems, chosenItems.find((item) => item.keyitem === keyitem)]);
        setChosenItems(chosenItems.filter((item) => item.keyitem !== keyitem));
    };

    return (
        <div style={{ maxHeight: '', width: '100%' }}>
            <StyledDataGrid
                // checkboxSelection
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[PAGE_SIZE]}
                slots={{
                    pagination: CustomPagination,
                    noRowsOverlay: CustomNoRowsOverlay,
                }}
                rows={UserData}
                columns={columns}
                autoHeight
            />

            <Modal
                open={EditModal.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <StyledModalBox>
                    <div className='modal-Header-Content'>
                        <div className='modal-profile'>
                            <Avatar
                                alt={`${EditModal.user.user_name}`}
                                src={`http://localhost:9001/user/image/${EditModal.user.user_id}/${EditModal.user.user_profile_img}`}
                                sx={{ width: '8rem', height: '8rem', fontSize: '4rem' }}
                            />
                            <p className='modal-profile-name'>{EditModal.user.user_name}</p>
                            <p>{`Friends: 15 status: Active`}</p>
                        </div>

                        <div className='modal-data-info'>
                            <div className='modal-data-field'>
                                <p className='Field-name'>User ID</p>
                                <p className='Field-data'>{EditModal.user.user_id}</p>
                            </div>
                            <div className='modal-data-field'>
                                <p className='Field-name'>Name</p>
                                <p className='Field-data'>{EditModal.user.user_name}</p>
                            </div>
                            <div className='modal-data-field'>
                                <p className='Field-name'>Username</p>
                                <p className='Field-data'>{EditModal.user.user_username}</p>
                            </div>
                            <div className='modal-data-field'>
                                <p className='Field-name'>Email</p>
                                <p className='Field-data'>{EditModal.user.user_email}</p>
                            </div>
                            <div className='modal-data-field'>
                                <p className='Field-name'>@ID</p>
                                <p className='Field-data'>{EditModal.user.user_custom_id}</p>
                            </div>
                            <div className='modal-data-field'>
                                <p className='Field-name'>Phone</p>
                                <p className='Field-data'>{EditModal.user.user_phone}</p>
                            </div>
                            <div className='modal-data-field'>
                                <p className='Field-name'>Password</p>
                                <p className='Field-data'>{EditModal.user.user_password}</p>
                            </div>
                        </div>

                        <div className='modal-actions-btn'>
                            <StyledBTN className='action-btn ban' onClick={() => alert('Baned')}>Ban</StyledBTN>
                            <StyledBTN className='action-btn delete' onClick={() => handleDelete(EditModal.user.user_id)}>Delete</StyledBTN>
                        </div>


                    </div>
                    <div className='modal-Footer-Content'>
                        <div className='footer-field-list'>
                            {
                                chosenItems.map((item) => {
                                    return (
                                        <EditField
                                            keyitem={item.keyitem}
                                            fieldName={item.fieldName}
                                            previousData={item.previousData}
                                            unchoose={unchooseItem}
                                            HandleChange={HandleChangeFieldsData}
                                        />
                                    )
                                })
                            }
                            {
                                availableItems.length ? <AddEditField
                                    choose={chooseItem}
                                    availableItems={availableItems}
                                /> : ''

                            }
                        </div>
                        <div className='modal-footer-actions'>
                            <StyledBTN className='action-btn close' onClick={handleCloseModal}>close</StyledBTN>
                            <StyledBTN className='action-btn update' onClick={handleUpdate}>Update</StyledBTN>
                        </div>
                    </div>
                </StyledModalBox>
            </Modal>

        </div>
    );
}
export default UserDataTable;