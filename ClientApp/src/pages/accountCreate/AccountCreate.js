import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AccountCreate.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import defPic from '../../images/Default-User.jpg';

const fileTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png"
];

function validFileType(file) {
    return fileTypes.includes(file.type);
}

class AccountCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            username: "",
            postalCode: "",
            email: "",
            emailCheck: "",
            password: "",
            passwordCheck: "",
            checkbox: false,
            file: null
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.setState({
            file: btoa(binaryString)
        })
    }

    handleInputChange(event) {
        event.stopPropagation()
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        if (target.type === "file") {
            let pic = target.files[0];

            if (pic) {
                if (validFileType(pic)) {
                    const reader = new FileReader();

                    reader.onload = this._handleReaderLoaded.bind(this)

                    reader.readAsBinaryString(pic)
                }
                else {
                    alert("Bestand is ongeldig! Alleen foto's zijn toegestaan.")
                }
            }
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

    removePic = (e) => {
        e.preventDefault();
        this.setState({
            file: null
        });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        if(this.state.username.length <= 4){
            alert("Gebruikersnaam moet minimaal 5 karakters lang zijn!")
        }
        else if (this.state.postalCode.length !== 6 || !parseInt(this.state.postalCode.substring(0, 4)) || /[^a-zA-Z]/.test(this.state.postalCode.slice(5, 6))) {
            alert("Postcode is ongeldig")
        }
        else if (this.state.email.length<5) {
            alert("Email mag niet leeg zijn!")
        }
        else if (!this.emailValidation()) {
            alert("Emailadres is ongeldig!")
        }
        else if (this.state.email!==this.state.emailCheck) {
            alert("Emailadressen komen niet overeen!")
        }
        else if (this.state.password.length<8) {
            alert("Wachtwoord moet minimaal 8 karakters lang zijn!")
        }
        else if (this.state.password!==this.state.passwordCheck) {
            alert("Wachtwoorden komen niet overeen!")
        }
        else if (!this.state.checkbox) {
            alert("U dient de algemene voorwaarden te accepteren!")
        }
        else {
            fetch('/api/users', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password,
                    'email': this.state.email,
                    'postalcode': this.state.postalCode,
                    'profilepicture': this.state.file,
                    'active': true
                })
            })
                .then(response => {
                    const data = response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        console.log('error: ', error)
                        if (response.status === 400) {
                            alert("Emailadres of gebruikersnaam bestaat al!")
                            return Promise.reject(error);
                        }
                        return Promise.reject(error);
                    }
                    alert('Account aangemaakt!');
                    this.props.history.push('/Login');
                })
            }
    }

    addDefaultSrc(e) {
        e.target.src = '../../images/Default-User.jpg'
    }


    render() {
        return (
            <div className="AccountCreate">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <header>Account aanmaken</header>

                <Form className="marginreg">
                    <Row>
                        <Col>
                            <Image className="ProfPic" src={"data:file/png;base64," + this.state.file} onError={this.addDefaultSrc} roundedCircle />
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
                            <Button className="profdel" variant="primary" type="removepic" onClick={this.removePic}>
                                Verwijder huidige profielfoto
                            </Button>  
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Form.Group controlId="UsernameInput">
                                <Form.Label>Gebruikersnaam</Form.Label>
                                <Form.Control name="username" type="Username" placeholder="" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="PostalCode">
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control name="postalCode" type="PostalCode" placeholder="" onChange={this.handleInputChange} />
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
                                <Form.Control name="emailCheck" type="Email" placeholder="" onChange={this.handleInputChange} />
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
                                <Form.Control name="passwordCheck" type="Password" placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="Checkbox">
                        <Form.Check name="checkbox" type="checkbox" label="Ik heb de algemene voorwaarden gelezen en ga hiermee akkoord." onChange={this.handleInputChange} />
                        <Link target="_blank" rel="noopener noreferrer" to='/Voorwaarden'>Algemene Voorwaarden</Link>
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