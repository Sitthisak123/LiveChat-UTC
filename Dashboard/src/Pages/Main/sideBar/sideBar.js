import './sideBar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SideBarStyled } from "../main-styled";
import { SideBarHeadersStyled, SideBarOptoinStyled } from "./sideBar-styled";
import Logo_dark from '../../../_assets/Logo-dark-2.PNG';
import Logo_light from '../../../_assets/Logo-light.PNG';
import profile_img from '../../../_assets/1.jpg';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TableChartIcon from '@mui/icons-material/TableChart';

import { useSelector } from 'react-redux';

import SideBarOption from './Componenta/SideBarOption';

const SideBar = () => {
    const { admin_Store } = useSelector((state) => ({ ...state }));
    const OptionList = [
        {
            text: 'Dashboard',
            icon: AssessmentIcon,
            Items: [
                { IconItem: AutoGraphIcon, text: 'RealTime', to: 'RealTime' },
                { IconItem: QueryStatsIcon, text: 'Analysis', to: 'Analysis' },
            ],
        },
        {
            text: 'User Manage',
            icon: ManageAccountsIcon,
            Items: [
                { IconItem: TableChartIcon, text: 'Data Table', to: 'DataTable' },

            ],
        },
    ];

    return (
        <SideBarStyled>
            <SideBarHeadersStyled>
                <img src={Logo_dark} alt='Logo-img' className='Logo-img' />
                <div className='admin-profile'>
                    <img src={profile_img} alt='Profile-img' className='Profile-img' />
                    <p className='profile-name' >{admin_Store.admin_data.admin_name}</p>
                    <p className='profile-role' > GENERAL MANAGER. </p>
                </div>
            </SideBarHeadersStyled>
            {
                OptionList.map(option => <SideBarOption Text={option.text} Icon={option.icon} Items={option.Items} />)
            }
        </SideBarStyled>
    )

}
export default SideBar;