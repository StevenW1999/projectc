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
            passwordCheck: this.props.location.data.password,
            emailCheck: this.props.location.data.email,
            newUser: {
                username: this.props.location.data.username,
                password: this.props.location.data.password,
                email: this.props.location.data.email,
                postalCode: this.props.location.data.postalCode,
                profilePicture: this.props.location.data.profilePicture
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    //handleInputChange(event) {
    //    event.preventDefault();
    //    const target = event.target;
    //    const value = target.type === 'checkbox' ? target.checked : target.value;
    //    const name = target.name;

    //    if (target.type === "profilePicture2") {
    //        this.setState({
    //            file: URL.createObjectURL(event.target.files[0])
    //        })
    //    }
    //    else if (target.type === "emailCheck" || target.type === "passwordCheck") {
    //        this.setState({
    //            [name]: value
    //        });
    //    }
    //    else {
    //        this.user.setState({
    //            [name]: value
    //        });
    //    }
    //}

    handleInputChange(e) {
        e.preventDefault();
        let name = e.target.name;
        let val = e.target.value;
        this.setState({
            newUser: {
                [name]: val
            }
        })
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
            fetch('/api/users/' + toString(this.props.user.id), {
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
            //.catch(error => { console.error('error: ', error) })
        }
    }

    onDeleteHandler = (e) => {
        e.preventDefault();

        fetch('/api/users/' + toString(this.props.user.id), {
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
            //.catch(error => { console.error('error: ', error) })
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    //componentDidMount() {
    //    let data = this.props.location.state.username;
    //    console.log(data);
    //}
    render() {
        console.log(this.state.newUser.username)
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
                                <Form.Control name="postalCode" type="PostalCode" defaultValue={this.props.location.state.postalCode} placeholder="" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="UserName">
                        <Form.Label>Gebruikersnaam</Form.Label>
                        <Form.Control name="username" type="Username" defaultValue={this.props.location.state.username} placeholder="" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId="EmailInput">
                                <Form.Label>Emailadres</Form.Label>
                                <Form.Control name="email" type="Email" defaultValue={this.props.location.state.email} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="ConfirmEmailInput">
                                <Form.Label>Bevestig emailadres</Form.Label>
                                <Form.Control name="emailcheck" type="emailCheck" defaultValue={this.props.location.state.email} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="PasswordInput">
                                <Form.Label>Wachtwoord</Form.Label>
                                <Form.Control name="password" type="Password" defaultValue={this.props.location.state.password} placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="ConfirmPasswordInput">
                                <Form.Label>Bevestig wachtwoord</Form.Label>
                                <Form.Control name="passwordcheck" type="passwordCheck" defaultValue={this.props.location.state.password} placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
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