import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import User from './User';
import userPic from '../images/Default-User.jpg'; 
import Form from 'react-bootstrap/Form'
import './UserCatalogue.css';


class UserCatalogue extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let users = this.props.data.map(user => {
            return (
                <User user={user} />
            )
        })

        return (
            <>
                <br /> <br />
                <div class="container">
                    <div class="row">
                        <div class="col-sm-">
                            <Form>
                                <div class="input-group mb-3">
                                <Form.Control type="text" placeholder="Gebruikersnaam..."/>
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-success">Zoek!</button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <div class="container">
                <div class="main">
                   <section className="cards">
                            {users}
                    </section>
                    </div>
                    </div>
                <br /> <br />
            </>
        )
    }
}

export default UserCatalogue;
