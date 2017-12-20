import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
Form, FormGroup, Label, InputGroup, InputGroupAddon, Input } from 'reactstrap';

export default class NewAuctionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.location.query.title,
            description: this.props.location.query.description,
            max_price: this.props.location.query.max_price,
            status: this.props.location.query.status,
            expiration_date: this.props.location.query.expiration_date,
            category: this.props.location.query.category
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
                <Label for="title">Item Name</Label>
                <Input name="title" 
                id="title" 
                placeholder="Enter a item name" 
                value={this.state.title} 
                onChange={this.onInput}/>
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" placeholder="Enter description" value={this.state.description} 
                onChange={this.onInput} />
            </FormGroup>
            <FormGroup>
                <Label for="status">Status</Label>
                <Input name="status" id="status" placeholder="Enter Status" value={this.state.status} 
                onChange={this.onInput} />
            </FormGroup>
            {/* <FormGroup>
                <Label for="minPrice"> Minimum Price</Label>
                <Input name="minPrice" id="minPrice" placeholder="Enter a minimum price" value={this.state.minPrice} 
                onChange={this.onInput} />
            </FormGroup> */}
            <FormGroup>
                <Label for="expiration_date">Expiration Date</Label>
                <Input type="date" name="expiration_date" id="expiration_date" placeholder="Enter Expireation Date" value={this.state.expiration_date} 
                onChange={this.onInput}/>
            </FormGroup>
            <FormGroup>
                <Label for="category">Category</Label>
                <Input type="select" name="category" id="category" placeholder="Enter category">
                <option>Default Select</option>
                <option>Default Select1</option>
                <option>Default Select2</option>
                </Input>
            </FormGroup>
            <FormGroup>
            <Label for="max_price">Maximum Price</Label>
            <InputGroup>
                <InputGroupAddon>$</InputGroupAddon>
                <Input  type="number" name = "max_price" id = "max_price" placeholder="Enter minimum price" step="1" value={this.state.max_price} 
                onChange={this.onInput}/>
            </InputGroup>
            </FormGroup>
            <Button color="primary" onClick={(e) => this.props.createAuction(this.state)}>Create Auction</Button>
          
        </Form>);
    }
}
// £