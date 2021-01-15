import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import './AccountEdit.css';
import { Form, Button, Row, Col, Modal, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

class AccountEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isOpen: false,
            userCheck: {
                password: '',
                email: ''
            },
            user: {
                id: 0,
                username: '',
                password: '',
                email: '',
                postalCode: '',
                profilePicture: null,
                active: false
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        fetch('/api/users/current', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
            }
        })
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({ "user": data, "userCheck": data });
            })
            .catch(err => {
                console.log("fetch error" + err);
            });           
    }

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.setState({
            user: {
                ...this.state.user,
                file: btoa(binaryString)
            } 
        })
    }

    handleImage = (e) => {
        e.preventDefault();

        let pic = e.target.files[0];
        let reader = new FileReader();

        if (e.target.files.length === 0) {
            return;
        }

        reader.onloadend = (e) => {
            let binaryString = e.target.result;
            this.setState({
                user: {
                    ...this.state.user,
                    profilePicture: btoa(binaryString)
                }
            });
        }

        reader.readAsBinaryString(pic)
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === "emailCheck") {
            this.setState({
                userCheck: {
                    ...this.state.userCheck,
                    email: value
                }
            })
        }
        else if (name === "passwordCheck") {
            this.setState({
                userCheck: {
                    ...this.state.userCheck,
                    password: value
                }
            })
        }
        else {
            this.setState({
                user: {
                    ...this.state.user,
                    [name]: value
                }
            })
        }

    }

    emailValidation() {
        let value = this.state.user.email;
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

        if (this.state.user.username.length < 6) {
            alert("Gebruikernaam moet minimaal 5 karakters lang zijn!")
        }
        else if (this.state.user.postalCode.length != 6 || !parseInt(this.state.user.postalCode.substring(0, 4)) || /[^a-zA-Z]/.test(this.state.user.postalCode.slice(5, 6))) {
            alert("Postcode is ongeldig")
        }
        else if (this.state.user.email < 5) {
            alert("Email mag niet leeg zijn!")
        }
        else if (!this.emailValidation()) {
            alert("Emailadres is ongeldig!")
        }
        else if (this.state.user.email !== this.state.userCheck.email) {
            alert("Emailadressen komen niet overeen!")
        }
        else if (this.state.user.password.length < 8) {
            alert("Wachtwoord moet minimaal 8 karakters lang zijn!")
        }
        else if (this.state.user.password !== this.state.userCheck.password) {
            alert("Wachtwoorden komen niet overeen!")
        }
        else {
            fetch('/api/users/' + this.state.user.id, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
                },
                body: JSON.stringify({
                    'id': this.state.user.id,
                    'username': this.state.user.username,
                    'password': this.state.user.password,
                    'email': this.state.user.email,
                    'postalcode': this.state.user.postalCode,
                    'profilepicture': this.state.user.profilePicture,
                    'active': true
                })
            })
                //.then(this.props.history.push('/'))
                .then(response => {
                    const data = response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        console.log('Error: ', error)
                        return Promise.reject(error);
                    }
                    console.log('Succes!');
                })
            alert('Account aangepast');
            //this.props.history.push('/');
            //.catch(error => { console.error('error: ', error) })
            window.location.href = "/";
        }
    }

    onDeleteHandler = (e) => {
        e.preventDefault();

        fetch('/api/users/' + this.props.location.state.id.toString(), {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
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
                            <Image className="ProfPic" src={"data:file/png;base64," + this.state.user.profilePicture} roundedCircle />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="ProfPicInput">
                                <Form.Label>Profielfoto</Form.Label>
                                <Form.File name="file" type="file" id="custom-file-translate-html" accept=".jpeg, .jpg, .png" label="Voeg je document toe" data-browse="Bestand kiezen" custom onChange={this.handleImage} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="PostalCode">
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control name="postalCode" type="PostalCode" defaultValue={this.state.user.postalCode} placeholder="" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="UserName">
                        <Form.Label>Gebruikersnaam</Form.Label>
                        <Form.Control name="username" type="username" defaultValue={this.state.user.username} placeholder="" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId="EmailInput">
                                <Form.Label>Emailadres</Form.Label>
                                <Form.Control name="email" type="Email" defaultValue={this.state.user.email} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="ConfirmEmailInput">
                                <Form.Label>Bevestig emailadres</Form.Label>
                                <Form.Control name="emailCheck" type="emailCheck" defaultValue={this.state.userCheck.email} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group controlId="PasswordInput">
                                <Form.Label>Wachtwoord</Form.Label>
                                <Form.Control name="password" type="password" defaultValue={this.state.user.password} placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="ConfirmPasswordInput">
                                <Form.Label>Bevestig wachtwoord</Form.Label>
                                <Form.Control name="passwordCheck" type="password" defaultValue={this.state.userCheck.password} placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    
                </Form>

                <Container>
                    <Button variant="primary" type="submit" style={{ margin: 10}} onClick={this.onSubmitHandler}>
                        Account aanpassen
                    </Button>

                    <Button variant="primary" type="remove" style={{ margin: 10 }} onClick={this.openModal}>
                        Account verwijderen
                    </Button>
                </Container>
                

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