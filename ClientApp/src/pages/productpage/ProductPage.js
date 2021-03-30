import React, { Component } from 'react';
import './ProductPage.css';
import { Form, Carousel, Container, Col, Row, Button, Card} from 'react-bootstrap';
import { BsGeoAlt, BsDroplet, BsBrightnessHigh, BsStar } from 'react-icons/bs';
import styled from 'styled-components';
import PlantItem from '../../components/PlantItem';
import { Link } from 'react-router-dom';
import { render } from '@testing-library/react';

//const contextTypes = {
//    router: React.PropTypes.object
//} 

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Plant: {
                Id: "",
                UserId: "",
                Image: null,
                Name: "",
                Description: "",
                Available: false,
                Type: "",
                Perennial: "",
                Shadow: "",
                AmountOfWater: "",
                Soil: "",
                GrowthHeigth: "",
                Color: "",
                SeasonFrom: null,
                SeasonTo: null,
                SpecialFeatures: "",
                Timestamp: null
            },
            User: {
                Username: "",
                Email: ""
            },
            CurrentUser: {
                Id: ""
            },
        }
    }

    onSubmitHandler = (e) => {
        var letThrough = window.confirm('Verwijder plant ' + this.state.Plant.name + '?');
        if (letThrough) {
            fetch('/api/plants/' + this.props.location.state.id, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
                }
            })
                .then(response => {
                    const data = response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        console.log('Error: ', error)
                        return Promise.reject(error);
                    }
                    //console.log('Succes!');
                    alert('Plant is verwijderd');
                    window.location.href = "/";
                })
        }
    }

    deletePlantAdmin = (e) => {
        var letThrough = window.confirm('Verwijder plant ' + this.state.Plant.name + '?');
        if (letThrough) {
            fetch('/api/admins/remove-plant/' + this.props.location.state.id, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
                }
            })
                .then(response => {
                    const data = response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        console.log('Error: ', error)
                        return Promise.reject(error);
                    }
                    //console.log('Succes!');
                })
            alert('Plant is verwijderd');
            window.location.href = "/search";
        }
    }

    addFriend = (e) => {
        fetch('/api/users/FriendAdd' + this.state.User.Username, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
            }
        })
            .then(response => {
                const data = response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    console.log('error: ', error)
                    return Promise.reject(error);
                }
                alert('Vriendschapsverzoek verstuurd!');
            })
    }
    

    componentDidMount() {
        fetch('/api/plants/' + this.props.location.state.id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
            }
        })
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({ "Plant": data });
            })
            .catch(err => {
                console.log("fetch error" + err);
            });

        fetch('/api/users/' + this.props.location.state.userid, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
            }
        })
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({ "User": data });
            })
            .catch(err => {
                console.log("fetch error" + err);
            });

        if (sessionStorage.getItem('role') === 'User') {
            if (this.props.location.state.userid === this.props.location.state.activeuserid) {
                sessionStorage.setItem('isActiveUser', "inline-block");
                sessionStorage.setItem('isOtherUser', "none");
                sessionStorage.setItem('isAdmin', "none");
                sessionStorage.setItem('isGuest', "none");
            }
            else {
                sessionStorage.setItem('isActiveUser', "none")
                sessionStorage.setItem('isOtherUser', "inline-block");
                sessionStorage.setItem('isAdmin', "none");
                sessionStorage.setItem('isGuest', "none");
            }
        }
        else if (sessionStorage.getItem('role') === 'Admin') {
            sessionStorage.setItem('isActiveUser', "none")
            sessionStorage.setItem('isOtherUser', "none");
            sessionStorage.setItem('isAdmin', "inline-block");
            sessionStorage.setItem('isGuest', "none");
        }
        else {
            sessionStorage.setItem('isActiveUser', "none")
            sessionStorage.setItem('isOtherUser', "none");
            sessionStorage.setItem('isAdmin', "none");
            sessionStorage.setItem('isGuest', "inline-block");
        }
    }

    addDefaultSrc(e) {
        e.target.src = '../../images/Plant1.png'
    }

    render() {
        console.log(this.props.location.state.userid);
        console.log(this.props.location.state.activeuserid);
        return (
            <Container className="container-padding">
                <Row>
                    <Col md={6}>
                        <img class="img" src={"data:file/png;base64," + this.state.Plant.image} onError={this.addDefaultSrc} />
                    </Col>
                    <Col md={6}>
                        <Container className="dbackground">

                            <h1>{this.state.Plant.name}</h1>
                            <Link to={{
                                pathname: '/accountuser', state: {
                                    plantid: this.props.location.state.id,
                                    userid: this.state.User.id
                                }
                            }}><h4>{this.state.User.username}</h4></Link>
                            <br/>
                            <p className="normal-text">Plant details:</p>
                            <p className="normal-text font-weight-bold">Water: {this.state.Plant.amountOfWater ? this.state.Plant.amountOfWater : "Geen"}</p>
                            <p className="normal-text font-weight-bold">Schaduw: {this.state.Plant.shadow ? this.state.Plant.shadow : "Geen"}</p>
                            <p className="normal-text font-weight-bold">Lengte: {this.state.Plant.growthHeigth ? this.state.Plant.growthHeigth : "Geen"}</p>
                            <p className="normal-text font-weight-bold">Kleur: {this.state.Plant.color ? this.state.Plant.color : "Geen"}</p>
                            <p className="normal-text font-weight-bold">Speciale kenmerken: {this.state.Plant.specialFeatures ? this.state.Plant.specialFeatures : "Geen"}</p>
                            <Container className="text-center">

                                <Link class="btn btn-warning" style={{ display: sessionStorage.getItem('isActiveUser') }} to={{
                                    pathname: '/editplant', state: {
                                        id: this.props.location.state.id
                                    }
                                }}>Plant wijzigen</Link>
                                <div class="divider" />
                                <Button variant="danger" onClick={this.onSubmitHandler} style={{ display: sessionStorage.getItem('isActiveUser') }}>
                                    Plant verwijderen
                                </Button>

                                <Button variant="danger" onClick={this.deletePlantAdmin} style={{ display: sessionStorage.getItem('isAdmin') }}>
                                    Plant verwijderen
                                </Button>
                                

                                <div class="divider"/>
                                <a className="btn btn-primary" style={{ display: sessionStorage.getItem('isOtherUser') }} href={`mailto:${this.state.User.email}`}>Neem contact op</a>

                                <div class="divider" />
                                <Button variant="btn btn-primary" onClick={this.addFriend} style={{ display: sessionStorage.getItem('isOtherUser') }}>
                                    Vriend toevoegen
                                </Button>
                            </Container>
                            <br/>
                        </Container>

                    </Col>

                    <Col md={12} className="descmargin">
                        <Container className="dbackground">
                            <h2>Beschrijving</h2>
                            <p className="normal-text">{this.state.Plant.description}</p>
                            <br />
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ProductPage;