import React, { useState, useEffect, Component } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { RiPlantFill } from 'react-icons/ri';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import ukflag from '../images/UK.png'; 
import nlflag from '../images/NL.jpg'; 

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

    const handleLogout = () => {
        fetch('/api/users/logout', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + localStorage.getItem('bearer') }
        }).then(response => { return response.json(); })
            .then(localStorage.removeItem('bearer'))
            .catch(err => {
                console.log("fetch error" + err);
            });
        window.alert('Uitgelogd!')
        window.location.href = "/";
    }

    if (localStorage.getItem('bearer')) {
        localStorage.setItem('isUser', "block");
        localStorage.setItem('isGuest', "none");
    } else {
        localStorage.setItem('isUser', "none");
        localStorage.setItem('isGuest', "block");
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className='navbar'>
                    <div className='navbar-container'>
                        <Link to='/' className='navbar-logo logotext' style={{ textDecoration: 'none' }} onClick={closeMobileMenu}><RiPlantFill className='navbar-icon' />Stekoverflow</Link>
                        <div className='menu-icon' onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                            <li className='nav-item'>
                                <Link to='/' className='nav-links nodecoration' onClick={closeMobileMenu}>
                                    Home
                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/about'
                                    className='nav-links nodecoration'
                                    onClick={closeMobileMenu}
                                >
                                    Over ons
                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/contact'
                                    className='nav-links nodecoration'
                                    onClick={closeMobileMenu}
                                >
                                    Contact
                </Link>
                            </li>
                            <li className='nav-item'>
                                <Link
                                    to='/search'
                                    className='nav-links nodecoration'
                                    onClick={closeMobileMenu}
                                >
                                    Aanbod 
                </Link>
                            </li>
                            <li className='nav-item' style={{ display: localStorage.getItem('isUser') }}>
                                <Link
                                    to='/Create_trade'
                                    className='nav-links nodecoration'
                                    onClick={closeMobileMenu}
                                >
                                    Plant toevoegen
                </Link>
                            </li>
                            <div className="nav-item2" style={{ display: localStorage.getItem('isGuest')}}>
                                <li className='nav-login'>
                                    <Link
                                        to='/login'
                                        className='nav-links nodecoration2'
                                        onClick={closeMobileMenu}
                                    >
                                        Inloggen
                </Link>
                                </li>
                            </div>
                            

                            <li className='nav-item' style={{ display: localStorage.getItem('isUser') }}>
                                <Link
                                    className='nav-links nodecoration'
                                    onClick={closeMobileMenu, handleLogout}
                                >
                                    Uitloggen
            </Link>
                            </li>
                            <li className='nav-item' style={{ display: localStorage.getItem('isUser') }}>
                                <Link
                                    to='/account'
                                    className='nav-links nodecoration'
                                    onClick={closeMobileMenu}
                                >
                                    Mijn profiel
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