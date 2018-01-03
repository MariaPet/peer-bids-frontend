import React, {Component} from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';

export default class FrontSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            postal_code: null,
            latitude: null,
            longitude: null
        };
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
            <div className="d-flex justify-content-center align-content-center">
                <div id='searchBox'>
                    <Form>
                        <FormGroup>
                            <Label for="title">What you're looking for?</Label>
                            <Input name="title" id="title" placeholder="eg. bike"
                            value={this.state.title} onChange={this.onInput} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="postal_code">Search by postal code</Label>
                            <Input name="postal_code" id="postal_code" placeholder="eg. SO14 0GE"
                            value={this.state.postal_code} onChange={this.onInput} />
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