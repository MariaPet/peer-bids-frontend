import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

export default class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            street: "",
            city: "",
            postal_code: "",
            telephone: ""
        }
        this.onInput = this.onInput.bind(this);
    }
    onInput = e => {
        let key = e.target.name;
        let value = e.target.value;
        let newState = {};
        newState[key] = value;
        this.setState(newState);
    }
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>REGISTER</ModalHeader>
                <ModalBody>
                    <RegisterForm onInput={this.onInput} inputs={this.state}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={this.props.loading} onClick={(e) => this.props.registerUser(this.state)}>Register</Button>{' '}
                    <Button color="secondary" disabled={this.props.loading} onClick={this.props.toggleModal}>Cancel</Button>
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
                            <Input name="username" 
                            id="username" 
                            placeholder="Enter a username" 
                            value={this.props.inputs.username} 
                            onChange={this.props.onInput}/>
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Enter your email address" value={this.props.inputs.email} 
                            onChange={this.props.onInput} />
                        </FormGroup>
                        </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter a password" value={this.props.inputs.password} 
                            onChange={this.props.onInput} />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="confirm_password">Confirm Password</Label>
                            <Input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm your password" value={this.props.inputs.confirm_password} 
                            onChange={this.props.onInput} />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="street">Address</Label>
                            <Input name="street" id="street" placeholder="Enter your address number and street name" value={this.props.inputs.street} 
                            onChange={this.props.onInput} />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input name="city" id="city" placeholder="Enter your city" value={this.props.inputs.city} 
                            onChange={this.props.onInput} />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="postal_code">Postal Code</Label>
                            <Input name="postal_code" id="postal_code" placeholder="Enter your postal code" value={this.props.inputs.postal_code} 
                            onChange={this.props.onInput} />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="telephone">Phone Number</Label>
                            <Input name="telephone" id="telephone" placeholder="Enter your phone number" value={this.props.inputs.telephone} 
                            onChange={this.props.onInput} />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        );
    }
}