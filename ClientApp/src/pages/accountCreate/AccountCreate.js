import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AccountCreate.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

class AccountCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            fname: "",
            lname: "",
            email: "",
            emailcheck: "",
            password: "",
            passwordcheck: "",
            checkbox: false,
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
          [name]: value    
        });
    }

    emailValidation(){
        let value = this.state.email;
        if(value.lastIndexOf("@")<value.lastIndexOf(".")){
            if(value.lastIndexOf("@")>0){
                if(value.lastIndexOf(".")<value.length-1){
                    return true;
                }
            }
        }
        else{
            return false;
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        if(this.state.fname.length<1){
            alert("Voornaam mag niet leeg zijn!")
        }
        else if (this.state.lname.length<=1) {
            alert("Achternaam mag niet leeg zijn!")
        }
        else if (this.state.email<5) {
            alert("Email mag niet leeg zijn!")
        }
        else if (!this.emailValidation()) {
            alert("Emailadres is ongeldig!")
        }
        else if (this.state.email!==this.state.emailcheck) {
            alert("Emailadressen komen niet overeen!")
        }
        else if (this.state.password.length<8) {
            alert("Wachtwoord moet minimaal 8 karakters lang zijn!")
        }
        else if (this.state.password!==this.state.passwordcheck) {
            alert("Wachtwoorden komen niet overeen!")
        }
        else if (!this.state.checkbox) {
            alert("U dient de algemene voorwaarden te accepteren!")
        }
        else{
            this.props.history.push('/Account');
        }
    }

    render() {
        return (
            <div className="AccountCreate">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <header>Account aanmaken</header>

                <Form onSubmit={this.onSubmitHandler}>
                    <Row>
                        <Col>
                            <Form.Group controlId="FNameInput">
                                <Form.Label>Voornaam</Form.Label>
                                <Form.Control name="fname" type="FName" placeholder="" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="LNameInput">
                                <Form.Label>Achternaam</Form.Label>
                                <Form.Control name="lname" type="LName" placeholder="" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="EmailInput">
                                <Form.Label>Emailadres</Form.Label>
                                <Form.Control name="email" type="Email" placeholder="" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="ConfirmEmailInput">
                                <Form.Label>Bevestig emailadres</Form.Label>
                                <Form.Control name="emailcheck" type="Email" placeholder="" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="PasswordInput">
                                <Form.Label>Wachtwoord</Form.Label>
                                <Form.Control name="password" type="Password" placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="ConfirmPasswordInput">
                                <Form.Label>Bevestig wachtwoord</Form.Label>
                                <Form.Control name="passwordcheck" type="Password" placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="Checkbox">
                        <Form.Check name="checkbox" type="checkbox" label="Ik heb de algemene voorwaarden gelezen en ga hiermee akkoord." onChange={this.handleInputChange} />
                    </Form.Group>

                    
                    <Button variant="primary" type="submit" onClick={this.onSubmitHandler}>
                        Account aanmaken
                    </Button>                       
                </Form>
            </div>

        );
    }
}

export default AccountCreate;