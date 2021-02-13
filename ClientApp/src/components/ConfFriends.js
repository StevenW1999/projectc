import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';

class ConfFriends extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }


    addDefaultSrc(e) {
        e.target.src = '../../images/Default-User.jpg'
    }

    render() {
        return (
            <div id="confirmedFriends-container">
                <Image className="ProfPic" src={"data:file/png;base64," + this.props.file} onError={this.addDefaultSrc} roundedCircle />
                <div class="chat-title">
                    Wolfe
                </div>
            </div>
        );
    }
}

export default ConfFriends;