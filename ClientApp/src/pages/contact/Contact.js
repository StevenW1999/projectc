import React, { Component } from 'react';
import './Contact.css';
import {Carousel, Container, Col, Row, Button, Card} from 'react-bootstrap';
import {BsGeoAlt, BsDroplet, BsBrightnessHigh, BsStar} from 'react-icons/bs';
import styled from 'styled-components';
// import PlantItem from '../../components/PlantItem';
import { render } from '@testing-library/react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Contact extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    render() {
        return (
            <div>
                <div style={{ height: '500px', width: '100%' }}>
                    <GoogleMapReact
                        //bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        <AnyReactComponent
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                </div>
                <Container>
                    <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}><h1>Contact</h1></div>
                    <Row style={{ marginBottom: '20px' }}>
                        <Col md={6}>
                            <h5><b>Bereikbaarheid</b></h5>
                            <p>Stadskwekerij De Kas is het makkelijkst te bereiken per fiets of lopend. We zitten immers in het hartje van de stad.</p>
                            <br />
                            <h5><b>Openbaar Vervoer</b></h5>
                            <p>Stadskwekerij De Kas is goed bereikbaar met het Openbaar Vervoer.</p>
                            <br />
                            <p>Bus 33: 2 min. lopen vanaf halte Metrostation Blijdorp</p>
                            <p>Metro Lijn E: 3 min. lopen vanaf Metrostation Blijdorp</p>
                            <p>Trein: 10 min. lopen vanaf Rotterdam CS</p>
                            <br />
                            <h5><b>Per auto</b></h5>
                            <p>Wij raden af per auto te komen. De parkeerdruk in de wijk Blijdorp is hoog. Het parkeertarief is ca. 2 euro per uur (ma-za van 9 tot 18 uur). Gratis parkeren kan op de parkeerplaats van Tennisclub Aeolus-Oledo aan de Stadhoudersweg die bereikbaar is via het Vroesenpad.</p>
                            <br />
                            <p>Voor minder validen zijn enkele parkeerplaatsen beschikbaar op het terrein.</p>
                        </Col>
                        <Col md={6}>
                            <h5><b>Stadskwekerij De Kas</b></h5>
                            <p>Van Beuningenstraat 22</p>
                            <p>3039 WE Rotterdam</p>
                            <br />
                            <h5><b>Marja Versteeg</b></h5>
                            <p>06 23 05 77 61</p>
                            <br />
                            <h5><b>Eva Bes</b></h5>
                            <p>06 21 43 54 78</p>
                            <br />
                            <h5><b>Email adres</b></h5>
                            <p>info@stadskwekerijdekas.nl</p>
                            <br />
                            <h5><b>Openingstijden</b></h5>
                            <p>ma: 10 - 12 uur</p>
                            <p>do: 10 - 16 uur</p>
                            <p>vr: 16 - 19 uur (Rechtstreex)</p>
                            <p>za: 10 - 11 uur (Rechtstreex)</p>
                            <br />
                            <p>KvK: 71199357</p>
                            <p>IBAN: NL79TRIO0379220407</p>
                        </Col>
                    </Row>
                </Container>
                
            </div>
        );
    }
}

//export default SimpleMap;
export default Contact;