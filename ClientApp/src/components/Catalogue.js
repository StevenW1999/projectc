import React, { Component } from 'react';
import './Catalogue.css';
import PlantItem from '../components/PlantItem';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap';

class Catalogue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zoek: "Zoek...",
            postcode: "Postcode...",
            typeplant: "Type plant...",
            vasteplant: "Vaste plant...",
            standplaats: "Standplaats...",
            water: "Water...",
            groeihoogte: "Groeihoogte...",
            kleur: "Kleur...",
            afstand: "Afstand...",
            plantList: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        fetch('https://localhost:44338/api/plants')
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

    createPlants(data) {
        var i;
        for (i = 0; i < data.length; i++) {
            this.state.plantList[i]["id"] = data.id;
            this.state.plantList[i]["name"] = data.name;
            this.state.plantList[i]["image"] = '../../images/BG2.bg';
            this.state.plantList[i]["description"] = data.description;
        }
        return data;
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        if (isNaN(this.state.postcode.slice(0, 4))) {
            alert("Ongeldige postcode")
            alert(this.state.postcode.slice(0, 4))
        }
        else if (/[^a-zA-Z]/.test(this.state.postcode.slice(5, 6))) {
            alert("Ongeldige postcode")
        }
        else if (this.state.postcode.length != 6) {
            alert("Ongeldige postcode")
        }
    }


    render() {

        let plant = this.props.data.map(plant => {
            return (
                <PlantItem plant={plant} />
            )
        })

        return (
            <>
                <div class="row">
                    <div class="side">
                        <div className="filters">
                            <Form onSubmit={this.onSubmitHandler}>
                                <div class="input-group mb-3">
                                    <Form.Control type="text" name="zoek" onChange={this.handleInputChange} placeholder="Zoek..." />
                                    <div class="input-group-append">
                                        <button href="./Search" type="submit" class="btn btn-success" onClick={this.onSubmitHandler}>Zoek!</button>
                                    </div>
                                </div>
                                <Form.Control type="text" placeholder="Postcode..." onChange={this.handleInputChange} name="postcode" style={{ width: "200px" }} />
                                <br />
                                <Form.Control name="typeplant" onChange={this.handleInputChange} as="select">
                                    <option>Type plant...</option>
                                    <option>Boom</option>
                                    <option>Struik</option>
                                    <option>Kruidachtige</option>
                                    <option>Bodembedekker</option>
                                    <option>klimplant</option>
                                    <option>Vijverplant</option>
                                </Form.Control>
                                <br />
                                <Form.Control name="vasteplant" onChange={this.handleInputChange} as="select">
                                    <option>Vaste plant...</option>
                                    <option>Ja</option>
                                    <option>Nee</option>
                                </Form.Control>
                                <br />
                                <Form.Control name="standplaats" onChange={this.handleInputChange} as="select">
                                    <option>Standplaats...</option>
                                    <option>Zon</option>
                                    <option>Halfschaduw</option>
                                    <option>Schaduw</option>
                                </Form.Control>
                                <br />
                                <Form.Control name="water" onChange={this.handleInputChange} as="select">
                                    <option>Water...</option>
                                    <option>Nat</option>
                                    <option>Gemiddeld</option>
                                    <option>Droog</option>
                                </Form.Control>
                                <br />
                                <Form.Control name="groeihoogte" onChange={this.handleInputChange} as="select">
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
                                <Form.Control name="kleur" onChange={this.handleInputChange} as="select">
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
                                <Form.Control name="afstand" onChange={this.handleInputChange} as="select">
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
                            {this.state.plantList}
                        </section>
                    </div>
                </div>
            </>
        );
    }
}
export default Catalogue;