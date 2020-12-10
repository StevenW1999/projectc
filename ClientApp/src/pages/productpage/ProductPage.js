import React, { Component } from 'react';
import './ProductPage.css';
import {Carousel, Container, Col, Row, Button, Card} from 'react-bootstrap';
import { BsGeoAlt, BsDroplet, BsBrightnessHigh, BsStar } from 'react-icons/bs';
import styled from 'styled-components';
import PlantItem from '../../components/PlantItem';

import { render } from '@testing-library/react';

//const contextTypes = {
//    router: React.PropTypes.object
//} 


class ProductPage extends Component {
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
                            <p className="normal-text">1 maand actief op Bio Diversity</p>
                            <br/>
                            <br/>
                            <p className="normal-text"><BsGeoAlt/> Vlaardingen</p>
                            <br/>
                            <p className="normal-text">Plant details:</p>
                            <p className="normal-text font-weight-bold"><BsDroplet /> Small</p>
                            <Container className="text-center">
                                <a href="/Create_trade" class="btn btn-info" role="button">Plant wijzigen</a>
                                <div class="divider" />
                                <a href="/" class="btn btn-info" role="button">Plant verwijderen</a>
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