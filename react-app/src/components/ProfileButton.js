import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../store/session';
import './ProfileButton.css';

function ProfileButton({ user, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className='userButton' onClick={openMenu}>
        <i className="fa-solid fa-user" />
      </button>
      {showMenu &&
        (<ul className="profile-dropdown">
          <div>{user.username}</div>
          <div>@ {user.email}</div>
          <div>
            <button className='profileButtons' onClick={logout}>Log Out</button>
          </div>
        </ul>)
      }
    </>
  );
}

export default ProfileButton;
