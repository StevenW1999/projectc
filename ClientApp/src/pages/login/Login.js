import React, { Component } from 'react';
import './Login.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            email: "",
            password: "",
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
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

        // if(this.state.fname.email){                                  //  Hier moet react controleren of het correct
        //     alert("Email is incorrect!")                             //      is en anders een foutmelding geven!
        // }                                                            //      Voor nu zit er geen controle op!
        // else if(this.state.password){                                //
        //     alert("Emailadres en wachtwoord komen niet overeen!")    //
        // }                                                            //
        // else{                                                        //
        //     this.props.history.push('/Account');                     //
        // }                                                            //
        this.props.history.push('/Account');
    }

    onAlternativeHandler = (e) => {
        e.preventDefault();

        this.props.history.push('/AccountCreate');
    }


    
    render () {
        return (
            <div className="Login">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <header>Inloggen</header>  
                <Form onSubmit={this.onSubmitHandler}>
                    <Form.Group controlId="EmailInput">
                        <Form.Label>Emailadres</Form.Label>
                        <Form.Control name="email" type="Email" placeholder="" onChange={this.handleInputChange} />
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