import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import {useDispatch} from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
      const user = await dispatch(login(email, password));
      if (!user.errors) {
        return <Redirect to="/" />;
      } else {
        setErrors(user.errors);
      }
    }


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const demo = (e) => {
    setPassword('password')
    setEmail('demo@aa.io')
  }

  return (
    <form className="form-container" onSubmit={onLogin}>
        <img className='robot_laying' src='/robotlaying.png' />
        {errors.map((error) => (
          <div className='error'>{error}</div>
        ))}

      <div className='login-box'>

        <label htmlFor="email">Email</label>
        <input
          className="form-input"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
          />
        <button className="button" type="submit">Login</button>
        <button className="demo button"  onClick={demo} type="submit">Demo Login</button>
          </div>
    </form>
  );
};

export default LoginForm;
