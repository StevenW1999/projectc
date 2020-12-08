import React, { Component } from 'react';
import "./Account.css";
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';

class Account extends Component{
  constructor(props) {
    super(props);
    this.state = {
        redirect: false,
        email: "ab@abcd.com",           // <-- Alleen nog maar templates.
        username: "HelloThere",         //
        pcode: "1234AB"
    }
  }
  
  onCreate(event) {
    event.preventDefault();         //<-- Dit gaat de state aanpassen met de data van de backend.
    const target = event.target;    //
    const value = target.value;     //
    const name = target.name;       //
    
    this.setState({
      [name]: value    
    });
  }

  render () {
    return (
      <div className="Account">  
          
          <Form>
            <header>Mijn account</header>
            <h1>Naam:</h1>      
            <h4>{this.state.username}</h4>
            <br></br>

            <br></br>
            <h1>Email:</h1>
            <h4>{this.state.email}</h4>

            <br></br>
            <h1>Postcode:</h1>
            <h4>{this.state.pcode}</h4>

            <Button variant="primary" type="submit">
              <Link to="/" className="Lnk">
                Uitloggen
              </Link>
            </Button>
          
            <Button className="float-right" variant="primary" type="submit">
              <Link to="/AccountEdit" className="Lnk">
                Account Aanpassen
              </Link>
            </Button>
          </Form>
      </div>
    );
  }
}

export default Account;