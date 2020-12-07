import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import './AccountEdit.css';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import ConfirmRemAcc from '../../components/ConfirmRemAcc';

class AccountEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isOpen: false,
            fname: "Hello",                         // <-- Placeholder data
            lname: "There",                         //
            email: "ab@abc.com",                    //
            emailcheck: "ab@abc.com",               //
            password: "12345678",                   //
            passwordcheck: "12345678",              //
            file: null                              //
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
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

    emailValidation() {
        let value = this.state.email;
        if (value.lastIndexOf("@") < value.lastIndexOf(".")) {
            if (value.lastIndexOf("@") > 0) {
                if (value.lastIndexOf(".") < value.length - 1) {
                    return true;
                }
            }
        }
        else {
            return false;
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        if (this.state.fname.length < 1) {
            alert("Voornaam mag niet leeg zijn!")
        }
        else if (this.state.lname.length <= 1) {
            alert("Achternaam mag niet leeg zijn!")
        }
        else if (this.state.email < 5) {
            alert("Email mag niet leeg zijn!")
        }
        else if (!this.emailValidation()) {
            alert("Emailadres is ongeldig!")
        }
        else if (this.state.email !== this.state.emailcheck) {
            alert("Emailadressen komen niet overeen!")
        }
        else if (this.state.password.length < 8) {
            alert("Wachtwoord moet minimaal 8 karakters lang zijn!")
        }
        else if (this.state.password !== this.state.passwordcheck) {
            alert("Wachtwoorden komen niet overeen!")
        }
        else {
            this.props.history.push('/Account');
        }
    }

    removeHandler = (e) => {
        this.setState({ isOpen: true })
    }

    render() {


        return (
            <div className="AccountEdit">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <header>Account aanpassen</header>

                <Form>

                    <Image src={this.state.file} roundedCircle />

                    <Form.Group controlId="ProfPicInput">
                        <Form.Label>Profielfoto</Form.Label>
                        <Form.File name="file" type="file" id="custom-file-translate-html" label="Voeg je document toe" data-browse="Bestand kiezen" custom onChange={this.handleInputChange} />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="FNameInput">
                                <Form.Label>Voornaam</Form.Label>
                                <Form.Control name="fname" type="FName" value={this.state.fname} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="LNameInput">
                                <Form.Label>Achternaam</Form.Label>
                                <Form.Control name="lname" type="LName" value={this.state.lname} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="EmailInput">
                                <Form.Label>Emailadres</Form.Label>
                                <Form.Control name="email" type="Email" value={this.state.email} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="ConfirmEmailInput">
                                <Form.Label>Bevestig emailadres</Form.Label>
                                <Form.Control name="emailcheck" type="Email" value={this.state.emailcheck} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="PasswordInput">
                                <Form.Label>Wachtwoord</Form.Label>
                                <Form.Control name="password" type="Password" value={this.state.password} placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="ConfirmPasswordInput">
                                <Form.Label>Bevestig wachtwoord</Form.Label>
                                <Form.Control name="passwordcheck" type="Password" value={this.state.passwordcheck} placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" type="submit" onClick={this.onSubmitHandler}>
                        Account aanpassen
                    </Button>



                </Form>
                <Button variant="primary" type="remove" onClick={this.removeHandler}>
                    Account verwijderen
                    </Button>
                <ConfirmRemAcc show={this.state.isOpen}></ConfirmRemAcc>
            </div>

        );
    }
}

export default AccountEdit;