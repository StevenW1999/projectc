import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { RiPlantFill } from 'react-icons/ri';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import ukflag from '../images/UK.png'; 

function Navigation() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
  }, []);


  return (
    <>
          <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <RiPlantFill className='navbar-icon' />
              Stekoverflow
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
                      <ul className={click ? 'nav-menu active' : 'nav-menu'}>

              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/about'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  About us
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/allplants'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  All Plants
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/login'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
                          <li className='nav-item'>
                              <Link
                                  to='/about'
                                  className='nav-links'
                                  onClick={closeMobileMenu}
                              > 
                                  <img src={ukflag} style={{ width: "50px", height: "30px" }} />
                                </Link>
                              </li>

            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navigation;