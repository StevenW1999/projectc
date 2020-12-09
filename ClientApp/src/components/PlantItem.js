import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './PlantItem.css';
import { AiFillRightCircle } from "react-icons/ai";

class PlantItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div class="el-wrapper">
                    <div class="box-up">
                        <img class="img" src="images/plant1.png" alt="" />
                        <div class="img-info">
                            <div class="info-inner">
                                <span class="p-name">[NAAM]</span>
                                <span class="p-user">[GEBRUIKER]</span>
                            </div>
                            <div class="a-categories">Categorie: <span class="categories">[CATEGORIE]</span></div>
                        </div>
                    </div>
                    <div class="box-down">
                        <div class="h-bg">
                            <div class="h-bg-inner"></div>
                        </div>
                        <a class="bar" href="#">
                            <span class="detail"><AiFillRightCircle /></span>
                            <span class="view-detail">
                                <span class="txt">BEKIJK PLANT</span>
                            </span>
                        </a>
                    </div>
                </div>

            </>
        )
    }
}

export default PlantItem

