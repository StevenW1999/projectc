import React, { Component } from 'react';
import User from '../../components/User';
import './AdminPanel.css';
import UserCatalogue from '../../components/UserCatalogue';

class AdminPanel extends Component {
    constructor() {
        super();
        this.state = {
            users: [{

                id: 0,
                name: 'Kasper',
                image: 'images/Default-User.jpg' ,
                description: 'Have you ever been far even as decided'
            }, 
                {
                    id: 1,
                    name: 'Tim',
                    image: 'images/Default-User.jpg',
                    description: 'Ik ben Tim en ik ben slim'
                }
            ]
        }
    }

    render() {
        return (
            <>
                <UserCatalogue data={this.state.users} />
                </>
        )
    }
} 


export default AdminPanel;