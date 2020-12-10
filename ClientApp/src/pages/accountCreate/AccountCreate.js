import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AccountCreate.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { post } from 'jquery';

class AccountCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            username: "",
            pcode: "",
            email: "",
            emailcheck: "",
            password: "",
            passwordcheck: "",
            checkbox: false,
            file: null
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        if (target.type === "file") {
            this.setState({
                file: URL.createObjectURL(event.target.files[0])
            })
        }
        else {
            this.setState({
                [name]: value
            });
        }
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

        if(this.state.username.length < 6){
            alert("Gebruikersnaam moet minimaal 5 karakters lang zijn!")
        }
        else if (this.state.pcode.length != 6 || !parseInt(this.state.pcode.substring(0, 4)) || /[^a-zA-Z]/.test(this.state.pcode.slice(5, 6))) {
            alert("Postcode is ongeldig")
        }
        else if (this.state.email.length<5) {
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
            fetch('/api/users', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password,
                    'email': this.state.email,
                    'postalcode': this.state.pcode,
                    'profilepicture': null,
                    'active': true
                })
            })
                .then(response => {
                    const data = response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        console.log('error: ', error)
                        return Promise.reject(error);
                    }
                    console.log('User aangemaakt!');
                    this.props.history.push('/Login');
                })
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
                            <Image className="ProfPic" src={this.state.file} roundedCircle />
                        </Col>  
                    </Row>
                    
                    <Row>
                        <Col>
                            <Form.Group controlId="ProfPicInput">
                                <Form.Label>Profielfoto</Form.Label>
                                <Form.File name="file" type="file" id="custom-file-translate-html" label="Voeg je document toe" data-browse="Bestand kiezen" custom onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="PostalCode">
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control name="pcode" type="PCode" placeholder="" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    

                    <Form.Group controlId="UsernameInput">
                        <Form.Label>Gebruikersnaam</Form.Label>
                        <Form.Control name="username" type="Username" placeholder="" onChange={this.handleInputChange} />
                    </Form.Group>

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