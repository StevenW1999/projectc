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
                Username: ""
            },
    }
}

    onSubmitHandler = (e) => {
        fetch('/api/plants/' + this.props.location.state.id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('bearer')
            }
        })
            .then(response => {
                const data = response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    console.log('Error: ', error)
                    return Promise.reject(error);
                }
                console.log('Succes!')
            })
    }

    componentDidMount() {
        fetch('/api/plants/' + this.props.location.state.id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('bearer')
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
                'Authorization': 'bearer ' + localStorage.getItem('bearer')
            }
        })
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({ "User": data });
            })
            .catch(err => {
                console.log("fetch error" + err);
            });
    }

    render() {
        return (
            <Container className="container-padding">
                <Row>
                    <Col md={6}>
                        <Carousel className="gbackground">
                            <Carousel.Item>
                                <img
                                    className="d-block fit-gallery"
                                    src="images/plant1.png"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block fit-gallery"
                                    src="images/plant1.png"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block fit-gallery"
                                    src="images/plant1.png"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block fit-gallery"
                                    src="images/plant1.png"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block fit-gallery"
                                    src="images/plant1.png"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col md={6}>
                        <Container className="dbackground">

                            <h1>{this.state.Plant.name}</h1>
                            <h4>{this.state.User.username}</h4>
                            <br/>
                            <p className="normal-text">Plant details:</p>
                            <p className="normal-text font-weight-bold">Water: {this.state.Plant.amountOfWater}</p>
                            <p className="normal-text font-weight-bold">Schaduw: {this.state.Plant.shadow}</p>
                            <p className="normal-text font-weight-bold">Lengte: {this.state.Plant.growthHeigth}</p>
                            <p className="normal-text font-weight-bold">Kleur: {this.state.Plant.color}</p>
                            <p className="normal-text font-weight-bold">Speciale kenmerken: {this.state.Plant.specialFeatures}</p>
                            <Container className="text-center">

                                <Link class="btn btn-warning" style={{ display: localStorage.getItem('isUser') }} to={{
                                    pathname: '/editplant', state: {
                                        id: this.props.location.state.id
                                    }
                                }}>Plant wijzigen</Link>
                                <div class="divider" />
                                <Button variant="danger" onClick={this.onSubmitHandler} style={{ display: localStorage.getItem('isUser') }}>
                                    Plant verwijderen
                        </Button>
                                

                                <div class="divider"/>
                                <Button>Neem contact op</Button>
                            </Container>
                            <br/>
                        </Container>

                    </Col>
                </Row>

                <br/>

                <Container className="dbackground">
                    <h2>Beschrijving</h2>
                    <p className="normal-text">{this.state.Plant.description}</p>
                    <br/>
                </Container>
                <br/>
            </Container>
        );
    }
}

export default ProductPage;