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
            actualPlantList: [],
            sorteren: "Sorteren op...",
            excludeFilters: true 
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
        if (this.state.sorteren == "Sorteren op...") {
            this.state.sorteren = "";
        }
        if (this.state.excludeFilters == "Inclusief filters?...") {
            this.state.excludeFilters = true
        } else if (this.state.excludeFilters == "Nee") {
            this.state.excludeFilters = false
        } else if (this.state.excludeFilters == "Ja") {
            this.state.excludeFilters = true
        }
    }

    plantFilter(p) {
        if (this.state.zoek != "") {
            if (!(p.name.toLowerCase().includes(this.state.zoek.toLowerCase()))) {
                return false;
            }
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

        if (this.state.sorteren != "") {
            //Coming soon
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


    nullString(value) {
        if (value === null) {
            return "";
        } else {
            return value;
        }
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
    }

    //Function returns a list of plantitems that pass filter
    filterLoop() {
        if (this.state.plantList === null) {
            return [];
        }
        console.log(this.state.excludeFilters)
        var filtered = [];
        var i;
        for (i = 0; i < this.state.plantList.length; i++) {
            if (this.plantFilter(this.state.plantList[i].props.plant) === this.state.excludeFilters) {
                filtered.push(this.state.plantList[i]);
            }
        }
        if (this.state.sorteren != "") {
            console.log(filtered[1].props.plant)
            if (this.state.sorteren === "Naam") {
                filtered = filtered.sort((a, b) => (this.nullString(a.props.plant.name).toLowerCase() > this.nullString(b.props.plant.name).toLowerCase() ? 1 : -1))
            } else if (this.state.sorteren === "Type") {
                filtered = filtered.sort((a, b) => (this.nullString(a.props.plant.type).toLowerCase() > this.nullString(b.props.plant.type).toLowerCase() ? 1 : -1))
            } else if (this.state.sorteren === "Vaste plant") {
                filtered = filtered.sort((a, b) => (this.nullString(a.props.plant.perennial).toLowerCase() > this.nullString(b.props.plant.perennial).toLowerCase() ? 1 : -1))
            } else if (this.state.sorteren === "Standplaats") {
                filtered = filtered.sort((a, b) => (this.nullString(a.props.plant.shadow).toLowerCase() > this.nullString(b.props.plant.shadow).toLowerCase() ? 1 : -1))
            } else if (this.state.sorteren === "Water") {
                filtered = filtered.sort((a, b) => (this.nullString(a.props.plant.amountOfWater).toLowerCase() > this.nullString(b.props.plant.amountOfWater).toLowerCase() ? 1 : -1))
            } else if (this.state.sorteren === "Groeihoogte") {
                filtered = filtered.sort((a, b) => (this.nullString(a.props.plant.growthHeigth).toLowerCase() > this.nullString(b.props.plant.growthHeigth).toLowerCase() ? 1 : -1))
            } else if (this.state.sorteren === "Kleur") {
                filtered = filtered.sort((a, b) => (this.nullString(a.props.plant.color).toLowerCase() > this.nullString(b.props.plant.color).toLowerCase() ? 1 : -1))
            } else if (this.state.sorteren === "Datum") {
                filtered = filtered.sort((a, b) => (a.props.plant.timestamp < b.props.plant.timestamp ? 1 : -1))
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
                                <Form.Control name="excludeFilters" onChange={this.handleInputChange} as="select">
                                    <option>Inclusief filters?...</option>
                                    <option>Ja</option>
                                    <option>Nee</option>
                                </Form.Control>
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
                                <Form.Control name="sorteren" onChange={this.handleInputChange} as="select">
                                    <option>Sorteren op...</option>
                                    <option>Naam</option>
                                    <option>Type</option>
                                    <option>Vaste plant</option>
                                    <option>Standplaats</option>
                                    <option>Water</option>
                                    <option>Groeihoogte</option>
                                    <option>Kleur</option>
                                    <option>Datum</option>
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