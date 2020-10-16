import React, { Component } from 'react';
import './ProductPage.css';
import {Carousel, Container, Col, Row, Button, Card} from 'react-bootstrap';
import styled from 'styled-components';
// import PlantItem from '../../components/PlantItem';
import { render } from '@testing-library/react';

class ProductPage extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col md={6}>
                        <Carousel className="gbackground">
                            <Carousel.Item>
                                <img
                                    className="d-block fit-gallery"
                                    src="./images/BG2.jpg"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block fit-gallery"
                                    src="./images/Plant1.jpg"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block fit-gallery"
                                    src="./images/BG.jpg"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col md={6}>
                        <Container className="dbackground">
                            <h1>Grote plant</h1>
                            <h4>Pieter</h4>
                            <br/>
                            <p>Dit is mijn best plant ooit en ik ga dit nooit weggeven Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <Container className="text-center">
                                <Button>Neem contact op</Button>
                            </Container>
                            <br/>
                        </Container>

                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col xs={6} md={2}>
                        <div className="image">
                            <img src="./images/BG2.jpg" className="img img-responsive full-width"/>
                        </div>
                    </Col>
                    <Col xs={6} md={2}>
                        <div className="image">
                            <img src="./images/BG2.jpg" className="img img-responsive full-width"/>
                        </div>
                    </Col>
                    <Col xs={6} md={2}>
                        <div className="image">
                            <img src="./images/BG2.jpg" className="img img-responsive full-width"/>
                        </div>
                    </Col>
                    <Col xs={6} md={2}>
                        <div className="image">
                            <img src="./images/BG2.jpg" className="img img-responsive full-width"/>
                        </div>
                    </Col>
                    <Col xs={6} md={2}>
                        <div className="image">
                            <img src="./images/BG2.jpg" className="img img-responsive full-width"/>
                        </div>
                    </Col>
                    <Col xs={6} md={2}>
                        <div className="image">
                            <img src="./images/BG2.jpg" className="img img-responsive full-width"/>
                        </div>
                    </Col>

                </Row>

                <br/>
            </Container>
        );
    }
}

export default ProductPage;