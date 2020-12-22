import React, { Component } from 'react';
import './ChatAndFriends.css';

class ChatAndFriends extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
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
        return (
            <div>
                
            </div>
        );
    }
}

export default ChatAndFriends;