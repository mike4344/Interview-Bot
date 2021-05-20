import React from "react";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom'
const LogoutButton = () => {
  let history = useHistory()
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <button className='button' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
