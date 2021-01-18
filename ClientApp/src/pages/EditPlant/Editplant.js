import React, { Component } from 'react';
import './Editplant.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import dateFormat from 'dateformat';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Image from 'react-bootstrap/Image';

const fileTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png"
];

function validFileType(file) {
    return fileTypes.includes(file.type);
}

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
                name: "",
                description: "",
                category: "",
                available: false,
                type: "",
                perennial: "",
                shadow: "",
                amountOfWater: "",
                soil: "",
                growthHeigth: "",
                color: "",
                seasonFrom: null,
                seasonTo: null,
                specialFeatures: "",
                timestamp: null,
                token: "",
                isAuthenticated: false

            }
            
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    _handleReaderLoaded = (readerEvt) => {
        let binaryString = readerEvt.target.result
        this.setState({
            file: btoa(binaryString)
        })
    }

    handleImage = (e) => {
        e.preventDefault();

        let file = e.target.files[0];
        let reader = new FileReader();

        if (e.target.files.length === 0) {
            return;
        }
        else {
            if (validFileType(file)) {
                reader.onloadend = (e) => {
                    let binaryString = e.target.result
                    this.setState({ Plant: { ...this.state.Plant, image: btoa(binaryString) } });
                }

                reader.readAsBinaryString(file)
            }
            else {
                alert("Bestand is ongeldig! Alleen foto's zijn toegestaan.")
            }
        }
    }

    handleInputChange(event) {
        event.stopPropagation()
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleOnChange = (selected) => {
        const stringSelected = selected.join(", ");
        this.setState({ Plant: { ...this.state.Plant, specialFeatures: stringSelected } });

        if (this.state.Plant.specialFeatures == "") {
            this.setState({ Plant: { ...this.state.Plant, specialFeatures: "Geen" } });
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        fetch('/api/plants/' + this.props.location.state.id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
            },
            body: JSON.stringify({
                'id': this.state.Plant.id,
                'userid': this.state.Plant.userId,
                'image': this.state.Plant.image,
                'name': this.state.name ? this.state.name : this.state.Plant.name,
                'description': this.state.description ? this.state.description : this.state.Plant.description,
                'available': true,
                'type': this.state.type ? this.state.type : this.state.Plant.type,
                'perennial': this.state.perennial,
                'shadow': this.state.shadow ? this.state.shadow : this.state.Plant.shadow,
                'amountofwater': this.state.amountOfWater ? this.state.amountOfWater : this.state.Plant.amountOfWater,
                'soil': this.state.soil ? this.state.soil : this.state.Plant.soil,
                'growthheigth': this.state.growthHeigth ? this.state.growthHeigth : this.state.Plant.growthHeigth,
                'color': this.state.color ? this.state.color : this.state.Plant.color,
                'seasonfrom': this.state.seasonFrom ? this.state.seasonFrom : this.state.Plant.seasonFrom,
                'seasonto': this.state.seasonTo ? this.state.seasonTo : this.state.Plant.seasonTo,
                'specialfeatures': this.state.Plant.specialFeatures ? this.state.Plant.specialFeatures : this.state.specialFeatures,
                'timestamp': this.state.timestamp ? this.state.timestamp : this.state.Plant.timestamp,
                'category': this.state.category ? this.state.category : this.state.Plant.category,
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
            })
        alert('Plant gewijzigd');
        window.location.href = "/";
    }

    componentDidMount() {
        fetch('/api/plants/' + this.props.location.state.id, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + sessionStorage.getItem('bearer')
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
        //const sfStr = this.state.Plant.specialFeatures;
        //const sfArr = sfStr.split(", ");
  return (
      <div className="Create">
          <h1>Maak een plantenruil aan</h1>
          <Form>
              <Form.Group controlId="TitleInput">
                  <Form.Label>Titel</Form.Label>
                  <Form.Control type="title" name="name" maxlength="200" placeholder="titel" onChange={this.handleInputChange} defaultValue={this.state.Plant.name} />
              </Form.Group>
              <Form.Group controlId="omschInput">
                  <Form.Label>Omschrijving</Form.Label>
                  <Form.Control as="textarea" rows={3} maxlength="200" name="description" type="description" placeholder="Omschrijving" onChange={this.handleInputChange} defaultValue={this.state.Plant.description} />
              </Form.Group>
              <Form.Group controlId="omschInput">
                  <Form.Label>Categorie</Form.Label>
                  <Form.Control as="select" name="category" type="category" value={this.state.Plant.category} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >Zaadjes</option>
                      <option >Zaailing</option>
                      <option >Stekje</option>
                      <option >Plant</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="Checkbox">
                  <Form.Check type="checkbox" name="Perennial" label="Is het een vaste plant?" checked={this.state.Plant.perennial} onChange={this.handleInputChange} />
              </Form.Group>
              <Form.Group controlId="TypeInput">
                  <Form.Label>Soort</Form.Label>
                  <Form.Control as="select" name="type" value={this.state.Plant.type} onChange={this.handleInputChange}>
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
                  <Form.Control as="select" name="shadow" value={this.state.Plant.shadow} onChange={this.handleInputChange}>
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
                  <Form.Control as="select" name="amountOfWater" value={this.state.Plant.amountOfWater} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option >Nat</option>
                      <option >Gemiddeld</option>
                      <option >Droog</option>
                      <option >Stelt geen eisen</option>
                      <option >Geen idee</option>
                  </Form.Control>
              </Form.Group>
              <Form.Group controlId="SoilInput">
                  <Form.Label>Grond stelt eisen, namelijk:</Form.Label>
                  <Form.Control type="soil" name="soil" maxlength="200" onChange={this.handleInputChange} value={this.state.Plant.soil}  />
              </Form.Group>
              <Form.Group controlId="HeightInput">
                  <Form.Label>Groeihoogte</Form.Label>
                  <Form.Control as="select" name="growthHeigth" value={this.state.Plant.growthHeigth} onChange={this.handleInputChange}>
                      <option> -- Kies een categorie -- </option>
                      <option defaultValue="0 - 20 cm">0 - 20 cm</option>
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
                  <Form.Control as="select" name="color" value={this.state.Plant.color} onChange={this.handleInputChange}>
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
                  <Form.Control as="select" name="seasonFrom" value={dateFormat(this.state.Plant.seasonTo, "yyyy-mm-dd")} onChange={this.handleInputChange}>
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
                  <Form.Control as="select" name="seasonTo" value={dateFormat(this.state.Plant.seasonTo, "yyyy-mm-dd")} onChange={this.handleInputChange}>
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
                      placeholder={this.state.Plant.specialFeatures}
                      //selected={this.state.Plant.specialFeatures}
                      name="SpecialFeatures" value={this.state.Plant.specialFeatures} handleOnChange={this.handleOnChange} />
              </Form.Group>
              <Form.Group controlId="ImageInput">
                  <Form.Label>Voeg een afbeelding toe</Form.Label><br></br>
                  <input type="file" name="Image" accept=".jpeg, .jpg, .png" onChange={this.handleImage} />
                  <p>Voorbeeld afbeelding:</p>
                  <Image className="Previmage" src={"data:file/png;base64," + this.state.Plant.image} />
              </Form.Group>
              <Button variant="primary" onClick={this.onSubmitHandler}>
                  Pas aan
              </Button>   
          </Form> 


    </div>
    );
}
}

export default Editplant;
