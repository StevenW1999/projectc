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
            passwordCheck: '',
            emailCheck: '',
            newUser: {
                username: '',
                password: '',
                email: '',
                postalCode: '',
                profilePicture: null
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            passwordCheck: this.props.location.state.password,
            emailCheck: this.props.location.state.email,
            newUser: {
                username: this.props.location.state.username,
                password: this.props.location.state.password,
                email: this.props.location.state.email,
                postalCode: this.props.location.state.postalCode,
                profilePicture: null
            }
        })
    }

    handleInputChange(e) {
        e.preventDefault();
        let name = e.target.name;
        let val = e.target.value;
        if (name === "profilePicture") {
            this.setState({
                newUser: {
                    [name]: URL.createObjectURL(e.target.files[0])
                }
              })
        }
        else if (name === "emailCheck" || name === "passwordCheck") {
            this.setState({
                  [name]: val
            });
        }
        else {
            this.setState({
                newUser: {
                    [name]: val
                }
            })
        }
    }
    emailValidation() {
        let value = this.state.newUser.email;
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

        if (this.state.newUser.username.length < 9) {
            alert("Gebruikernaam moet minimaal 8 karakters lang zijn!")
        }
        else if (this.state.newUser.postalCode.length != 6 || !parseInt(this.state.newUser.postalCode.substring(0, 4)) || /[^a-zA-Z]/.test(this.state.newUser.postalCode.slice(5, 6))) {
            alert("Postcode is ongeldig")
        }
        else if (this.state.newUser.email < 5) {
            alert("Email mag niet leeg zijn!")
        }
        else if (!this.emailValidation()) {
            alert("Emailadres is ongeldig!")
        }
        else if (this.state.newUser.email !== this.state.emailcheck) {
            alert("Emailadressen komen niet overeen!")
        }
        else if (this.state.newUser.password.length < 8) {
            alert("Wachtwoord moet minimaal 8 karakters lang zijn!")
        }
        else if (this.state.newUser.password !== this.state.passwordcheck) {
            alert("Wachtwoorden komen niet overeen!")
        }
        else {
            fetch('/api/users/' + toString(this.props.location.state.id), {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer' + localStorage.getItem('bearer')
                },
                body: JSON.stringify({
                    "Username": this.state.newUser.username,
                    "Password": this.state.newUser.password,
                    "email": this.state.newUser.email,
                    "postalCode": this.state.newUser.postalCode,
                    "profilepicture": this.state.newUser.profilePicture
                })
            })
                .then(response => {
                    const data = response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        console.log('Error: ', error)
                        return Promise.reject(error);
                    }
                    console.log('Succes!');
                })
        }
    }

    onDeleteHandler = (e) => {
        e.preventDefault();

        fetch('/api/users/' + toString(this.props.location.state.id), {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('bearer')
            }
        })
            .then(response => {
                const data = response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    console.log('Error: ', error)
                    return Promise.reject(error);
                }
                console.log('Succes!')
            })
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    render() {
        console.log(this.state.newUser.username);
        console.log(this.state.isOpen);
        return (
            <div className="AccountEdit">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <header>Account aanpassen</header>

                <Form>
                    <Row>
                        <Col>
                            <Image className="ProfPic" src={this.state.newUser.profilePicture} roundedCircle />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="ProfPicInput">
                                <Form.Label>Profielfoto</Form.Label>
                                <Form.File name="profilePicture" type="profilePicture" id="custom-file-translate-html" label="Voeg je document toe" data-browse="Bestand kiezen" custom onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="PostalCode">
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control name="postalCode" type="PostalCode" defaultValue={this.state.newUser.postalCode} placeholder="" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="UserName">
                        <Form.Label>Gebruikersnaam</Form.Label>
                        <Form.Control name="username" type="username" defaultValue={this.state.newUser.username} placeholder="" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId="EmailInput">
                                <Form.Label>Emailadres</Form.Label>
                                <Form.Control name="email" type="Email" defaultValue={this.state.newUser.email} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="ConfirmEmailInput">
                                <Form.Label>Bevestig emailadres</Form.Label>
                                <Form.Control name="emailCheck" type="emailCheck" defaultValue={this.state.newUser.email} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="PasswordInput">
                                <Form.Label>Wachtwoord</Form.Label>
                                <Form.Control name="password" type="password" defaultValue={this.state.newUser.password} placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="ConfirmPasswordInput">
                                <Form.Label>Bevestig wachtwoord</Form.Label>
                                <Form.Control name="passwordCheck" type="password" defaultValue={this.state.newUser.password} placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
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