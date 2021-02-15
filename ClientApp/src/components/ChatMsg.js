import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './ChatMsg.css';
import { AiFillRightCircle } from "react-icons/ai";

import { Link } from 'react-router-dom';


class ChatMsg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            User: {
                id: ""
            }
        }
    }

    componentDidMount() {
        fetch('/api/users/' + this.props.message.Id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('bearer')
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

    render() {
        return (
            <div class="container">
                <img src={this.props.message.ProfilePicture} alt="Avatar"></img>
                <p>{this.state.message.msgContent}</p>
                <span class="time-right">11:00</span>
            </div>
        )
    }
}

export default ChatMsg

