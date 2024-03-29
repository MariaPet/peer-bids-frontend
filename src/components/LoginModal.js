import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormFeedback, Row, Col } from 'reactstrap';

export default class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.onInput = this.onInput.bind(this);
    }

    onInput = e => {
        let key = e.target.name;
        let value = e.target.value;
        let newState = {};
        newState[key] = value;
        this.setState(newState);
    };

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>SIGN IN</ModalHeader>
                <ModalBody>
                    <LoginForm onInput={this.onInput} inputs={this.state} errorMessage = {this.props.errorMessage} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={this.props.loading} onClick={(e) => this.props.loginUser(this.state) } >Login</Button>{' '}
                    <Button color="secondary" disabled={this.props.loading} onClick={ this.props.toggleModal }>Cancel</Button>
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
                            {this.props.errorMessage ? 
                            <Input valid={false} name="email" id="email" type="email" value={this.props.inputs.email} onChange={this.props.onInput} />
                            : 
                            <Input name="email" id="email" type="email" value={this.props.inputs.email} onChange={this.props.onInput} />
                            }
                            <FormFeedback>Check your email address and try again</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col sm="12">
                        <FormGroup>
                            <Label for="password">Password</Label>
                            {this.props.errorMessage ? 
                            <Input valid={false} name="password" id="password" type="password" value={this.props.inputs.password} onChange={this.props.onInput} />
                            : 
                            <Input name="password" id="password" type="password" value={this.props.inputs.password} onChange={this.props.onInput} />
                            }
                            <FormFeedback>Check your password and try again</FormFeedback> 
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        );
    }
}