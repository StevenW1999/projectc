import React, { Component } from 'react';
import "./Account.css";
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import "../../components/UserPlantsCatalogue";
import UserPlantsCatalogue from '../../components/UserPlantsCatalogue';

class Account extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
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
            this.setState({ "user": data });
        })
        .catch(err => {
            console.log("fetch error" + err);
        });
    }

    addDefaultSrc(e) {
        e.target.src = '../../images/Default-User.jpg'
    }

    render() {
        return (
            <div className="Account">  
          
                <Form>
                    <header>Mijn account</header>

                    <Image className="ProfPic" src={"data:file/png;base64," + this.state.user.profilePicture} onError={this.addDefaultSrc} roundedCircle />
                    
                    <h1>Naam:</h1>      
                    <h4>{this.state.user.username}</h4>
                    <br></br>
                    <br></br>
                    <h1>Email:</h1>
                    <h4>{this.state.user.email}</h4>
                    <br></br>

                    <br></br>
                    <h1>Postcode:</h1>
                    <h4>{this.state.user.postalCode}</h4>

                    <Container style={{ margin: 10 }}>
                        <Link class="btn btn-primary" style={{margin: 10}} to={{
                            pathname: '/AccountEdit',
                            state: {
                                id: this.state.user.id,
                                username: this.state.user.username,
                                password: this.state.user.password,
                                email: this.state.user.email,
                                postalCode: this.state.user.postalCode,
                                profilePicture: this.state.user.profilePicture,
                                active: false
                            }
                        }}>Account Aanpassen</Link>
                    </Container>
                    
                    <UserPlantsCatalogue></UserPlantsCatalogue>

                </Form>
            </div>
        );
    }
}

export default Account;