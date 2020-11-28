import React, { Component } from 'react';
import './Catalogue.css';
import PlantItem from '../components/PlantItem';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap';

class Catalogue extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let plants = this.props.data.map(plant => {
            return (
                <PlantItem plant={plant} />
            )
        })

                                        // TO-DO: VERANDER 'as="select"'



        return (
            <>
                <div class="row">
                    <div class="side">
                        <div className="filters">
                            <Form>
                                <div class="input-group mb-3">
                                <Form.Control type="text" placeholder="Zoek..."/>
                                    <div class="input-group-append">
                                        <button type="button" class="btn btn-success">Zoek!</button>
                                    </div>
                                </div>
                                <Form.Control type="text" placeholder="Postcode..." style={{ width: "200px" }} />
                                <br />

                                <Form.Control as="select">
                                    <option>Type plant...</option>
                                    <option>Boom</option>
                                    <option>Struik</option>
                                    <option>Kruidachtige</option>
                                    <option>Bodembedekker</option>
                                    <option>klimplant</option>
                                    <option>Vijverplant</option>
                                </Form.Control>
                                <br />
                                <Form.Control as="select">
                                    <option>Vaste plant...</option>
                                    <option>Ja</option>
                                    <option>Nee</option>
                                </Form.Control>
                                <br />
                                <Form.Control as="select">
                                    <option>Standplaats...</option>
                                    <option>Zon</option>
                                    <option>Halfschaduw</option>
                                    <option>Schaduw</option>
                                </Form.Control>
                                <br />
                                <Form.Control as="select">
                                    <option>Water...</option>
                                    <option>Nat</option>
                                    <option>Gemiddeld</option>
                                    <option>Droog</option>
                                </Form.Control>
                                <br />
                                <Form.Control as="select">
                                    <option>Groeihoogte</option>
                                    <option>0-20 cm</option>
                                    <option>20-40 cm</option>
                                    <option>40-70 cm</option>
                                    <option>70-100 cm</option>
                                    <option>100-120 cm</option>
                                    <option>120-150 cm</option>
                                    <option>1,5 - 2 m</option>
                                    <option>Hoger dan 2m</option>
                                </Form.Control>
                                <br />
                                <Form.Control as="select">
                                    <option>Kleur...</option>
                                    <option>Blauw</option>
                                    <option>Geel</option>
                                    <option>Rood</option>
                                    <option>Violetblauw</option>
                                    <option>Wit</option>
                                    <option>Zwart</option>
                                    <option>Anders</option>
                                </Form.Control>
                                <br />
                                <Form.Control as="select">
                                    <option>Afstand...</option>
                                    <option>&lt;5KM</option>
                                    <option>&lt;15KM</option>
                                    <option>&lt;50KM</option>
                                    <option>&lt;100KM</option>
                                </Form.Control>
                                <br />
                            </Form>
                        </div>
                    </div>
                    <div class="main">
                        <section className="cards">
                            {plants}
                        </section>
                    </div>
                </div>
            </>
        );
    }
}
export default Catalogue;