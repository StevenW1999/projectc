import React, { Component } from 'react';
import './Editplant.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import dateFormat from 'dateformat';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

class Editplant extends Component{
    constructor(props) {
        super(props);
        this.state = {
            Plant: {
                file: '',
                imagePreviewUrl: '',
                Id: "",
                UserId: "",
                Image: null,
                Name: "",
                Description: "",
                Category: "",
                Available: false,
                Type: "",
                Perennial: "",
                Shadow: "",
                AmountOfWater: "",
                Soil: "",
                GrowthHeigth: "",
                Color: "",
                SeasonFrom: null,
                SeasonTo: null,
                SpecialFeatures: "",
                Timestamp: null,
                token: "",
                isAuthenticated: false
            }
            
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        fetch('/api/Plants' + this.props.location.state.id, {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('bearer ')
            },
            body: JSON.stringify({
                "Name": this.state.Name,
                "Description": this.state.Description,
                "Category": this.state.Category,
                "Available": this.state.Available,
                "Type": this.state.Type,
                "Perennial": this.state.Perennial,
                "Shadow": this.state.Shadow,
                "AmountOfWater": this.state.AmountOfWater,
                "Soil": this.state.Soil,
                "GrowthHeigth": this.state.GrowthHeigth,
                "Color": this.state.Color,
                "SeasonFrom": this.state.SeasonFrom,
                "SeasonTo": this.state.SeasonTo,
                "SpecialFeatures": this.state.SpecialFeatures
            })
        })

            .then(response => {
                const data = response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    if (response.status === 401) {
                        alert('gegevens onjuist, probeer het opnieuw!')
                    }
                    return Promise.reject(error);
                }
                console.log('Plant aangemaakt')
            })
        //.catch(error => { console.error('error: ', error) })
    }

    componentDidMount() {
        fetch('/api/plants/' + this.props.location.state.id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem('bearer')
            }
        })
            .then(response => { return response.json(); })
            .then(data => {
                this.setState({ "Plant": data });
            })
            .catch(err => {
                console.log("fetch error" + err);
            });
    }


    render() {
        var isvast = false;
        var isnietvast = false;
    if (this.state.Plant.perennial == "on") {
        isvast = true;
    }
    else {
        isnietvast = true;
    }
        var grondja = false;
        var grondnee = false;
        if (this.state.Plant.soil == "on") {
            grondja = true;
        }
        else {
            grondnee = true;
        }

  return (
      <div className="Create">
          <h1>Maak een plantenruil aan</h1>
          <Form>
              <Form.Group controlId="TitleInput">
                  <Form.Label>Titel</Form.Label>
                  <Form.Control type="Title" name="Name" placeholder="Titel" onChange={this.handleInputChange} value={this.state.Plant.name} />
              </Form.Group>
              <Form.Group controlId="omschInput">
                  <Form.Label>Omschrijving</Form.Label>
                  <Form.Control as="textarea" rows={3} name="Description" type="Description" placeholder="Omschrijving" onChange={this.handleInputChange} value={this.state.Plant.description} />
              </Form.Group>
              <Form.Group controlId="omschInput">
                  <Form.Label>Categorie</Form.Label>
                  <Form.Control as="select" name="Category" value={this.state.Plant.Category} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >Zaadjes</option>
                      <option >Zaailing</option>
                      <option >Stekje</option>
                      <option >Plant</option>
                  </Form.Control>
              </Form.Group>
              <fieldset>
                  <Form.Group as={Row}>
                      <Form.Label as="legend" column sm={2}>
                          Vaste plant?
                      </Form.Label>
                    <Col sm={10}>
                    <Form.Check
                        type="radio"
                        label="Ja"
                        name="Perennial"
                        checked = {isvast}
                        onChange={this.handleInputChange}
                    />
                    <Form.Check
                        type="radio"
                        label="Nee"
                        name="Perennial"
                        checked = {isnietvast}
                        onChange={this.handleInputChange}
                    />
                    </Col>
                  </Form.Group>
              </fieldset>
              <Form.Group controlId="TypeInput">
                  <Form.Label>Soort</Form.Label>
                  <Form.Control as="select" name="Type" value={this.state.Plant.type} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option>Bomen</option>
                      <option>Struiken</option>
                      <option>Kruidachtige</option>
                      <option>Bodemdekkers</option>
                      <option>Klimplanten</option>
                      <option>Vijverplanten</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="Shadowinput">
                  <Form.Label>Standplaats</Form.Label>
                  <Form.Control as="select" name="Shadow" value={this.state.Plant.shadow} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >Zon</option>
                      <option >Half schaduw</option>
                      <option >Schaduw</option>
                      <option >Stelt geen eisen</option>
                      <option >Geen idee</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="waterinput">
                  <Form.Label>Water</Form.Label>
                  <Form.Control as="select" name="AmountOfWater" value={this.state.Plant.amountOfWater} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >Nat</option>
                      <option >Gemiddeld</option>
                      <option >Droog</option>
                      <option >Stelt geen eisen</option>
                      <option >Geen idee</option>
                  </Form.Control>
              </Form.Group>
              <fieldset>
                  <Form.Group as={Row}>
                      <Form.Label as="legend" column sm={2}>
                          Grond stelt eisen:
                      </Form.Label>
                      <Col sm={10}>
                          <Form.Check
                              type="radio"
                              label="Ja"
                              name="Soil"
                              checked={grondja}
                              value={this.state.Soil}
                              onChange={this.handleInputChange}
                          />
                          <Form.Check
                              type="radio"
                              label="Nee"
                              name="Soil"
                              checked={grondnee}
                              value={this.state.Soil}
                              onChange={this.handleInputChange}
                          />
                      </Col>
                  </Form.Group>
              </fieldset>
              <Form.Group controlId="HeightInput">
                  <Form.Label>Groeihoogte</Form.Label>
                  <Form.Control as="select" name="GrowthHeigth" value={this.state.Plant.growthHeigth} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >0 - 20 cm</option>
                      <option >20 - 40 cm</option>
                      <option >40 - 70 cm</option>
                      <option >70 - 100 cm</option>
                      <option >100 - 120 cm</option>
                      <option >120 - 150 cm</option>
                      <option >1.5 - 2 m</option>
                      <option >hoger dan 2 m</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="ColorInput">
                  <Form.Label>Bloeikleur</Form.Label>
                  <Form.Control as="select" name="Color" value={this.state.Plant.color} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >Blauw</option>
                      <option >Geel</option>
                      <option >Oranje</option>
                      <option >Paars</option>
                      <option >Rood</option>
                      <option >Roze</option>
                      <option >Violetblauw</option>
                      <option >Wit</option>
                      <option >Zwart</option>
                      <option >anders</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="SeasonFromInput">
                  <Form.Label>Bloeimaand van:</Form.Label>
                  <Form.Control as="select" name="SeasonFrom" value={dateFormat(this.state.Plant.seasonTo, "yyyy-mm-dd")} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option value="2020-01-01">Januari</option>
                      <option value="2020-02-01">Februari</option>
                      <option value="2020-03-01">Maart</option>
                      <option value="2020-04-01">April</option>
                      <option value="2020-05-01">Mei</option>
                      <option value="2020-06-01">Juni</option>
                      <option value="2020-07-01">Juli</option>
                      <option value="2020-08-01">Augustus</option>
                      <option value="2020-09-01">September</option>
                      <option value="2020-10-01">Oktober</option>
                      <option value="2020-11-01">November</option>
                      <option value="2020-12-01">December</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="SeasonToInput">
                  <Form.Label>Bloeimaand tot:</Form.Label>
                  <Form.Control as="select" name="SeasonTo" value={dateFormat(this.state.Plant.seasonTo, "yyyy-mm-dd")} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option value="2020-01-01">Januari</option>
                      <option value="2020-02-01">Februari</option>
                      <option value="2020-03-01">Maart</option>
                      <option value="2020-04-01">April</option>
                      <option value="2020-05-01">Mei</option>
                      <option value="2020-06-01">Juni</option>
                      <option value="2020-07-01">Juli</option>
                      <option value="2020-08-01">Augustus</option>
                      <option value="2020-09-01">September</option>
                      <option value="2020-10-01">Oktober</option>
                      <option value="2020-11-01">November</option>
                      <option value="2020-12-01">December</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="SpecialFeaturesInput">
                  <Form.Label>Extra eigenschappen</Form.Label>
                  <DropdownMultiselect
                      options={["Geurend", "Eetbaar", "Giftig", "Trekt bijen aan", "Trekt hommels aan", "Trekt vlinders aan", "Trekt vogels aan"]}
                      name="SpecialFeatures" value={this.state.Plant.specialFeatures} onChange={this.handleInputChange} />
              </Form.Group>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Example file input" />
                </Form.Group>
              <Button variant="primary" type="submit" onClick={this.onSubmitHandler}>
                  Pas aan
              </Button>   
          </Form> 
          


    </div>
    );
}
}

export default Editplant;
