import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

export default class NewAuctionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ItemName: "",
            description: "",
            minPrice: ""
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
        // return (<RegisterForm onInput={this.onInput} inputs={this.state} createAuction={this.props.createAuction}/>);
        return (<Form> 
            <FormGroup>
                <Label for="ItemName">Item Name</Label>
                <Input name="ItemName" 
                id="ItemName" 
                placeholder="Enter a item name" 
                value={this.state.ItemName} 
                onChange={this.onInput}/>
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input name="description" id="description" placeholder="Enter description" value={this.state.description} 
                onChange={this.onInput} />
            </FormGroup>
            <FormGroup>
                <Label for="minPrice"> Minimum Price</Label>
                <Input name="minPrice" id="minPrice" placeholder="Enter a minimum price" value={this.state.minPrice} 
                onChange={this.onInput} />
            </FormGroup>
            <FormGroup>
                <Button color="primary" type = "submit" onClick={this.props.createAuction(this.state)}>Create Auction</Button>
            </FormGroup>
        </Form>);
    }
}
