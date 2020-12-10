import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import './AccountEdit.css';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

class AccountEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isOpen: false,
            username: "HelloThere",                         // <-- Placeholder data
            pcode: "1234AB",                        //
            email: "ab@abc.com",                    //
            emailcheck: "ab@abc.com",               //
            password: "12345678",                   //
            passwordcheck: "12345678",              //
            file: null,                             //
            token: null,
            isAuthenticated: null
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

        if (this.state.username.length < 9) {
            alert("Gebruikernaam moet minimaal 8 karakters lang zijn!")
        }
        else if (this.state.pcode.length != 6 || !parseInt(this.state.pcode.substring(0, 4)) || /[^a-zA-Z]/.test(this.state.pcode.slice(5, 6))) {
            alert("Postcode is ongeldig")
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
            fetch('/api/users/{id}', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer' + ''
                },
                body: JSON.stringify({
                    "Username": this.state.username,
                    "Password": this.state.password,
                    "email": this.state.email,
                    "postalcode": this.state.pcode,
                    "profilepicture": null,
                    "active": true
                })
            })
                .then(response => {
                    const data = response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        console.log('Error: ', error)
                        return Promise.reject(error);
                    }
                    this.setState({
                        token: data.accessToken,
                        isAuthenticated: true
                    })
                    console.log('Succes!');
                    < Link to="/Account" className="Lnk" ></Link >
                })
            //.catch(error => { console.error('error: ', error) })
        }
    }

    onDeleteHandler = (e) => {
        e.preventDefault();

        fetch('/api/users/{id}', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer' + ''
            },
            body: JSON.stringify({                      // <-- is dit nodig?
                "Username": this.state.username,        //
                "Password": this.state.password,        //
                "email": this.state.email,              //
                "postalcode": this.state.pcode,         //
                "profilepicture": null,                 //
                "active": true                          //
            })
        })
            .then(response => {
                const data = response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    console.log('Error: ', error)
                    return Promise.reject(error);
                }
                this.setState({
                    token: data.accessToken,
                    isAuthenticated: true
                })
                console.log('Succes!')
            })
            //.catch(error => { console.error('error: ', error) })
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    render() {


        return (
            <div className="AccountEdit">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <header>Account aanpassen</header>

                <Form>

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
                                <Form.Control name="pcode" type="PCode" value={this.state.pcode} placeholder="" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="UserName">
                        <Form.Label>Gebruikersnaam</Form.Label>
                        <Form.Control name="username" type="Username" value={this.state.username} placeholder="" onChange={this.handleInputChange} />
                    </Form.Group>

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

                <Button variant="primary" type="remove" onClick={this.openModal}>
                    Account verwijderen
                    </Button>

                <Modal show={this.state.isOpen} backdrop="static" keyboard={false}>
                    <Modal.Header>
                        <Modal.Title>Account verwijderen</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        Weet u zeker dat u dit account wilt verwijderen? Dit kan niet ongedaan gemaakt worden!
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Sluiten
                        </Button>

                        <Button variant="primary" onClick={this.onDeleteHandler}>
                            Verwijder mijn account
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

export default AccountEdit;