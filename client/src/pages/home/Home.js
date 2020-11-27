import React, { Component } from 'react';
import './Home.css';
import { Container, Jumbotron} from 'react-bootstrap';
import Catalogue from '../../components/Catalogue';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      plants: [{
        
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
    }
  }
  render() {
    return (
      <div className="Home">
        <Jumbotron fluid className="Jimbo">
          <Container>
            <h1>BIO DIVERSITY</h1>
          </Container>
        </Jumbotron>
        <Container fluid>
          <Catalogue data = {this.state.plants}/>
        </Container>
      </div>
    );
  }
}

export default Home;