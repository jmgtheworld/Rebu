import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as VscIcons from 'react-icons/vsc';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'History',
    path: '/history',
    icon: <FaIcons.FaHistory/>
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <AiIcons.AiFillSetting/>
  },
  {
    title: 'Ride',
    path: '/',
    icon: <VscIcons.VscPerson />
  },
  {
    title: 'Drive',
    path: '/',
    icon: <AiIcons.AiFillCar />
  },
  {
    title: 'Support',
    path: '/support',
    icon: <BsFillQuestionCircleFill />
  },
]

export default SidebarData;