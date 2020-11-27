import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AccountCreate.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
//For used documentation or code examples, please see the bottom of the page.


//This is a basic check to see if the entered email adress is the correct format. 
//However, it doesn't check if the email adress is a valid one.
const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class AccountCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            fname: "",
            lname: "",
            email: "",
            emailcheck: "",
            password: "",
            passwordcheck: "",
            checkbox: false,
            errors: {
                fname: "",
                lname: "",
                email: "",
                emailcheck: "",
                password: "",
                passwordcheck: "",
                checkbox: false
              } 
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let errors = this.state.errors;

        switch (name) {
            case 'fname': 
                errors.fname = 
                    value.length < 1 ? 'Voornaam mag niet leeg zijn!' : '';
                break;
            case 'lname':
                errors.lname = 
                    value.length < 1 ? 'Achternaam mag niet leeg zijn!' : '';
                break;
            case 'email': 
                errors.email = 
                    validEmailRegex.test(value) ? '' : 'Emailadres is ongeldig!';
                break;
            case 'emailcheck': 
                errors.emailcheck = 
                    this.state.email==value ? '' : 'Emailadressen komen niet overeen!';
                break;
            case 'password': 
                errors.password = 
                    value.length < 8 ? 'Wachtwoord moet minimaal 8 karakters lang zijn!' : '';
                break;
            case 'passwordcheck': 
                errors.passwordcheck = 
                    this.state.password==value ? 'Wachtwoorden komen niet overeen!' : '';
                break;
            case 'checkbox': 
                errors.checkbox = 
                    value ? 'U moet de algemene voorwaarden accepteren om door te gaan!' : '';
                break;
            default:
                break;
          }
        
        this.setState({
          [name]: value    
        });
    }

    handleValidation(){
        // if(this.state.fname.length<=0){
        //     this.state.valError = "Het veld voornaam mag niet leeg zijn.";
        //     return false;
        // }
        // return true;

        if(validateForm(this.state.errors)) {
            console.info('Valid Form')
        }
        else{
            console.error('Invalid Form')
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        if(this.handleValidation()){
            
            alert("GG lad");
            //this.props.history.push('/About');   //<--This works for changing pages  ("Hello there")
        }
        else{
            alert(this.state.valError);
        }
        //alert(this.state.fname);
    }

    render() {
        return (
            <div className="AccountCreate">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <header>Account aanmaken</header>

                <Form onSubmit={this.onSubmitHandler}>
                    <Row>
                        <Col>
                            <Form.Group controlId="FNameInput">
                                <Form.Label>Voornaam</Form.Label>
                                <Form.Control name="fname" type="FName" placeholder="" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="LNameInput">
                                <Form.Label>Achternaam</Form.Label>
                                <Form.Control name="lname" type="LName" placeholder="" onChange={this.handleInputChange} />
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
                                <Form.Control name="emailcheck" type="Email" placeholder="" onChange={this.handleInputChange} />
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
                                <Form.Control name="passwordcheck" type="Password" placeholder="Minimaal 8 karakters" onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="Checkbox">
                        <Form.Check name="checkbox" type="checkbox" label="Ik heb de algemene voorwaarden gelezen en ga hiermee akkoord." onChange={this.handleInputChange} />
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

//Form validation:
//  https://www.telerik.com/blogs/up-and-running-with-react-form-validation
//  https://en.wikipedia.org/wiki/Regular_expression