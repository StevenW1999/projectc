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
                    <div class="col-sm-8">
                        <div class="card text-center">
                    <div class="el-wrapper">
                        <div class="col-md-">
                            <div class="box-up">
                            <div class="card-body">
                            <h5><b>{this.props.user.username}</b></h5>
                                    <img src={this.props.user.image} class="img-fluid" alt="" style={{ width: '100px', height: '100px' }}/>
                                            <p class="card-text">{this.props.user.description}</p>
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
                    </div>
                    </div>
                    </div>
            </>
        )
                }
}

export default User;
