import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginModal from '../components/Modals/loginform'
import SignupModal from '../components/Modals/signup'
import {useSelector} from 'react-redux'

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className='home navlink'>
          <NavLink className='navlink' to="/" exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li className='info navlink'>
          <NavLink className='navlink' to="/info" exact={true} activeClassName='active'>
            Interview Guide
          </NavLink>
        </li>


       {user && <li className='interview navlink'>

          <NavLink className='navlink' to="/interview" exact={true} activeClassName='active'>
           Start an Interview
          </NavLink>

        </li>}
       {user && <li className='feedback navlink'>
          <NavLink className='navlink' to="/feedback" exact={true} activeClassName='active'>
           View Feedback
          </NavLink>
        </li>}
        <div className='user-buttons'>
        { !user && <li className='login navlink'>
          <LoginModal />
          </li>}
        {!user && <li className='signup navlink'>
         <SignupModal />
        </li>}
        { user &&
          <li className='logout navlink'>
          <LogoutButton />
        </li>
        }
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
