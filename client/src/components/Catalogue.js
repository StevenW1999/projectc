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
        return (
            <>
                <div class="row">
                    <div class="side">
                        <div className="filters">
                            <h2>Filters</h2>
                            <Form>
                                <br />
                                <Form.Control type="text" placeholder="SEARCH" />
                                <br />
                                <Form.Control as="select">
                                    <option>categories</option>
                                </Form.Control>
                                <br />
                                <Form.Control as="select">
                                    <option>types</option>
                                </Form.Control>
                                <br />
                                <Form.Group controlId="formBasicRange">
                                    <Form.Label>km range</Form.Label>
                                    <Form.Control type="range" />
                                </Form.Group>

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