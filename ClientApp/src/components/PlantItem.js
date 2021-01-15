import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './PlantItem.css';
import { AiFillRightCircle } from "react-icons/ai";

import { Link } from 'react-router-dom';


class PlantItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            User: {
                Username: ""
            },
            Activeuser: {
                id: ""
            }
        }
    }

    componentDidMount() {
        fetch('/api/users/' + this.props.plant.userId, {
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

        fetch('/api/users/current', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
            }
        })
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({ "Activeuser": data });
            })
            .catch(err => {
                console.log("fetch error" + err);
            });
    }
    render() {
        return (
            <>
                <div class="el-wrapper">
                    <div class="box-up">
                        <img class="img" src={"data:file/png;base64," + this.props.plant.image} alt="" />
                        <div class="img-info">
                            <div class="info-inner">
                                <span class="p-name">{this.props.plant.name}</span>
                                <span class="p-user">{this.state.User.username}</span>
                            </div>
                            <div class="a-categories">Categorie: <span class="categories">{this.props.plant.type}</span></div>
                        </div>
                    </div>
                    <div class="box-down">
                        <div class="h-bg bar-recolor">
                            <div class="h-bg-inner"></div>
                        </div>
                        <a class="bar">
                            <span class="detail"><AiFillRightCircle /></span>
                            <span class="view-detail">
                                
                                <Link class="txt" to={{
                                    pathname: '/productpage', state: {
                                        id: this.props.plant.id,
                                        userid: this.props.plant.userId,
                                        activeuserid: this.state.Activeuser.id
                                    }
                                }}>BEKIJK PLANT</Link>
                            </span>
                        </a>
                    </div>
                </div>

            </>
        )
    }
}

export default PlantItem

