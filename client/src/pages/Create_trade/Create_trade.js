import React, { Component } from 'react';

class Create_trade extends Component{
render () {
    return (
      <div className="Create_trade">        
              <Jumbotron fluid className="Jimbo">
              <Container>
                <h1>Hello plant</h1>
            </Container>
              </Jumbotron>
                      <Container fluid>
            <Row>
              {plants}
            </Row>
          </Container>
      </div>
      );
  }
}

export default Create_trade;