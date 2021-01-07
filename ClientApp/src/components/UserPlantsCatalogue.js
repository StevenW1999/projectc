import React, { Component } from 'react';
import './Catalogue.css';
import PlantItem from '../components/PlantItem';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap';

class UserPlantsCatalogue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plantList: []
        }
    }

    componentDidMount() {
        fetch('/api/plants/userplants', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
            }
        })
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

    render() {

        return (
            <>
                <div class="row">
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
export default UserPlantsCatalogue;