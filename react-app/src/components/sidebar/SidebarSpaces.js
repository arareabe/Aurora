import React from 'react'
import './SidebarSpaces.css'

function SidebarSpaces({ space }) {
  if (!space) return 'No space here'

  console.log("SPACE CONTINUUUUUUUUUUUUUM", space)

  return (
    <div className='sidebarSpaces'>
      <img className='sideSpaceImg' src={space.imageUrl} />
      <p className='sideSpaceName'>{space.space}</p>
    </div>
  )
}

export default SidebarSpaces;
