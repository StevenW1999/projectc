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
            username: '',
            password: '',
            email: '',
            postalCode: '',
            file: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            passwordCheck: this.props.location.state.password,
            emailCheck: this.props.location.state.email,
            username: this.props.location.state.username,
            password: this.props.location.state.password,
            email: this.props.location.state.email,
            postalCode: this.props.location.state.postalCode,
            file: this.props.location.state.profilePicture
        })
    }

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.setState({
            file: btoa(binaryString)
        })
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (target.type === "file") {
            let pic = target.files[0];

            if (pic) {
                const reader = new FileReader();

                reader.onload = this._handleReaderLoaded.bind(this)

                reader.readAsBinaryString(pic)
            }
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

        if (this.state.username.length < 6) {
            alert("Gebruikernaam moet minimaal 5 karakters lang zijn!")
        }
        else if (this.state.postalCode.length != 6 || !parseInt(this.state.postalCode.substring(0, 4)) || /[^a-zA-Z]/.test(this.state.postalCode.slice(5, 6))) {
            alert("Postcode is ongeldig")
        }
        else if (this.state.email < 5) {
            alert("Email mag niet leeg zijn!")
        }
        else if (!this.emailValidation()) {
            alert("Emailadres is ongeldig!")
        }
        else if (this.state.email !== this.state.emailCheck) {
            alert("Emailadressen komen niet overeen!")
        }
        else if (this.state.password.length < 8) {
            alert("Wachtwoord moet minimaal 8 karakters lang zijn!")
        }
        else if (this.state.password !== this.state.passwordCheck) {
            alert("Wachtwoorden komen niet overeen!")
        }
        else {
            fetch('/api/users/' + this.props.location.state.id.toString(), {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + localStorage.getItem('bearer')
                },
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password,
                    'email': this.state.email,
                    'postalcode': this.state.postalCode,
                    'profilepicture': this.state.file,
                    'active': true
                })
            })
                .then(this.props.history.push('/'))
            //    .then(response => {
            //        const data = response.json();
            //        if (!response.ok) {
            //            const error = (data && data.message) || response.status;
            //            console.log('Error: ', error)
            //            return Promise.reject(error);
            //        }
            //        console.log('Succes!');
            //    })
           
        }
    }

    onDeleteHandler = (e) => {
        e.preventDefault();

        fetch('/api/users/' + this.props.location.state.id.toString(), {
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
                this.props.history.push('/');
            })
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
                            <Image className="ProfPic" src={"data:file/png;base64," + this.state.file} roundedCircle />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="ProfPicInput">
                                <Form.Label>Profielfoto</Form.Label>
                                <Form.File name="file" type="file" id="custom-file-translate-html" accept=".jpeg, .jpg, .png" label="Voeg je document toe" data-browse="Bestand kiezen" custom onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="PostalCode">
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control name="postalCode" type="PostalCode" defaultValue={this.state.postalCode} placeholder="" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="UserName">
                        <Form.Label>Gebruikersnaam</Form.Label>
                        <Form.Control name="username" type="username" defaultValue={this.state.username} placeholder="" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId="EmailInput">
                                <Form.Label>Emailadres</Form.Label>
                                <Form.Control name="email" type="Email" defaultValue={this.state.email} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="ConfirmEmailInput">
                                <Form.Label>Bevestig emailadres</Form.Label>
                                <Form.Control name="emailCheck" type="emailCheck" defaultValue={this.state.emailCheck} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="PasswordInput">
                                <Form.Label>Wachtwoord</Form.Label>
                                <Form.Control name="password" type="password" defaultValue={this.state.password} placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="ConfirmPasswordInput">
                                <Form.Label>Bevestig wachtwoord</Form.Label>
                                <Form.Control name="passwordCheck" type="password" defaultValue={this.state.passwordCheck} placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
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