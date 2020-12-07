import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'


class ConfirmRemAcc extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Modal show={this.props.show} backdrop="static" keyboard={false}>
                    <Modal.Header>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        I will not close if you click outside me. Don't even try to press
                        escape key.
              </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary">
                            Close
                </Button>
                        <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}



export default ConfirmRemAcc;
