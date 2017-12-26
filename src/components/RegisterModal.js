import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
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
            searchInput: ""
        }
        this.onInput = this.onInput.bind(this);
        this.onAddressInput = this.onAddressInput.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    onInput = e => {
        let key = e.target.name;
        let value = e.target.value;
        var newInputs = {...this.state.inputs};
        newInputs[key] = value;
        this.setState({inputs: newInputs});
    }
    onAddressInput = address => {
        this.setState({searchInput: address});
    }
    handleSelect = (address, placeId) => {
        geocodeByAddress(address)
        .then(results => {
            getLatLng(results[0]).then((data) => {
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
                    <RegisterForm onInput={this.onInput} 
                    onAddressInput={this.onAddressInput} 
                    handleSelect={this.handleSelect} inputs={this.state.inputs} searchInput={this.state.searchInput}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={this.props.loading} onClick={(e) => this.props.registerUser(this.state.inputs)}>Register</Button>{' '}
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
                    <Col sm="12" md="12">
                        <FormGroup>
                            <Label for="searchInput">Search Address</Label>
                            <PlacesAutocomplete inputProps={{value: this.props.searchInput,
                                onChange: this.props.onAddressInput, 
                                placeholder: "Search your address"}}
                                classNames={{autocompleteContainer: "pac-container"}}
                                onSelect={this.props.handleSelect} name="searchInput" id="searchInput" />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="street">Street</Label>
                            <Input disabled name="street" id="street" value={this.props.inputs.street} />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input disabled name="city" id="city" value={this.props.inputs.city} />
                        </FormGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <FormGroup>
                            <Label for="postal_code">Postal Code</Label>
                            <Input disabled name="postal_code" id="postal_code" value={this.props.inputs.postal_code} />
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