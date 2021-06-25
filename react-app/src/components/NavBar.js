import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginModal from '../components/Modals/loginform'
import SignupModal from '../components/Modals/signup'
import {useSelector} from 'react-redux'
import { login } from "../store/session";
import {useDispatch} from 'react-redux'
import { useMediaQuery } from 'react-responsive'


const NavBar = () => {

  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 })
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 })
  const isPortrait = useMediaQuery({ orientation: 'portrait' })
  const isRetina = useMediaQuery({ minResolution: '2dppx' })


  let dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  let demoHandler = () => {
    dispatch(login('demo@aa.io', 'password'))
  }

  return (
    <nav className="navbar">
      {<ul className="navbar-list">
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
        <li className='info navlink'>
          <NavLink className='navlink' to="/about" exact={true} activeClassName='active'>
            About The Developer
          </NavLink>
        </li>


       {user && <li className='interview navlink'>

          <NavLink className='navlink' to="/interview" exact={true} activeClassName='active'>
           Start an Interview
          </NavLink>
        </li>}

       {user && <li className='interview navlink'>
       <NavLink className='navlink' to="/liveinterview" exact={true} activeClassName='active'>
           Live Interview
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
        {!user && <li className='signup navlink'>
         <button className='button' onClick={demoHandler}>Demo</button>
        </li>}
        { user &&
          <li className='logout navlink'>
          <LogoutButton />
        </li>
        }
        </div>
      </ul>}
    </nav>
  );
}

export default NavBar;
