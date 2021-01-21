import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './User.css';
import userPic from '../images/Default-User.jpg';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: {
                Username: "",
                Email: "",
                profilePicture: null
            }
        }
    }

    delete() {
        var letThrough = window.confirm('Verwijder gebruiker ' + this.props.user.username + '?');
        if (letThrough) {
            fetch('/api/admins/delete-user/' + this.props.user.id, {
                method: 'delete',
                headers: {
                    'Authorization': 'bearer ' + localStorage.getItem('bearer')
                }
            })
                .then(() => alert('Profiel verwijderd!'))
                .then(() => window.location.href = "/AdminPanel");
        }
    }

    componentDidMount() {
        fetch('/api/users/' + this.props.user.id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
            }
        })
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({ "User": data });
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
            <>
                <div class="col-sm-8">
                    <div class="card text-center bordernone">
                        <div class="el-wrapper">
                            <div class="col-md-">
                                <div class="box-up">
                                    <div class="card-body">
                                        <h5><b>{this.props.user.username}</b></h5>
                                        <Image className="ProfPic" style={{ width: '100px', height: '100px' }} src={"data:file/png;base64," + this.state.User.profilePicture }
                                            onError={this.addDefaultSrc} roundedCircle />
                                        <p class="card-text">{this.props.user.description}</p>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col">
                                                    <Link to={{
                                                        pathname: '/accountuseradmin', state: {
                                                            userid: this.props.user.id
                                                        }
                                                    }}><Button variant="success" size="sm">Bekijk profiel</Button></Link>
                                                </div>
                                                <div class="col">
                                                    <Button variant="danger" size="sm" onClick={() => this.delete()}>Verwijder profiel</Button>
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
