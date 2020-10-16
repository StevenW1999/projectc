import React, { Component } from 'react';
import './Home.css';
import {Col, Container, Jumbotron, Row} from 'react-bootstrap';
import PlantItem from '../../components/PlantItem';
import { render } from '@testing-library/react';



class Home extends Component{
  constructor(){
    super();
    this.state = {
      plants: [{
        id: 0,
        name: 'plant1',
        image: './images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablabla'
    },
    {
        id: 1,
        name: 'plant2',
        image: './images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablabla'
    },
    {
        id: 2,
        name: 'plant3',
        image: './images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablabla'
    },
    {
        id: 3,
        name: 'plant4',
        image: './images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablabla'
    }
    ,
    {
        id: 3,
        name: 'plant4',
        image: './images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablabla'
    }
    
]
    }
  }
render () {
  let plants = this.state.plants.map(plant => {
    return (
      <Col sm="3">
      <PlantItem plant={plant}/>
    </Col>
    )
  })
  return (
    <div className="Home">        
            <Jumbotron fluid className="Jimbo">
            <Container>
              <h1>BIO DIVERSITY</h1>
          </Container>
            </Jumbotron>
                    {/* <Container fluid>
          <Row>
            {plants}
          </Row>
        </Container> */}
    </div>
    );
}
}

export default Home;