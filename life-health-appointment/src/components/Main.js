import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Style from '../css/Signup.module.css';

const Main = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  if (user.username !== 'Guest') {
    navigate('/doctors')
  }
  return (
    <div className={`${Style.container} ${Style.coverBg}`}>
      <h1 className={Style.setTitle}>BOOK APPOINTMENT WITH A DOCTOR</h1>
      <div className={Style.homeForm}>
        <Link to="/login" className={Style.setLinkBtn}>
          Login
        </Link>
        <Link to="/signup" className={Style.setLinkBtn}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Main;
