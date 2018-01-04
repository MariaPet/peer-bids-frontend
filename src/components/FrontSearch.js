import React, {Component} from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
export default class FrontSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            postal_code: "",
            latitude: null,
            longitude: null
        };
        this.onAddressInput = this.onAddressInput.bind(this);
        this.onInput = this.onInput.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    onInput = e => {
        let key = e.target.name;
        let value = e.target.value;
        let newState = {};
        newState[key] = value;
        this.setState(newState);
    };
    onAddressInput = address => {
        this.setState({postal_code: address});
    };
    handleSelect = (address, placeId) => {
        geocodeByAddress(address)
        .then(results => {
            getLatLng(results[0]).then((data) => {
                if(data.lat && data.lng) {
                    this.setState({
                        latitude: data.lat,
                        longitude: data.lng
                    });
                }
            });
        });
    };
    render() {
        return (
            <div className="d-flex justify-content-center align-content-center">
                <div id='searchBox'>
                    <Form>
                        <FormGroup>
                            <Label for="title">What you're looking for?</Label>
                            <Input name="title" id="title_search" placeholder="eg. bike"
                            value={this.state.title} onChange={this.onInput} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="postal_code">Search by postal code</Label>
                            <PlacesAutocomplete inputProps={{value: this.state.postal_code,
                                onChange: this.onAddressInput, 
                                placeholder: "eg. SO14 0GE"}}
                                classNames={{autocompleteContainer: "pac-container"}}
                                onSelect={this.handleSelect} name="postal_code" id="postal_code_search" />
                            {/* <Input name="postal_code" id="postal_code_search" placeholder="eg. SO14 0GE"
                            value={this.state.postal_code} onChange={this.onInput} /> */}
                        </FormGroup>
                    </Form>
                    <Button onClick={(e) => this.props.onSearch({
                        title: this.state.title,
                        latitude: this.state.latitude,
                        longitude: this.state.longitude})}>
                        Search
                    </Button>
                </div>
            </div>
        );
    }
}