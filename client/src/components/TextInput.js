import React, { Component } from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

class TextInput extends Component{


    handleSubmit(event){
        //alert("Hello there");
        //window.open("https://genshin.mihoyo.com/en/news");    // <-- Nieuw tabblad
        //window.location.href("https://genshin.mihoyo.com/en/news"); //<-- Werkt niet
        //this.props.history.push('/About');    //<-- Werkt niet
    }

    

    render() {
        return (
        
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="FNameInput">
                            <Form.Label>Voornaam</Form.Label>
                            <Form.Control name="fname" type="FName" placeholder="" />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="LNameInput">
                            <Form.Label>Achternaam</Form.Label>
                            <Form.Control name="lname" type="LName" placeholder="" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="EmailInput">
                            <Form.Label>Emailadres</Form.Label>
                            <Form.Control name="email" type="Email" placeholder="" />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="ConfirmEmailInput">
                            <Form.Label>Bevestig emailadres</Form.Label>
                            <Form.Control name="emailcheck" type="Email" placeholder="" />
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Form.Group controlId="PasswordInput">
                            <Form.Label>Wachtwoord</Form.Label>
                            <Form.Control name="password" type="Password" placeholder="Minimaal 8 karakters" />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="ConfirmPasswordInput">
                            <Form.Label>Bevestig wachtwoord</Form.Label>
                            <Form.Control name="passwordcheck" type="Password" placeholder="Minimaal 8 karakters" />
                        </Form.Group>
                    </Col>
                </Row>

                

                <Form.Group controlId="Checkbox">
                    <Form.Check name="checkbox" type="checkbox" label="Ik heb de algemene voorwaarden gelezen en ga hiermee akkoord." />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Account aanmaken
                    {/* <Link to="/about"></Link>, href='/About' */}
                </Button>
            </Form>
            

            
        );
        
        
    }
    
}

export default TextInput
