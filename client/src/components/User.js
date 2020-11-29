import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './User.css';
import userPic from '../images/Default-User.jpg'; 


class User extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <>
                        <div class="card text-center">
                            <div class="el-wrapper">
                                    <div class="card-body">
                                        <h5>User Name</h5>
                                        <img src={userPic} class="img-fluid" alt="" />
                                            <p class="card-text">Have you ever been far even as decided to want to go look more like?</p>
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col">
                                                        <Button variant="success" size="sm">Bekijk profiel</Button>
                                                    </div>
                                                    <div class="col">
                                                        <Button variant="danger" size="sm">Verwijder profiel</Button>
                                                    </div>
                                            </div>
                                        </div>
                            </div>
                        </div>
                    </div>

            </>
        )
                }
}

export default User;
