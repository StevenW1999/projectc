import React, { Component, useState } from 'react';
import Catalogue from '../../components/Catalogue';
import './Home.css';

import {
  BannerContainer,
  BannerContent,
  BannerItems,
  BannerH1,
  BannerP,
  BannerBtn
} from '../../components/Banner';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      plants: [{

        id: 10,
        name: 'plant1',
        image: '../../images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'
      },
      {
        id: 11,
        name: 'plant2',
        image: '../../images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'
      },
      {
        id: 12,
        name: 'plant3',
        image: '../../images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'
      },
      {
        id: 13,
        name: 'plant4',
        image: '../../images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'
      },
      {
        id: 4,
        name: 'plant5',
        image: '../../images/BG2.jpg',
        description: 'Lorem Ipsum Dolor etc blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'
      },
      ]
    }
  }

  render() {
    return (
      <>
        <BannerContainer>
          <BannerContent>
            <BannerItems>
              <BannerH1>BIO DIVERSITY</BannerH1>
              <BannerP>Nature friendly trading bla bla bla</BannerP>
              <BannerBtn>
                <Link to="/signup">SIGN UP NOW</Link>
              </BannerBtn>
            </BannerItems>
          </BannerContent>
        </BannerContainer>
        <div className ="searchBar">
          <h1>Catalogue</h1>
        </div>
          <Catalogue data={this.state.plants}></Catalogue>
      </>
    );
  }
}


export default Home;