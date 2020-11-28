import React, { Component } from 'react';
import "./Account.css";
import { Form, Button, Row, Col } from 'react-bootstrap';

class Account extends Component{
  constructor(props) {
    super(props);
    this.state = {
        redirect: false,
        email: "ab@abcd.com",     // <-- Alleen nog maar templates.
        fname: "Hello",           //
        lname: "there"            //
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

  onEdit(event) {
    this.props.history.push('/AccountEdit')
  }

  render () {
    return (
      <div className="Account">  
          
          <Form>
            <header>Mijn account</header>
            <h1>Naam:</h1>      
            <h4>{this.state.fname} {this.state.lname}</h4>
            <br></br>

            <br></br>
            <h1>Email:</h1>
            <h4>{this.state.email}</h4>

          
            <Button className="float-right" variant="primary" type="submit" onClick={this.onEdit()}> {/*onClick={this.props.history.push('/AccountEdit')} */}
              Account aanpassen
            </Button>
          </Form>
      </div>
    );
  }
}

export default Account;