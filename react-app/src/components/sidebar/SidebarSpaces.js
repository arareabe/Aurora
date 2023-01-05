import React from 'react'
import history from '../../images/history.png'
import './SidebarSpaces.css'

function SidebarSpaces() {

  return (
    <div className='sidebarSpaces'>
      <div className='sidebarSpace'>
        <img src={history} />
        <p>History</p>
      </div>
      <div className='sidebarSpace'>
        <img src={history} />
        <p>History</p>
      </div>
      <div className='sidebarSpace'>
        <img src={history} />
        <p>History</p>
      </div>
      <div className='sidebarSpace'>
        <img src={history} />
        <p>History</p>
      </div>
    </div>
  )
}

export default SidebarSpaces;
