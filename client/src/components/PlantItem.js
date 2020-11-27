import React, { Component } from 'react';
import './PlantItem.css';

class PlantItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="courses-container">
                <div class="course">
                    <div class="image">
                    </div>
                    <div className="course-info">
                        <div className="time">2 days ago</div>
                        <div className="name">{this.props.plant.name}</div>
                        <div className="description">{this.props.plant.description}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlantItem

