import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image, setImage] = useState(null)

  const onSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password, image));
    }
    }
    if (user) {
      return <Redirect to="/" />;
    }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file)
  };

 return (
    <form className="form-container" onSubmit={onSignUp}>
      <div>
        <label>User Name</label>
        <input
         className="form-input"
         type="text"
         name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          className="form-input"
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          ></input>
      </div>
      <div >
        <label>Image</label>
        <input
          className="form-input file"
          name="image"
          type="file"
          placeholder="Select Image"
          accept="image/*"

          onChange={updateImage}

          ></input>
        </div>
      <div>
        <label>Password</label>
        <input
          className="form-input"
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          className="form-input"
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className="button signup" type="submit">Sign Up</button>
      <img className='standing-robot_signup' src='/robotstanding.png' />
    </form>
  );
};

export default SignUpForm;
