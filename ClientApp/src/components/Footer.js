import React from 'react';
import './Footer.css';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin
} from 'react-icons/fa';
import { RiPlantFill } from 'react-icons/ri';

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Algemeen</h2>
            <Link to='/About'>Over ons</Link>
            <Link to='/Donate'>Donatie</Link>
            <Link to='/Voorwaarden'>Algemene Voorwaarden</Link>
            <Link to='/adminlogin'>Administrator log-in</Link>
          </div>
          <div className='footer-link-items footerfix'>
            <h2>Neem contact op</h2>
            <Link to='/contact'>Contact</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Volg ons</h2>
            <a href='https://www.facebook.com/stadskwekerijdekas/'>Facebook</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;