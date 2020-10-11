import React, { Component } from 'react';
import './Home.css';
import {Col, Container, Jumbotron, Row} from 'react-bootstrap';
import styled from 'styled-components';
import plantImg from '../../images/BG.jpg'
import PlantItem from '../../components/PlantItem';
import { render } from '@testing-library/react';

const Styles = styled.div`
  .jumbo {
    height:500px;
    left:0;
    width: 100%;
    position: absolute;
    background: url(${plantImg}) no-repeat fixed bottom;
    background-size: cover;
    opacity: 0.7;
  }
`;


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
        <div className="BG">
            <Styles>        
            <Jumbotron className="jumbo"></Jumbotron>
        <div className="Banner">
            BIO DIVERSITY
        </div>
        </Styles>
        </div>
        <Container fluid>
          <Row>
            {plants}
          </Row>
        </Container>
    </div>
    );
}
}

export default Home;