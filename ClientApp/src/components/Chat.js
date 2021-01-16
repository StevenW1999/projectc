import React, { Component } from 'react';
import './Chat.css';
import ChatMsg from '../components/ChatMsg';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            messageList: []
        }
    }

    componentDidMount() {
        fetch('/api/chat')                              // Dit moet bevatten: User-id van de sender, username van de sender,
            .then(response => response.json())          //    Profielfoto van de sender, bericht en evt de verzendtijd (datum en tijd)
            .then(data => this.setState({
                messageList: data.map(message => {
                    return (
                        <ChatMsg message={message} />
                    )
                })
            }))
    }

    render() {
        return (
            <div class="row">
                <div class="main">
                    <section className="cards">
                        {this.state.messageList}
                    </section>
                </div>
            </div>
        );
    }
}

export default Chat;