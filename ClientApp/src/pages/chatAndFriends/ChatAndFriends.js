import React, { Component } from 'react';
import Chat from '../../components/Chat';
import './ChatAndFriends.css';

class ChatAndFriends extends Component{
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
        return (
            <div>
                <section>
                    <nav> 

                    </nav>

                    <article>
                        <Chat></Chat>
                    </article>
                    
                </section>
            </div>
        );
    }
}

export default ChatAndFriends;