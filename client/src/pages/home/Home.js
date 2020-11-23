import React, { Component } from 'react';
import './Home.css';
<<<<<<< Updated upstream:src/pages/home/Home.js
import {Col, Container, Jumbotron, Row} from 'react-bootstrap';
import PlantItem from '../../components/PlantItem';
<<<<<<< Updated upstream:client/src/pages/home/Home.js
=======
import { render } from '@testing-library/react';

const Styles = styled.div`
  .jumbo {
    height:500px;
    left:0;
    width: 100%;
    position: absolute;
    background: url("./images/BG.jpg") no-repeat fixed bottom;
    background-size: cover;
    opacity: 0.7;
  }
`;

=======
import { Container, Jumbotron} from 'react-bootstrap';
import Catalogue from '../../components/Catalogue';
>>>>>>> Stashed changes:client/src/pages/home/Home.js
>>>>>>> Stashed changes:src/pages/home/Home.js

class Home extends Component {
  constructor() {
    super();
    this.state = {
      plants: [{
<<<<<<< Updated upstream:src/pages/home/Home.js
        id: 0,
        name: 'plant1',
        image: '../../images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablabla'
    },
    {
        id: 1,
        name: 'plant2',
        image: '../../images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablabla'
    },
    {
        id: 2,
        name: 'plant3',
        image: '../../images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablabla'
    },
    {
        id: 3,
        name: 'plant4',
        image: '../../images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablabla'
    }
    ,
    {
        id: 3,
        name: 'plant4',
        image: '../../images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablabla'
    }
    
]
=======
        
          id: 1,
          name: 'plant2',
          image: '../../images/BG2.jpg',
          description: 'Lorem Ipsum Dolor etc blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'
        },
        {
          id: 1,
          name: 'plant2',
          image: '../../images/BG2.jpg',
          description: 'Lorem Ipsum Dolor etc blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'
        },
        {
          id: 1,
          name: 'plant2',
          image: '../../images/BG2.jpg',
          description: 'Lorem Ipsum Dolor etc blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'
        },
        {
          id: 1,
          name: 'plant2',
          image: '../../images/BG2.jpg',
          description: 'Lorem Ipsum Dolor etc blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'
        },
        {
          id: 1,
          name: 'plant2',
          image: '../../images/BG2.jpg',
          description: 'Lorem Ipsum Dolor etc blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'
        },
      ]
>>>>>>> Stashed changes:client/src/pages/home/Home.js
    }
  }
  render() {
    return (
<<<<<<< Updated upstream:src/pages/home/Home.js
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
                    <Container fluid>
          <Row>
            {plants}
          </Row>
=======
      <div className="Home">
        <Jumbotron fluid className="Jimbo">
          <Container>
            <h1>BIO DIVERSITY</h1>
          </Container>
        </Jumbotron>
        <Container fluid>
          <Catalogue data = {this.state.plants}/>
>>>>>>> Stashed changes:client/src/pages/home/Home.js
        </Container>
      </div>
    );
  }
}

export default Home;