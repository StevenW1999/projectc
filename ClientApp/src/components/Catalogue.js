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
            plantList: null,
            actualPlantList: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    // Functie om de default filters op  leeg te zetten
    preventDefaultFilters() {
        if (this.state.zoek == "Zoek...") {
            this.state.zoek = "";  
        }
        if (this.state.postcode == "Postcode...") {
            this.state.postcode = "";  
        }
        if (this.state.typeplant == "Type plant...") {
            this.state.typeplant = "";  
        }
        if (this.state.vasteplant == "Vaste plant...") {
            this.state.vasteplant = "";  
        }
        if (this.state.standplaats == "Standplaats...") {
            this.state.standplaats = "";  
        }
        if (this.state.water == "Water...") {
            this.state.water = "";  
        }
        if (this.state.groeihoogte == "Groeihoogte...") {
            this.state.groeihoogte = "";  
        }
        if (this.state.kleur == "Kleur...") {
            this.state.kleur = "";  
        }
        if (this.state.afstand == "Afstand...") {
            this.state.afstand= "";  
        }
    }

    plantFilter(p) {
        console.log("");
        console.log(p);
        console.log(p.growthHeigth);
        console.log(this.state.groeihoogte);
        if (this.state.zoek != "") {
            if (!(p.name.toLowerCase().includes(this.state.zoek.toLowerCase()))) {
                return false;
            }
        }
        if (this.state.postcode != "") {
            //Deel van user, coming soon  
        }
        if (this.state.typeplant != "") {
            if (!(p.type === this.state.typeplant)) {
                return false;
            }

        }

        if (this.state.vasteplant != "") {
            let check = "";
            if (this.state.vasteplant === "Ja") {
                check = "on";
            } else if (this.state.vasteplant === "Nee") {
                check = "off";
            }
            if (!(p.perennial === check)) {
                return false;
            }

        }
        if (this.state.standplaats != "") {
            if (!(p.shadow === this.state.standplaats)) {
                return false;
            }

        }
        if (this.state.water != "") {
            if (!(p.amountOfWater === this.state.water)) {
                return false;
            }

        }
        if (this.state.groeihoogte != "") {
            if (!(p.growthHeigth === this.state.groeihoogte)) {
                return false;
            }

        }
        if (this.state.kleur != "") {
            if (!(p.color === this.state.kleur)) {
                return false;
            }

        }
        if (this.state.afstand != "") {
            if (!(p.afstand === this.state.zoek)) {
                //coming soon
            }

        }
        return true;
    }

    //Looks if actual plantlist is empty, otherwise gets first plantlist
    getPlantList() {
        if (this.state.actualPlantList === null) {
            return this.state.plantList;
        } else {
            return this.state.actualPlantList;
        }
    }

    componentDidMount() {
        fetch('/api/plants')
            .then(response => response.json())
            .then(data => this.setState({
                plantList: data.map(plant => {
                    return (
                        <PlantItem plant={plant} />
                    )
                }
                )
            })).then(this.state.actualPlantList = this.state.plantList)
    }



    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        this.preventDefaultFilters();
//        console.log(this.state.plantList[1].props.plant.name);
    }

    //Function returns a list of plantitems that pass filter
    filterLoop() {
        if (this.state.plantList === null) {
            return [];
        }
        var filtered = [];
        var i;
        for (i = 0; i < this.state.plantList.length; i++) {
            if (this.plantFilter(this.state.plantList[i].props.plant)) {
                filtered.push(this.state.plantList[i]);
            }
        }
        return filtered;
    }

    render() {
        this.preventDefaultFilters();

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
                            <Form>
                                <div class="input-group">
                                    <Form.Control type="text" name="zoek" onChange={this.handleInputChange} placeholder="Zoek..." />
                                </div>
                                <br />
                                <Form.Control name="typeplant" onChange={this.handleInputChange} as="select">
                                    <option>Type plant...</option>
                                    <option>Bomen</option>
                                    <option>Struiken</option>
                                    <option>Kruidachtige</option>
                                    <option>Bodembedekkers</option>
                                    <option>Klimplanten</option>
                                    <option>Vijverplanten</option>
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
                                    <option>Half schaduw</option>
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
                                    <option>Groeihoogte...</option>
                                    <option>0 - 20 cm</option>
                                    <option>20 - 40 cm</option>
                                    <option>40 - 70 cm</option>
                                    <option>70 - 100 cm</option>
                                    <option>100 - 120 cm</option>
                                    <option>120 - 150 cm</option>
                                    <option>1.5 - 2 m</option>
                                    <option>Hoger dan 2 m</option>
                                </Form.Control>
                                <br />
                                <Form.Control name="kleur" onChange={this.handleInputChange} as="select">
                                    <option>Kleur...</option>
                                    <option>Blauw</option>
                                    <option>Geel</option>
                                    <option>Oranje</option>
                                    <option>Rood</option>
                                    <option>Roze</option>
                                    <option>Violetblauw</option>
                                    <option>Wit</option>
                                    <option>Zwart</option>
                                    <option>anders</option>
                                </Form.Control>
                                <br />
                            </Form>
                        </div>
                    </div>
                    <div class="main">
                        <h1 className="catext">Catalogus</h1>
                        <section className="cards">
                            {this.filterLoop()}
                        </section>
                    </div>
                </div>
            </>
        );
    }
}
export default Catalogue;