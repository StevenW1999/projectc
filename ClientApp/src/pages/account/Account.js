import React, { Component } from 'react';
import "./Account.css";
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';

class Account extends Component{
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
                'Authorization': 'bearer ' + localStorage.getItem('bearer')
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
        const pageswitch = this.state.user;
        return (
            <div className="Account">  
          
                <Form>
                    <header>Mijn account</header>
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
                        <Link to={{pathname: '/AccountEdit', data: pageswitch}} className="Lnk">
                            Account Aanpassen
                        </Link>
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Account;