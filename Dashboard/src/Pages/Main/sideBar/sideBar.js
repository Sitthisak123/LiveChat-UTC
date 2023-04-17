import './sideBar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SideBarStyled } from "../main-styled";
import { SideBarHeadersStyled, SideBarOptoinStyled } from "./sideBar-styled";
import Logo_dark from '../../../_assets/Logo-dark-2.PNG';
import Logo_light from '../../../_assets/Logo-light.PNG';
import profile_img from '../../../_assets/1.jpg';
import AssessmentIcon from '@mui/icons-material/Assessment';

import SideBarOption from './Componenta/SideBarOption';

const SideBar = () => {

    const OptionList = [
        {
            text: 'Dashboard',
            icon: AssessmentIcon,
            Items: [
                { IconItem: AssessmentIcon, text: 'null', to: 'null' },
                { IconItem: AssessmentIcon, text: 'null1', to: 'null' },
                { IconItem: AssessmentIcon, text: 'null2', to: 'null' },
                { IconItem: AssessmentIcon, text: 'null3', to: 'null' },
                { IconItem: AssessmentIcon, text: 'null4', to: 'null' },
            ],
        },
        {
            text: 'User Manage',
            icon: AssessmentIcon,
            Items: [
                { IconItem: AssessmentIcon, text: 'null', to: 'null' },
                { IconItem: AssessmentIcon, text: 'null1', to: 'null' },
                { IconItem: AssessmentIcon, text: 'null2', to: 'null' },
                { IconItem: AssessmentIcon, text: 'null3', to: 'null' },
                { IconItem: AssessmentIcon, text: 'null4', to: 'null' },
            ],
        },
    ];

    return (
        <SideBarStyled>
            <SideBarHeadersStyled>
                <img src={Logo_dark} alt='Logo-img' className='Logo-img' />
                <div className='admin-profile'>
                    <img src={profile_img} alt='Profile-img' className='Profile-img' />
                    <p className='profile-name' >Sitthisak  Theparsa</p>
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