import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
Form, FormGroup, Label, InputGroup, InputGroupAddon, Input } from 'reactstrap';

export default class NewAuctionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ItemName: "",
            description: "",
            minPrice: "",
            status: "",
            expiryDate: "",
            category: ""
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
                <Label for="expiryDate">Expiration Date</Label>
                <Input type="date" name="expiryDate" id="expiryDate" placeholder="Enter Expireation Date" value={this.state.expiryDate} 
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
            <Label for="minPrice">Minimum Price</Label>
            <InputGroup>
                <InputGroupAddon>$</InputGroupAddon>
                <Input  type="number" name = "minPrice" id = "minPrice" placeholder="Enter minimum price" step="1" value={this.state.minPrice} 
                onChange={this.onInput}/>
            </InputGroup>
            </FormGroup>
            <Button color="primary" type = "submit" onClick={this.props.createAuction(this.state)}>Create Auction</Button>
          
        </Form>);
    }
}
// £