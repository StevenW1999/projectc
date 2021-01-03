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
            <Link to='/sign-up'>Hoe het werkt</Link>
            <Link to='/About'>Over ons</Link>
            <Link to='/Donatie'>Donatie</Link>
          </div>
          <div className='footer-link-items footerfix'>
            <h2>Neem contact op</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Ondersteuning</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Volg ons</h2>
            <Link to='/'>Instagram</Link>
                      <a href='https://www.facebook.com/stadskwekerijdekas/'>Facebook</a>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <RiPlantFill className='navbar-icon' />
              Stekoverflow
            </Link>
          </div>
          <small className='website-rights'>Stadskwekerij © 2020</small>
          <div className='social-icons'>
            <a
              className='social-icon-link'
                          href='
https://www.facebook.com/stadskwekerijdekas/'
              target='_blank'
              aria-label='Facebook'
            >
              <FaFacebook />
            </a>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <FaInstagram />
            </Link>
            <Link
              className='social-icon-link'
              to={
                '//www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A?view_as=subscriber'
              }
              target='_blank'
              aria-label='Youtube'
            >
              <FaYoutube />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <FaTwitter />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;