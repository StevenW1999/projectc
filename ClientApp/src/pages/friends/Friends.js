import React, { Component } from 'react';
import ConfFriends from '../../components/ConfFriends';

class Friends extends Component{
    constructor(props) {
        super(props);
        this.state = {
            friendsList: [],
            friendRequestsList: []
        }
    }

    componentDidMount() {
        fetch('/api/users/confirmedFriends', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                friendsList: data.map(friend => {
                    return (
                        <ConfFriends friend={friend} />
                    )
                }
                )
            }))
    }

    render() {
        return (
            <div id="friends-page">
                <div id="friends-container">
                    <div id="col-left">
                        <div id="col-title">
                            Vrienden:
                        </div>

                        <div id="friend-list">
                            <section>
                                {this.state.friendsList}
                            </section>
                        </div>
                    </div>

                    <div id="col-right">
                        <div id="friend-request-list">

                        </div>
                    </div>
                </div>     
            </div>
        );
    }
}

export default Friends;