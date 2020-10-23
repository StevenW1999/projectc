import React, { Component } from 'react';
import TextInput from '../../components/TextInput';
import { Link } from 'react-router-dom';
import './AccountCreate.css';

class AccountCreate extends Component{
    
    render () {
      return (
        <div className="AccountCreate">
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>  
          <header>Account aanmaken</header>
          <TextInput></TextInput>
        </div>
      );
    }
  }
    
export default AccountCreate;