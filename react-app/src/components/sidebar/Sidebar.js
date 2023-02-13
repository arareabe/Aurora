import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SidebarSpaces from './SidebarSpaces';
import './Sidebar.css'

import { getAllSpaces } from '../../store/spaces';

function Sidebar() {
  const dispatch = useDispatch();

  const allSpaces = useSelector((state) => Object.values(state.spaces.allSpaces))

  useEffect(() => {
    dispatch(getAllSpaces())
  }, [dispatch])

  if (!allSpaces) return null;

  return (
    <div className='sidebarWrapper'>
      {Object.values(allSpaces).map(space => {
        return <NavLink to={`/${space.space}/${space.id}`} key={space.id} className={'spaceWrapper'}>
          <SidebarSpaces space={space} />

        </NavLink>
      })}
    </div>
  )
}

export default Sidebar;
