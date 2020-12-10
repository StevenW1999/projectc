import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './PlantItem.css';
import { AiFillRightCircle } from "react-icons/ai";

import { Link } from 'react-router-dom';


class PlantItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div class="el-wrapper">
                    <div class="box-up">
                        <img class="img" src={this.props.plant.image} alt="" />
                        <div class="img-info">
                            <div class="info-inner">
                                <span class="p-name">{this.props.plant.name}</span>
                                <span class="p-user">[user]</span>
                            </div>
                            <div class="a-categories">Categorie: <span class="categories">{this.props.plant.type}</span></div>
                        </div>
                    </div>
                    <div class="box-down">
                        <div class="h-bg">
                            <div class="h-bg-inner"></div>
                        </div>
                        <a class="bar">
                            <span class="detail"><AiFillRightCircle /></span>
                            <span class="view-detail">
                                
                                <Link class="txt" to={{
                                    pathname: '/productpage', state: {
                                        id: this.props.plant.id,
                                        water: this.props.plant.amountofwater,
                                        title: this.props.plant.name,
                                        description: this.props.plant.description,
                                        type: this.props.plant.type,
                                        shadow: this.props.plant.shadow,
                                        soil: this.props.plant.soil,
                                        height: this.props.plant.growthheigth,
                                        color: this.props.plant.color,
                                        special: this.props.plant.specialfeatures,
                                        seasonfrom: this.props.plant.seasonfrom,
                                        seasonto: this.props.plant.seasonto,
                                        timestamp: this.props.plant.timestamp,
                                    }
                                }}>BEKIJK PLANT</Link>
                            </span>
                        </a>
                    </div>
                </div>

            </>
        )
    }
}

export default PlantItem

