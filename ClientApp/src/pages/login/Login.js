import React, { Component } from 'react';
import './Login.css';
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
          [name]: value    
        });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        fetch('/api/users/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Username": this.state.username,
                "Password": this.state.password
            })
        }).then(response => { return response.json(); })
            .then(data => {
                this.setState({ "auth": data, "isAuthenticated": true }, () => localStorage.setItem("bearer", this.state.auth.accessToken));
            })
            .catch(err => {
                console.log("fetch error" + err);
            });
        alert('U bent ingelogd!');
        //this.props.history.push('/account');
        window.location.reload();
    }

    onAlternativeHandler = (e) => {
        e.preventDefault();

        this.props.history.push('/AccountCreate');
    }


    
    render() {

        return (
            <div className="Login">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <header>Inloggen</header>  
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
                        <Col>
                            <Button variant="primary" type="submit" onClick={this.onSubmitHandler}>
                                Inloggen
                            </Button>  
                        </Col>

                        <Col>
                            <Button variant="primary" type="submit" onClick={this.onAlternativeHandler}>
                                Account aanmaken
                            </Button> 
                        </Col>
                    </Row>
                                             
                </Form>
            </div>
        );
    }
}

export default Login;