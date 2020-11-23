import React, { Component } from 'react';
import './Catalogue.css';
import PlantItem from '../components/PlantItem';
import { Container, Col, Row } from 'react-bootstrap';

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
            <div className="row">
                <div className="side">
                    <h2>Filter</h2>
                    <form>
                        <select name="Product" id="product">
                            <option value="product">Product</option>
                            <option value="seed">Seed</option>
                            <option value="bud">Bud</option>
                            <option value="cutting">Cutting</option>
                        </select>
                        <br></br>
                        <br></br>
                        <select name="Type" id="type">
                            <option value="type">Type</option>
                            <option value="tree">Tree</option>
                            <option value="shrub">Shrub</option>
                            <option value="herb">Herb</option>
                            <option value="climber">Climber</option>
                            <option value="creepers">Creepers</option>
                        </select>
                        <br></br>
                        <br></br>
                        <select name="Water" id="water">
                            <option value="water">Water</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <br></br>
                        <br></br>
                        <select name="Light" id="light">
                            <option value="light">Light</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <br></br>
                        <br></br>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
                <div className="main">
                        {plants}
                </div>
            </div>
        );
    }
}
export default Catalogue;