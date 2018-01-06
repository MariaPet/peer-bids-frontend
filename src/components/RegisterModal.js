import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
Form, FormGroup, Label, Input, FormFeedback, Row, Col } from 'reactstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export default class RegisterModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                username: "",
                email: "",
                password: "",
                confirm_password: "",
                street: "",
                streetNo: "",
                city: "",
                postal_code: "",
                latitude: "",
                longitude: "",
                telephone: ""
            },
            usernameError: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError: "",
            addressError: "",
            searchInput: ""
        }
        this.onInput = this.onInput.bind(this);
        this.onAddressInput = this.onAddressInput.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.validate = this.validate.bind(this);
    }
    validate() {
        var errors = false;
        if (!this.state.inputs.username) {
            this.setState({usernameError: "Username is required"});
            errors = true;
        }
        var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if (!this.state.inputs.email) {
            this.setState({emailError: "Email address is required"});
            errors = true;
        }
        else if (!email_regex.test(this.state.inputs.email)) {
            this.setState({emailError: "Email address is not valid"});
            errors = true;
        }
        if (!this.state.inputs.password) {
            this.setState({passwordError: "Password is required"});
            errors = true;
        }
        else if (this.state.inputs.password.length < 6) {
            this.setState({passwordError: "Password must be atleast 6 digits long"});
            errors = true;
        }
        if (this.state.inputs.password !== this.state.inputs.confirm_password) {
            this.setState({confirmPasswordError: "Passwords do not match"});
            errors = true;
        }
        if (!this.state.inputs.latitude || !this.state.inputs.longitude) {
            this.setState({addressError: "Address coordinates are missing. Please select a valid address."});
            errors = true;
        }
        if (!errors) {
            this.props.registerUser(this.state.inputs);
        }
    }

    onInput = e => {
        let key = e.target.name;
        switch(key) {
            case 'password':
            this.setState({passwordError: ""});
            case 'confirm_password':
            this.setState({confirmPasswordError: ""});
            case 'email':
            this.setState({emailError: ""})
            case 'username':
            this.setState({usernameError: ""})
        }
        
        let value = e.target.value;
        var newInputs = {...this.state.inputs};
        newInputs[key] = value;
        this.setState({inputs: newInputs});
    }
    onAddressInput = address => {
        this.setState({searchInput: address, addressError: ""});
    }
    handleSelect = (address, placeId) => {
        geocodeByAddress(address)
        .then(results => {
            getLatLng(results[0]).then((data) => {
                //TODO check if there are cases without lat lng
                var newInputs = {...this.state.inputs};
                newInputs.latitude = data.lat;
                newInputs.longitude = data.lng;
                this.setState({inputs: newInputs});
            });
            Array.prototype.forEach.call(results[0].address_components, element => {
                if (element.types.includes("postal_code")) {
                    var newInputs = {...this.state.inputs};
                    newInputs.postal_code = element.long_name
                    this.setState({inputs: newInputs});
                }
                else if (element.types.includes("postal_town")) {
                    var newInputs = {...this.state.inputs};
                    newInputs.city = element.long_name;
                    this.setState({inputs: newInputs});
                }
                else if (element.types.includes("route")) {
                    var newInputs = {...this.state.inputs};
                    newInputs.street = element.long_name;
                    this.setState({inputs: newInputs});
                }
                else if (element.types.includes("street_number")) {
                    var newInputs = {...this.state.inputs};
                    newInputs.streetNo = element.long_name;
                    this.setState({inputs: newInputs});
                }
            });
            var newInputs = {...this.state.inputs};
            newInputs.street = newInputs.streetNo + " " + newInputs.street;
            this.setState({inputs: newInputs});
        })
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error))
    }
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>REGISTER</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col sm="12" md="6">
                                <FormGroup className="has-danger">
                                    <Label for="username">Username</Label>
                                    {this.state.usernameError?
                                    <Input valid={false} className="form-control-danger" name="username" id="username" placeholder="Enter a username" value={this.state.inputs.username} onChange={this.onInput}/>
                                    :<Input className="form-control-danger" name="username" id="username" placeholder="Enter a username" value={this.state.inputs.username} onChange={this.onInput}/>
                                    }
                                    <FormFeedback>{this.state.usernameError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col sm="12" md="6">
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    {this.state.emailError?
                                    <Input valid={false} type="email" name="email" id="email" placeholder="Enter your email address" value={this.state.inputs.email} 
                                    onChange={this.onInput} />
                                    :<Input type="email" name="email" id="email" placeholder="Enter your email address" value={this.state.inputs.email} 
                                    onChange={this.onInput} />}
                                    <FormFeedback>{this.state.emailError}</FormFeedback>
                                </FormGroup>
                                </Col>
                            <Col sm="12" md="6">
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    {this.state.passwordError?
                                    <Input valid={false} type="password" name="password" id="password" placeholder="Enter a password" value={this.state.inputs.password} 
                                    onChange={this.onInput} />
                                    :<Input type="password" name="password" id="password" placeholder="Enter a password" value={this.state.inputs.password} 
                                    onChange={this.onInput} />}
                                    <FormFeedback>{this.state.passwordError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col sm="12" md="6">
                                <FormGroup>
                                    <Label for="confirm_password">Confirm Password</Label>
                                    {this.state.confirmPasswordError?
                                    <Input valid={false} type="password" name="confirm_password" id="confirm_password" placeholder="Confirm your password" value={this.state.inputs.confirm_password} 
                                    onChange={this.onInput} />
                                    :<Input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm your password" value={this.state.inputs.confirm_password} 
                                    onChange={this.onInput} />}
                                    <FormFeedback>{this.state.confirmPasswordError}</FormFeedback>
                                </FormGroup>
                            </Col>
                            <Col sm="12" md="12">
                                <FormGroup>
                                    <Label for="searchInput">Search Address</Label>
                                    <PlacesAutocomplete inputProps={{value: this.state.searchInput,
                                        onChange: this.onAddressInput, 
                                        placeholder: "Search your address"}}
                                        classNames={{autocompleteContainer: "pac-container", input: 'form-control'}}
                                        onSelect={this.handleSelect} name="searchInput" id="searchInput" />
                                    <span style={{color: "#dc3545", fontSize: "small"}}>{this.state.addressError? this.state.addressError: ''}</span>
                                </FormGroup>
                            </Col>
                            <Col sm="12" md="6">
                                <FormGroup>
                                    <Label for="street">Street</Label>
                                    <Input disabled name="street" id="street" value={this.state.inputs.street} />
                                </FormGroup>
                            </Col>
                            <Col sm="12" md="6">
                                <FormGroup>
                                    <Label for="city">City</Label>
                                    <Input disabled name="city" id="city" value={this.state.inputs.city} />
                                </FormGroup>
                            </Col>
                            <Col sm="12" md="6">
                                <FormGroup>
                                    <Label for="postal_code">Postal Code</Label>
                                    <Input disabled name="postal_code" id="postal_code" value={this.state.inputs.postal_code} />
                                </FormGroup>
                            </Col>
                            <Col sm="12" md="6">
                                <FormGroup>
                                    <Label for="telephone">Phone Number</Label>
                                    <Input name="telephone" id="telephone" placeholder="Enter your phone number" value={this.state.inputs.telephone} 
                                    onChange={this.onInput} />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={this.props.loading} onClick={this.validate}>Register</Button>{' '}
                    <Button color="secondary" disabled={this.props.loading} onClick={this.props.toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}