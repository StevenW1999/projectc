import React, { Component } from 'react';
import './ProductPage.css';
import {Carousel, Container, Col, Row, Button, Card} from 'react-bootstrap';
import { BsGeoAlt, BsDroplet, BsBrightnessHigh, BsStar } from 'react-icons/bs';
import styled from 'styled-components';
import PlantItem from '../../components/PlantItem';
import { Link } from 'react-router-dom';
import { render } from '@testing-library/react';

//const contextTypes = {
//    router: React.PropTypes.object
//} 


class ProductPage extends Component {
    onSubmitHandler = (e) => {
        fetch('/api/Plants', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(YOUR_ADDITIONAL_DATA)  //if you do not want to send any addional data,  replace the complete JSON.stringify(YOUR_ADDITIONAL_DATA) with null
        })
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

                            <h1>{this.props.location.state.title}</h1>
                            <h4>Pieter</h4>
                            <br/>
                            <p className="normal-text">Plant details:</p>
                            <p className="normal-text font-weight-bold">Water: {this.props.location.state.amountofwater}</p>
                            <p className="normal-text font-weight-bold">Schaduw: {this.props.location.state.shadow}</p>
                            <p className="normal-text font-weight-bold">Lengte: {this.props.location.state.height}</p>
                            <p className="normal-text font-weight-bold">Kleur: {this.props.location.state.color}</p>
                            <p className="normal-text font-weight-bold">Speciale kenmerken: {this.props.location.state.special}</p>
                            <Container className="text-center">

                                <Link class="btn btn-info" to={{
                                    pathname: '/editplant', state: {
                                        id: this.props.location.state.id,
                                        water: this.props.location.state.water,
                                        title: this.props.location.state.title,
                                        description: this.props.location.state.description,
                                        type: this.props.location.state.type,
                                        shadow: this.props.location.state.shadow,
                                        soil: this.props.location.state.soil,
                                        height: this.props.location.state.height,
                                        color: this.props.location.state.color,
                                        special: this.props.location.state.special,
                                        seasonfrom: this.props.location.state.seasonfrom,
                                        seasonto: this.props.location.state.seasonto,
                                        timestamp: this.props.location.state.timestamp,
                                    }
                                }}>Plant wijzigen</Link>
                                <div class="divider" />
                                <a href="/" class="btn btn-info" role="button" onClick={this.onSubmitHandler}>Plant verwijderen</a>

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
                    <p className="normal-text">{this.props.location.state.description}</p>
                    <br/>
                </Container>
                <br/>
            </Container>
        );
    }
}

export default ProductPage;