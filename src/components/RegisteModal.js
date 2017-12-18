import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

export default class RegisterModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <RegisterForm />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.toggleModal}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class RegisterForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Form>
                <Row>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input name="username" id="username" placeholder="Enter a username" />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Enter your email address" />
                        </FormGroup>
                        </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter a password" />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="street">Address</Label>
                            <Input name="street" id="street" placeholder="Enter your address number and street name" />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input name="city" id="city" placeholder="Enter your city" />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="postalCode">Postal Code</Label>
                            <Input name="postalCode" id="postalCode" placeholder="Enter your postal code" />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="telephone">Phone Number</Label>
                            <Input name="telephone" id="telephone" placeholder="Enter your phone number" />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        );
    }
}