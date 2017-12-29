import React from 'react';
import Authorization from './Authorization'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
Form, FormGroup, Label, InputGroup, InputGroupAddon, Input, FormText, Row, Col } from 'reactstrap';

export default class NewAuctionForm extends Authorization {
    
    componentWillReceiveProps(newProps) {
        if (newProps.location.query) {
            this.setState(newProps.location.query);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            initial_price: "",
            status: "",
            expiration_date: "",
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
    getDateStrNow = () => {
        var dateToday = new Date()
        return (dateToday.getFullYear() + "-" + (dateToday.getMonth() + 1) + "-" + dateToday.getDate())
    }
    render() {
        // return (<RegisterForm onInput={this.onInput} inputs={this.state} createAuction={this.props.createAuction}/>);
        return (
        <Row>
            <Form>
                <Col>
                    <FormGroup>
                        <Label for="exampleFile">File</Label>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </FormGroup>
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
                        onChange={this.onInput} min= {this.getDateStrNow()}/>
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
                    <Label for="initial_price">Initial Price</Label>
                    <InputGroup>
                        <InputGroupAddon>$</InputGroupAddon>
                        <Input  type="number" name = "initial_price" id = "initial_price" placeholder="Enter the starting price" step="1" value={this.state.initial_price} 
                        onChange={this.onInput}/>
                    </InputGroup>
                    </FormGroup>
                    <Button color="primary" onClick={(e) => this.props.createAuction(this.state)}>Create Auction</Button>
                </Col>
            </Form>
        </Row>
        );
    }
}
