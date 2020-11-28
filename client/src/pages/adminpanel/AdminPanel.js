import React, { Component } from 'react';
import User from '../../components/User';
import './AdminPanel.css';

class AdminPanel extends Component {
    constructor() {
        super();
        this.state = {
            test: 'a'
        }
    }

    render() {
        return (
            <>
                <div class="container">
                    <div class="row">
                        <User />
                        </div>
                    <div class="row">
                        <User />
                        </div>
                    </div>
                </>
        )
    }
} 


export default AdminPanel;