import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook, FaTwitter, FaGooglePlusG, FaVimeoV, FaPinterestP,
} from 'react-icons/fa';
import logo from '../images/logo.png';
import Style from '../css/SideNav.module.css';

const BookNav = () => (
  <div className={Style.navBox}>
    <div className={Style.setLogo}>
      <img src={logo} alt="Logo" className={Style.img} />
    </div>
    <div className={Style.setLink}>
      <Link to="/doctor" className={Style.setNav}>Home</Link>
    </div>
    <div className={Style.socialHome}>

      <a href="#" className={Style.setSocial}>
        <FaTwitter />
      </a>
      <a href="#" className={Style.setSocial}>
        <FaFacebook />
      </a>
      <a href="#" className={Style.setSocial}>
        <FaGooglePlusG />
      </a>
      <a href="#" className={Style.setSocial}>
        <FaVimeoV />
      </a>
      <a href="#" className={Style.setSocial}>
        <FaPinterestP />
      </a>
    </div>
  </div>
);

export default BookNav;
