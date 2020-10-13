import React, { Component } from 'react';
import {Jumbotron, Button} from 'react-bootstrap';

class SearchResult extends Component {
    constructor(props) {
	super(props);
    }

    render() {
	return (
	    <div style={{"border-style":"solid"}, {"overflow":"hidden"}}>
	    <Jumbotron fluid style={{"padding":"1px"}}>

		<div style={{"border":"5px solid brown"},{"height":"0px"}, {"width":"750px"}}>
		</div>

		    <div style={{"width":"50"}, {"float":"left"}, {"overflow":"hidden"}, {"border":"1px solid"}}>
			<h2 style={{"text-align": "left"}, {"width":"400px"}}>   
			    {this.props.result.name}
			</h2>
		    </div>

		<div style={{"padding":"50px"},{"display":"block"},{"margin-top":"auto"},{"margin-bottom":"auto"},{"margin-left":"auto"},{"margin-right":"auto"},{"width":"100%"}, {"overflow":"hidden"}}>

		<div style={{"width":"300px"},{"float":"left"}}>
		<img src={this.props.result.image} style={{"width":"200px"}}/>

		</div>
		<div style={{"border":"solid"}, {"width":"75%"}}>
		    <p>{this.props.result.description}</p>
		</div>
		    <Button variant="primary"> Learn more </Button>
		</div>

		<p>
		</p>


	    </Jumbotron>
	   </div> 
	)
    }
}

export default SearchResult
