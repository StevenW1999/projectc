import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class SearchCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{ "border-style": "solid" }, { "overflow": "hidden" }}>
				<Card style={{ width: '18rem' }}>
					<Card.Img variant="top" src="holder.js/100px180"/>
					<Card.Body>
						<Card.Title>Kaart titel</Card.Title>
						<Card.Text>
					    </Card.Text>
						<Button variant="primary">Plant bekijken</Button>
					</Card.Body>
				</Card>
			</div>
		)
	}
}

export default SearchCard
