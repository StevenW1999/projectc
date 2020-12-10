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

//const translations = {
//    'en': {
//        'title': 'BIO DIVERSITY',
//        'description': 'Nature friendly trading',
//        'signup': 'SIGN UP NOW',
//        'addplant': 'Add plant',
//    },
//    'nl': {
//        'title': 'BIO DIVERSITEIT',
//        'description': 'Natuur vriendelijk ruilen',
//        'signup': 'NU REGISTREREN',
//    },
//}

//const getTranslation = (lang, text) => {
//    return translations[lang][text];
//}

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

    //state = {
    //    lang: 'en'
    //};

    //changeLanguageHandler = (lang) => {
    //    this.setState({ lang: lang });
    //}

  render() {
    return (
      <>
        <BannerContainer>
          <BannerContent>
            <BannerItems>
                        <BannerH1>BIO DIVERSITEIT</BannerH1>
                        <BannerP>Natuur vriendelijk ruilen</BannerP>
              <BannerBtn>
                <Link to="/signup">NU REGISTREREN</Link>
              </BannerBtn>
            </BannerItems>
          </BannerContent>
        </BannerContainer>
        <div className ="searchBar">
          <h1>Catalogus</h1>
        </div>
          <Catalogue data={this.state.plants}></Catalogue>
      </>
    );
  }
}


export default Home;