import React from 'react';
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
