import React, { Component } from 'react';
import './Searchresults.css';
import SearchResult from '../../components/SearchResult';
import PlantItem from '../../components/PlantItem';
import SearchCard from '../../components/SearchCard';
import Catalogue from '../../components/Catalogue';

class Searchresults extends Component{
    constructor(){
	super();
        this.state = {
			results: [
				{
					id: 1,
					name: 'Psilocybe Cubensis',
					image: './images/BG2.jpg',
					description: 'De Psilocybe cubensis is een soort van de psychedelische paddenstoelen, dat betekent dat de aanwezige stoffen euforie, visuele hallucinaties en algemene veranderingen in perceptie veroorzaken.'
				},
				{
					id: 2,
					name: 'Hawaiian Baby Woodrose',
					image: './images/BG2.jpg',
					description: 'lorem memes'
				},
				{
					id: 3,
					name: 'result2',
					image: './images/BG2.jpg',
					description: 'lorem memes'
				}

			],
        plants: [{

            id: 0,
            name: 'plant1',
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
            id: 2,
            name: 'plant3',
            image: '../../images/BG2.jpg',
            description: 'Lorem Ipsum Dolor etc blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla'
        },
        {
            id: 3,
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
        let results = this.state.results.map(result => {
            return (
                <SearchResult result={result} />
            )
		})

		return (
            <>
                <div>
                    </div>
                    <Catalogue data={this.state.plants}></Catalogue>
				</>
        );
    }
}

export default Searchresults;