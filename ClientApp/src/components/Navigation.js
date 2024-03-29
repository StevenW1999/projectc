import React, { useState, useEffect, Component } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navigation.css';
import { RiPlantFill } from 'react-icons/ri';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import ukflag from '../images/UK.png'; 
import nlflag from '../images/NL.jpg';

//window.addEventListener("beforeunload", (ev) => {
//    window.sessionStorage.removeItem('bearer');
//});

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
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem('bearer') }
        }).then(response => { return response.json(); })
            .then(sessionStorage.removeItem('bearer'), sessionStorage.removeItem('role'))
            .catch(err => {
                console.log("fetch error" + err);
            });
        window.alert('Uitgelogd!')
        window.location.href = "/";
    }

    const handleAdminLogout = () => {
        fetch('/api/admins/cms-logout', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem('bearer') }
        }).then(response => { return response.json(); })
            .then(sessionStorage.removeItem('bearer'), sessionStorage.removeItem('role'))
            .catch(err => {
                console.log("fetch error" + err);
            });
        window.alert('Uitgelogd!')
        window.location.href = "/";
    }

    if (sessionStorage.getItem('role') == 'User') {
        sessionStorage.setItem('isUser', "inline-block");
        sessionStorage.setItem('isAdmin', "none");
        sessionStorage.setItem('isGuest', "none");
    }
    else if (sessionStorage.getItem('role') == 'Admin') {
        sessionStorage.setItem('isAdmin', "inline-block");
        sessionStorage.setItem('isUser', "none");
        sessionStorage.setItem('isGuest', "none");
    }
    else {
        sessionStorage.setItem('isAdmin', "none");
        sessionStorage.setItem('isUser', "none");
        sessionStorage.setItem('isGuest', "inline-block");
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <nav className='navbar'>
                    <div className='navbar-container'>
                        <Link to='/' className='navbar-logo logotext' style={{ textDecoration: 'none' }} onClick={closeMobileMenu}><RiPlantFill className='navbar-icon' />Stekhub</Link>
                        <div className='menu-icon' onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </div>
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                            <li className='nav-item2'>
                                <Link to='/' className='nav-links nodecoration2' onClick={closeMobileMenu}>
                                    Home
                </Link>
                            </li>
                            <li className='nav-item2'>
                                <Link
                                    to='/about'
                                    className='nav-links nodecoration2'
                                    onClick={closeMobileMenu}
                                >
                                    Over ons
                </Link>
                            </li>
                            <li className='nav-item2'>
                                <Link
                                    to='/contact'
                                    className='nav-links nodecoration2'
                                    onClick={closeMobileMenu}
                                >
                                    Contact
                </Link>
                            </li>
                            <li className='nav-item2' style={{ display: sessionStorage.getItem('isUser') }}>
                                <Link
                                    to='/search'
                                    className='nav-links nodecoration2'
                                    onClick={closeMobileMenu}
                                >
                                    Aanbod
                </Link>
                            </li>
                            <li className='nav-item2' style={{ display: sessionStorage.getItem('isGuest') }}>
                                <Link
                                    to='/search'
                                    className='nav-links nodecoration2'
                                    onClick={closeMobileMenu}
                                >
                                    Aanbod
                </Link>
                            </li>
                            <li className='nav-item2' style={{ display: sessionStorage.getItem('isAdmin') }}>
                                <Link
                                    to='/adminpanel'
                                    className='nav-links nodecoration2'
                                    onClick={closeMobileMenu}
                                >
                                    Gebruikerspaneel
                </Link>
                            </li>
                            <li className='nav-item2' style={{ display: sessionStorage.getItem('isAdmin') }}>
                                <Link
                                    to='/search'
                                    className='nav-links nodecoration2'
                                    onClick={closeMobileMenu}
                                >
                                    Plantenpaneel
                </Link>
                            </li>
                            <li className='nav-item2' style={{ display: sessionStorage.getItem('isUser') }}>
                                <Link
                                    to='/Create_trade'
                                    className='nav-links nodecoration2'
                                    onClick={closeMobileMenu}
                                >
                                    Plant toevoegen
                </Link>
                            </li>
                            <div className="nav-item2" style={{ display: sessionStorage.getItem('isGuest')}}>
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
                            

                            <li className='nav-item2' style={{ display: sessionStorage.getItem('isUser') }}>
                                <Link
                                    className='nav-links nodecoration2'
                                    onClick={closeMobileMenu, handleLogout}
                                >
                                    Uitloggen
            </Link>
                            </li>
                            <li className='nav-item2' style={{ display: sessionStorage.getItem('isAdmin') }}>
                                <Link
                                    className='nav-links nodecoration2'
                                    onClick={closeMobileMenu, handleAdminLogout}
                                >
                                    Uitloggen
            </Link>
                            </li>
                            <li className='nav-item2' style={{ display: sessionStorage.getItem('isUser') }}>
                                <Link
                                    to='/account'
                                    className='nav-links nodecoration2'
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