import React, { useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import aurora from '../images/aurora.png';
import home from '../images/home.PNG';
import following from '../images/following.PNG';
import pen from '../images/pen.PNG';
import spaces from '../images/spaces.PNG';
import notifications from '../images/notifications.PNG';
import search from '../images/search.png';
import { Modal } from '../context/Modal'
import './NavBar.css'
import CreateQuestion from './createquestion/CreateQuestion';

const NavBar = () => {
  const dispatch = useDispatch;

  const [showPostQueModal, setShowPostQueModal] = useState(false)

  const showPost = e => {
    e.preventDefault()
    setShowPostQueModal(true)
  }

  return (
    <div className='navBarWrapper'>
      <NavLink exact to='/' className='navBarAurora'>
        <img src={aurora} />
      </NavLink>
      <div className='navBarIcons'>
        <div className='navBarIcon'>
          <img src={home} />
        </div>
        <div className='navBarIcon'>
          <img src={following} />
        </div>
        <div className='navBarIcon'>
          <img src={pen} />
        </div>
        <div className='navBarIcon'>
          <img src={spaces} />
        </div>
        <div className='navBarIcon'>
          <img src={notifications} />
        </div>
      </div>
      <div className='navBarSearchWrapper'>
        <div>
          <img id='navBarSearch' src={search} />
        </div>
        <input type='text' placeholder='Search Aurora' />
      </div>
      <div className='navModal'>
        <div>
          <i class="fa-solid fa-user-tie"></i>
        </div>
      </div>
      <div>
        <button className='navAddButton' onClick={showPost}>
          Add question
        </button>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
      {showPostQueModal &&
        <Modal onClose={() => setShowPostQueModal(false)}>
          <CreateQuestion setShowPostQueModal={setShowPostQueModal} />
        </Modal>}
    </div>
  );
}

export default NavBar;
