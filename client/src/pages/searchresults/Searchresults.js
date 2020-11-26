import React, { Component } from 'react';
import './Searchresults.css';
import SearchResult from '../../components/SearchResult';
import PlantItem from '../../components/PlantItem';
import SearchCard from '../../components/SearchCard';

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
			<div className="Center">
				<div className="TopBar">
					<div className="TopBarBox">
						<input type="text" placeholder="Zoek..." class="btn-sm" >
						</input>
						<select name="categories" style={{ width: '250px', margin: '17px', padding: '2px' }} className="categoriesList">
								<option value="option 1">Option 1</option>
								<option value="option 1">Option 2</option>
								<option value="option 1">Option 3</option>
							</select>
						<input type="text" placeholder="Postcode..." style={{ width: '120px' }}></input>

						<button type="button" class="btn btn-primary btn-sm">Zoek!</button>
						</div>
                    </div>
				<div className="BelowCenter">
                    <br/>
                    <br />
					<div className="ParentDiv">
						<div className="CategoriesParent">
							<select name="categories"  className="categoriesList">
								<option value="option 1">Option 1</option>
								<option value="option 1">Option 2</option>
								<option value="option 1">Option 3</option>
							</select>
							<div className="categoriesTickboxes">
								<div className="TickboxesPadding">
                                    <input type="checkbox" id="Grote plant" name="Grote plant" value="Bike"/>
                                    <label for="Grote plant">Grote plant</label>
                                    <br/>
                                    <input type="checkbox" id="Kleine plant" name="Kleine plant" value="Bike"/>
                                    <label for="Kleine plant">Kleine plant</label>
                                    <br/>
                                    <input type="checkbox" id="Kleine schaduw" name="Kleine schaduw" value="Bike"/>
                                        <label for="Kleine schaduw">Kleine schaduw</label>
									</div>
								</div>
						</div>
						<div className="ItemsContainer">
							<div class="col-md-4">
								<SearchCard className="SearchCards" />
							</div>
							<div class="col-md-8">
								<SearchCard className="SearchCards" />
							</div>
						</div>
						</div>
				</div>
				</div>
        );
    }
}

export default Searchresults;