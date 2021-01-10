import React, { Component } from 'react';
import "./AccountUser.css";
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import "../../components/UserPlantsCatalogue";
import UserPlantsCatalogue from '../../components/UserPlantsCatalogue';
import PlantItem from '../../components/PlantItem';

class AccountUser extends Component {
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
            },
            plantList: []
        }
    }

    componentDidMount() {
        fetch('/api/users/' + this.props.location.state.userid, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
            }
        })
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({ "user": data });
            })
            .catch(err => {
                console.log("fetch error" + err);
            });

        fetch('/api/plants/chosenuserplants/' + this.props.location.state.userid)
            .then(response => response.json())
            .then(data => this.setState({
                plantList: data.map(plant => {
                    return (
                        <PlantItem plant={plant} />
                    )
                }
                )
            }))
    }

    render() {
        return (
            <div className="Accountshow">

                <Form>
                    <header>Account van {this.state.user.username}</header>

                    <Image className="ProfPic" src={"data:file/png;base64," + this.state.user.profilePicture} roundedCircle />

                    <h1>Naam:</h1>
                    <h4>{this.state.user.username}</h4>
                    <br></br>
                    <br></br>
                    <h1>Email:</h1>
                    <h4>{this.state.user.email}</h4>
                    <br></br>

                    <br></br>
                    <h1>Postcode:</h1>
                    <h4>{this.state.user.postalCode}</h4>
                    <Link className="btn btn-primary" to={{
                        pathname: '/productpage', state: {
                            id: this.props.location.state.plantid,
                            userid: this.props.location.state.userid
                        }
                    }}>
                        Terug
                    </Link>
                    <h1 className="text-center">Stekjes van {this.state.user.username}:</h1>
                    <div class="row">
                        <div class="main">
                            <section className="cards">
                                {this.state.plantList}
                            </section>
                        </div>
                    </div>

                </Form>
            </div>
        );
    }
}

export default AccountUser;