import React, { Component } from 'react';
import User from '../../components/User';
import './AdminPanel.css';
import UserCatalogue from '../../components/UserCatalogue';
import Form from 'react-bootstrap/Form';

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
            ],
            userList: null,
            zoek: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        this.preventDefaultFilters();
    }

    preventDefaultFilters() {
        if (this.state.zoek == "Gebruikersnaam...") {
            this.state.zoek = "";
        }
    }

    componentDidMount() {
        fetch('https://localhost:44338/api/Users', {
            method: 'get',
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('bearer')
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                userList: data            }))    }

    getData() {
        if (this.state.userList === null) {
            return [{
                id: 0,
                name: 'waiting',
                image: './',
                description: 'waiting'
            }]
        }
        return this.state.userList;
    }


    render() {
        return (
            <>
                <br/>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-">
                            <Form>
                                <div class="input-group mb-3">
                                <Form.Control type="text" placeholder="Gebruikersnaam..."/>
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-success">Zoek!</button>
                                    </div>
                                </div>
                    </Form>
                    </div>
                    </div>
                    </div>
                <UserCatalogue data={this.getData()} />
                </>
        )
    }
} 


export default AdminPanel;