import React, { Component } from 'react';
import './AdminLogin.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            auth: {
                userName: "",
                role: "",
                originalUserName: "",
                accessToken: "",
                refreshToken: ""
            },
            isAuthenticated: false,
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

    }


    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value,
            fetchCompleted: false,
            isAuthenticated: false
        });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        fetch('/api/admins/cms-login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Username": this.state.username,
                "Password": this.state.password
            })
        }).then(response => { return response.json(); })
            .then(data => {
                this.setState({ "auth": data, "isAuthenticated": true }, () => sessionStorage.setItem("bearer", this.state.auth.accessToken));
                if (this.state.auth.accessToken === undefined) {
                    this.state.isAuthenticated = false;
                }
                return this.state.isAuthenticated;
            })
            .catch(err => {
                console.log("fetch error" + err);
                return this.state.isAuthenticated;
            })
            .then(data => { this.userAlert(data) })
        }
   
    userAlert(input) {
        if (input === true) {
            sessionStorage.setItem("role", this.state.auth.role);
            alert('Je bent ingelogd!');
            window.location.href = "/adminpanel";
        } else {
            alert('Verkeerde informatie, probeer opnieuw.');
        }
    } 

    onAlternativeHandler = (e) => {
        e.preventDefault();

        this.props.history.push('/AccountCreate');
    }


    
    render() {

        return (
            <div className="Login">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <header>Administrator login</header>  
                <Form onSubmit={this.onSubmitHandler}>
                    <Form.Group controlId="UsernameInput">
                        <Form.Label>Gebruikersnaam</Form.Label>
                        <Form.Control name="username" type="Username" placeholder="" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="PasswordInput">
                        <Form.Label>Wachtwoord</Form.Label>
                        <Form.Control name="password" type="Password" placeholder="" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Row>
                        <Button variant="primary" type="submit" onClick={this.onSubmitHandler}>
                            Inloggen
                        </Button>  
                    </Row>
                                             
                </Form>
            </div>
        );
    }
}

export default Login;