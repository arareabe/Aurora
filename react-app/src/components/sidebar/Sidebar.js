import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SidebarSpaces from './SidebarSpaces';
import './Sidebar.css'

function Sidebar() {

  return (
    <div className='sidebarWrapper'>
      <div id='sideCreateSpace'>
        + Create Space
      </div>
      <SidebarSpaces />
    </div>
  )
}

export default Sidebar;
