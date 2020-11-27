import React, { Component } from 'react';
import "./Account.css";

class Account extends Component{
render () {
  return (
    <div>  
        <header>Mijn account</header>
        <h1>Falco Zandboer</h1>
        <img src="" alt="Profile Picture"></img>
        <h6>Email:</h6>
        <p>f.zandboer@gmail.com</p>
    </div>
    );
}
}

export default Account;