import React, { Component } from 'react';
import './Searchresults.css';
import {Col, Container, Jumbotron, Row} from 'react-bootstrap';
import styled from 'styled-components';
import PlantItem from '../../components/PlantItem';
import { render } from '@testing-library/react';
import SearchResult from '../../components/SearchResult';
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


class Search extends Component{
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

	    ]
	}
    }

    render () {
//	let results = <SearchResult/>;

	let results = this.state.results.map(result => {
	    return (
		<SearchResult result={result}/>
	    )
	})
		return (
			<div className="SearchResults">
	    <div className="BG">
		<Styles>
		<Jumbotron className="jumbo"></Jumbotron>
	    <div className="Banner">
		BIO DIVERSITY
	    </div>
	    </Styles>
				</div>
			<div className="resultsSideContainer">
			<div className="CategoriesSide">
			<form action>
				<input type="checkbox" id="option1" name="option1" Value="1"/>
					<label for="option1"> Option 1 </label><br/>
				<input type="checkbox" id="option2" name="option2" Value="2"/>
					<label for="option2"> Option 2 </label><br/>
				<input type="checkbox" id="option3" name="option3" Value="3"/>
					<label for="option3"> Option 3 </label><br/><br/>
				<input type="submit" value="Submit"/>
					</form>
					</div>
	    <div className="Searchresult">
	    <Container fluid>
		<Row>
		    {results}
		</Row>
	    </Container>
					</div>
				</div>
	</div>

	);
    }
}
export default Search;
