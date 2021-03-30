import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import './Chat.css';
import ChatMsg from '../../components/ChatMsg';
import Image from 'react-bootstrap/Image';

class Chat extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            searchchat: "",
            file: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
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

    handleInputChange(e) {
        e.stopPropagation()
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        
    }

    addDefaultSrc(e) {
        e.target.src = '../../images/Default-User.jpg'
    }
    
    render() {
        return (
            <div id="chatpage">
                <div id="chat-container">
                    <div id="chat-element-left">
                        <div id="search-chat">
                            <input id="search-chat-input" name="searchchat" type="searchchat" placeholder="Zoeken" onChange={this.handleInputChange}/>  
                        </div>
                        <div id="chat-list">
                            <div class="chats active">
                                <Image className="ProfPic" src={"data:file/png;base64," + this.state.file} onError={this.addDefaultSrc} roundedCircle />
                                <div class="chat-title">
                                    Wolfe
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="chat-element-right">
                        <div id="chat-title">
                            <span>Wolfe</span>
                        </div>
                        <div id="message-list">
                            <div class="message-row user-message">
                                <div class="message-content">
                                    <div class="message-text">Hello there</div>
                                    <div class="message-date">17 apr</div>
                                </div> 
                            </div>
                            <div class="message-row other-message">
                                <div class="message-content">
                                    <Image className="ProfPic" src={"data:file/png;base64," + this.state.file} onError={this.addDefaultSrc} roundedCircle />
                                    <div class="message-text">General kenobi</div>
                                    <div class="message-date">17 apr</div>
                                </div>
                            </div>
                        </div>
                        <div id="chat-form">
                            <Form.Control name="bericht" type="bericht" placeholder="Typ uw bericht" onChange={this.handleInputChange} />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Chat;