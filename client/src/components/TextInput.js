import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class TextInput extends Component{

    render() {
        return (

            <Form>
                <Form.Group controlId="FNameInput">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="FName" placeholder="Enter first name" />
                </Form.Group>

                <Form.Group controlId="LNameInput">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="LName" placeholder="Enter surname" />
                </Form.Group>

                <Form.Group controlId="EmailInput">
                    <Form.Label>Email adress</Form.Label>
                    <Form.Control type="Email" placeholder="Enter email adress" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="PasswordInput">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="Checkbox">
                    <Form.Check type="checkbox" label="I have read and agree to our terms and services." />
                </Form.Group>

                <Button variant="primary" type="submit" href='/Account'>
                    Submit
                    <Link to="/about"></Link>
                </Button>
            </Form>

        );
    }
}

export default TextInput
