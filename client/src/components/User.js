import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './User.css';


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
                            <h5>{this.props.user.name}</h5>
                            <img src={this.props.user.image} class="img-fluid" alt="" />
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

            </>
        )
                }
}

export default User;
