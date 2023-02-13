import React from 'react'
import history from '../../images/history.png'
import './SidebarSpaces.css'

function SidebarSpaces({ space }) {
  if (!space) return 'No space here'

  console.log("SPACE CONTINUUUUUUUUUUUUUM", space)

  return (
    <div className='sidebarSpaces'>
      <div className='sidebarSpace'>
        <img src={space.imageUrl} />
        <p>{space.space}</p>
      </div>
    </div>
  )
}

export default SidebarSpaces;
