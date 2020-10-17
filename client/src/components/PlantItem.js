import React, { Component } from 'react';
import {Card, Button} from 'react-bootstrap';

class PlantItem extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.props.plant.image} />
            <Card.Body>
                <Card.Title>{this.props.plant.name}</Card.Title>
                <Card.Text>
                    {this.props.plant.description}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>  
        )
    }
}


export default PlantItem

