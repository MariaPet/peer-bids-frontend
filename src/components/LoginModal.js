import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

export default class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
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
                <ModalHeader toggle={this.toggle}>SIGN IN</ModalHeader>
                <ModalBody>
                    <LoginForm onInput={this.onInput} inputs={this.state} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={this.props.loading} onClick={(e) => this.props.loginUser(this.state) } >Login</Button>{' '}
                    <Button color="secondary" disabled={this.props.loading} onClick={this.props.toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

class LoginForm extends Component {
    /*constructor(props) {
        super(props);
    }*/
    render() {
        return (
            <Form>
                <Row>
                    <Col sm="12">
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input name="email" id="email" type="email" value={this.props.inputs.email} onChange={this.props.onInput} /> 
                        </FormGroup>
                    </Col>
                    <Col sm="12">
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input name="password" id="password" type="password" value={this.props.inputs.password} onChange={this.props.onInput} /> 
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        );
    }
}