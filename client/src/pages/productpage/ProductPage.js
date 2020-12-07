import React, { Component } from 'react';
import './ProductPage.css';
import {Carousel, Container, Col, Row, Button, Card} from 'react-bootstrap';
import {BsGeoAlt, BsDroplet, BsBrightnessHigh, BsStar} from 'react-icons/bs';
import styled from 'styled-components';
// import PlantItem from '../../components/PlantItem';
import { render } from '@testing-library/react';

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
                            <h1>Grote plant</h1>
                            <h4>Pieter</h4>
                            <p className="normal-text">1 maand actief op Bio Diversity</p>
                            <a href="">Bekijk meer planten van Pieter</a>
                            <br/>
                            <br/>
                            <p className="normal-text"><BsGeoAlt/> Vlaardingen</p>
                            <br/>
                            <p className="normal-text">Plant details:</p>
                            <p className="normal-text font-weight-bold"><BsDroplet/> Om de 2 weken water geven</p>
                            <p className="normal-text font-weight-bold"><BsBrightnessHigh/> Heeft weinig zon nodig</p>
                            <Container className="text-center">
                                <Button>Neem contact op</Button> <BsStar/>
                            </Container>
                            <br/>
                        </Container>

                    </Col>
                </Row>

                <br/>

                <Container className="dbackground">
                    <h2>Beschrijving</h2>
                    <p className="normal-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sem in magna sollicitudin volutpat. Sed lorem ante, volutpat et leo in, mattis tincidunt elit. In ultricies et turpis sed mattis. Nullam non metus bibendum, molestie lectus sit amet, lobortis ipsum. Nullam id consequat leo. Donec aliquet iaculis nunc, eu auctor odio dictum eget. Duis venenatis at lectus id tristique. Phasellus porttitor nulla sed porttitor ultricies. Sed ullamcorper semper eleifend. Vivamus vulputate erat dolor, ut rutrum libero euismod at. Mauris convallis turpis quis mi commodo bibendum.</p>
                    <br/>
                </Container>
                <br/>

                <Row>
                    <Col md={2}>
                        <div>
                            <a href=""><img className="img img-responsive full-width"
                                src="images/plant1.png"/></a>
                        </div>
                        <a href=""><div className="title-related">
                            <h5 className="normal-text text-related">Cactus plant</h5>
                            <p className="normal-text text-related bottom-related"><BsGeoAlt/> Vlaardingen</p>
                        </div></a>
                    </Col>
                    <Col md={2}>
                        <div>
                            <a href=""><img className="img img-responsive full-width"
                                src="images/plant1.png" /></a>
                        </div>
                        <a href=""><div className="title-related">
                            <h5 className="normal-text text-related">Cactus plant</h5>
                            <p className="normal-text text-related bottom-related"><BsGeoAlt /> Vlaardingen</p>
                        </div></a>
                    </Col>
                    <Col md={2}>
                        <div>
                            <a href=""><img className="img img-responsive full-width"
                                src="images/plant1.png" /></a>
                        </div>
                        <a href=""><div className="title-related">
                            <h5 className="normal-text text-related">Cactus plant</h5>
                            <p className="normal-text text-related bottom-related"><BsGeoAlt /> Vlaardingen</p>
                        </div></a>
                    </Col>
                    <Col md={2}>
                        <div>
                            <a href=""><img className="img img-responsive full-width"
                                src="images/plant1.png" /></a>
                        </div>
                        <a href=""><div className="title-related">
                            <h5 className="normal-text text-related">Cactus plant</h5>
                            <p className="normal-text text-related bottom-related"><BsGeoAlt /> Vlaardingen</p>
                        </div></a>
                    </Col>
                    <Col md={2}>
                        <div>
                            <a href=""><img className="img img-responsive full-width"
                                src="images/plant1.png" /></a>
                        </div>
                        <a href=""><div className="title-related">
                            <h5 className="normal-text text-related">Cactus plant</h5>
                            <p className="normal-text text-related bottom-related"><BsGeoAlt /> Vlaardingen</p>
                        </div></a>
                    </Col>
                    <Col md={2}>
                        <div>
                            <a href=""><img className="img img-responsive full-width"
                                src="images/plant1.png" /></a>
                        </div>
                        <a href=""><div className="title-related">
                            <h5 className="normal-text text-related">Cactus plant</h5>
                            <p className="normal-text text-related bottom-related"><BsGeoAlt /> Vlaardingen</p>
                        </div></a>
                    </Col>
                </Row>

                <Container className="text-center">
                    <Button>Meer laden...</Button>
                </Container>        

                <br/>
            </Container>
        );
    }
}

export default ProductPage;