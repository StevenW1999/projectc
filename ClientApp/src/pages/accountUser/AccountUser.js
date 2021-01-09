import React, { Component } from 'react';
import "./AccountUser.css";
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import "../../components/UserPlantsCatalogue";
import UserPlantsCatalogue from '../../components/UserPlantsCatalogue';

class AccountUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            user: {
                id: '',
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

    render() {
        return (
            <div className="Account">

                <Form>
                    <header>Mijn account</header>

                    <Image className="ProfPic" src={"data:file/png;base64," + this.state.user.profilePicture} roundedCircle />

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

                    <Button variant="primary" type="submit">
                        <Link to="/" className="Lnk">
                            Uitloggen
                        </Link>
                    </Button>

                    <Button className="float-right" variant="primary" type="submit">
                        <Link to={{
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
                        }} className="Lnk">
                            Account Aanpassen
                        </Link>
                    </Button>
                    <UserPlantsCatalogue></UserPlantsCatalogue>

                </Form>
            </div>
        );
    }
}

export default AccountUser;