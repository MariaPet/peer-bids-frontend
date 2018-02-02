import React from 'react';
import Authorization from './Authorization'
import { Container, FormFeedback, Button, Form, FormGroup, Label, InputGroup, InputGroupAddon, Input, Row, Col } from 'reactstrap';
import ImageUploader from 'react-images-upload';


export default class NewAuctionForm extends Authorization {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            title: "",
            description: "",
            initial_price: "",
            status: "",
            expiration_date: "",
            category: "",
            picturesError: "",
            titleError: "",
            descriptionError: "",
            initialPriceError: "",
            statusError: "",
            expirationError: "",
            categoryError: "",
        };
        this.onInput = this.onInput.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.validate = this.validate.bind(this);
    }
    validate() {
        var errors = false;
        if(this.state.pictures.length < 1) {
            this.setState({picturesError: "You need to select at least 1 image of the product"});
            errors = true;
        }
        if(!this.state.title) {
            this.setState({titleError: "title is required"});
            errors = true;
        }
        if(!this.state.description) {
            this.setState({descriptionError: "description is required"});
            errors = true;
        }
        if(!this.state.initial_price) {
            this.setState({initialPriceError: "initial price is required"});
            errors = true;
        }
        if(!this.state.status) {
            this.setState({statusError: "status is required"});
            errors = true;
        }
        if(!this.state.expiration_date) {
            this.setState({expirationError: "Expiration date is required"});
            errors = true;
        }
        if(!this.state.category) {
            this.setState({categoryError: "category is required"});
            errors = true;
        }
        console.log("here we are", errors, this.state)
        console.log(this)
        if (!errors) {
            this.props.createAuction({
                pictures: this.state.pictures,
                title: this.state.title,
                description: this.state.description,
                initial_price: this.state.initial_price,
                status: this.state.status,
                expiration_date: this.state.expiration_date,
                category: this.state.category
            })
        }
    }
    onDrop = (image) => {
        console.log(image)
        this.setState({
            pictures: [...image],
            picturesError: ""
        });
    }
    
    onInput = e => {
        let key = e.target.name;
        switch(key) {
            case 'title':
            this.setState({titleError: ""});
            break;
            case 'description':
            this.setState({descriptionError: ""});
            break;
            case 'initial_price':
            this.setState({initialPriceError: ""});
            break;
            case 'status':
            this.setState({statusError: ""});
            break;
            case 'expiration_date':
            this.setState({expirationError: ""});
            break;
            case 'category':
            this.setState({categoryError: ""});
            break;
        }
        let value = e.target.value;
        let newState = {};
        newState[key] = value;
        this.setState(newState);
    }
    getDateStrNow = () => {
        var dateToday = new Date()
        return (dateToday.getFullYear() + "-" + (dateToday.getMonth() + 1) + "-" + dateToday.getDate())
    }
    componentWillReceiveProps(newProps) {
        if (newProps.location.query) {
            this.setState(newProps.location.query);
        }
    }
    render() {
        return (
        <Container className="w-75">
        <Row>
            <Col sm="12" className="d-flex justify-content-center ">
                <div className="w-75">
                <ImageUploader 
                    withPreview={false}
                    withIcon={false}
                    buttonText='Select product pics'
                    onChange={(file) => this.onDrop(file)}
                    imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                    maxFileSize={5242880}
                    label=""
                    className="w-50"
                />
                <span style={{color: "#dc3545", fontSize: "small"}}>{this.state.picturesError? this.state.picturesError: ""}</span>
                </div>
                
            </Col>
        </Row>
        <Row>
            <Col xs="12" md="6" className="d-flex justify-content-center">
                <FormGroup className="w-75">
                    <Label for="title">Item Name</Label>
                    {this.state.titleError? 
                        <Input name="title" valid={false} id="title" placeholder="Enter a item name" 
                        value={this.state.title} onChange={this.onInput}/>
                    :
                        <Input name="title" id="title" placeholder="Enter a item name" 
                        value={this.state.title} onChange={this.onInput}/>
                    }
                    <FormFeedback>{this.state.titleError}</FormFeedback>
                </FormGroup>
            </Col>
            <Col xs="12" md="6" className="d-flex justify-content-center">
                <FormGroup className="w-75">
                    <Label for="description">Description</Label>
                    {this.state.descriptionError? 
                        <Input valid={false} type="textarea" name="description" id="description" 
                        placeholder="Enter description" value={this.state.description} onChange={this.onInput} />
                    :
                        <Input type="textarea" name="description" id="description" placeholder="Enter description" value={this.state.description} 
                        onChange={this.onInput} />
                    }
                    <FormFeedback>{this.state.descriptionError}</FormFeedback>
                </FormGroup>
            </Col>
            <Col xs="12" md="6" className="d-flex justify-content-center">
                <FormGroup className="w-75">
                    <Label for="status">Status</Label>
                    {this.state.statusError?
                        <Input valid={false} type="select" name="status" id="status"
                        placeholder="Enter Status" value={this.state.status} 
                        onChange={this.onInput} >
                            <option></option>
                            <option>New</option>
                            <option>Used</option>
                        </Input>
                    :
                        <Input type="select" name="status" id="status" placeholder="Enter Status" 
                        value={this.state.status} onChange={this.onInput} >
                            <option></option>
                            <option>New</option>
                            <option>Used</option>
                        </Input>
                    }
                    <FormFeedback>{this.state.statusError}</FormFeedback>
                </FormGroup>
            </Col>
            <Col xs="12" md="6" className="d-flex justify-content-center">
                <FormGroup className="w-75">
                    <Label for="expiration_date">Expiration Date</Label>
                    {this.state.expirationError?
                        <Input valid={false} type="date" name="expiration_date" id="expiration_date" 
                        placeholder="Enter Expireation Date" value={this.state.expiration_date} 
                        onChange={this.onInput} min= {this.getDateStrNow()}/>
                    :
                        <Input type="date" name="expiration_date" id="expiration_date" 
                        placeholder="Enter Expireation Date" value={this.state.expiration_date} 
                        onChange={this.onInput} min= {this.getDateStrNow()}/>
                    }
                    <FormFeedback>{this.state.expirationError}</FormFeedback>
                </FormGroup>
            </Col>
            <Col xs="12" md="6" className="d-flex justify-content-center">
                <FormGroup className="w-75">
                    <Label for="category">Category</Label>
                    {this.state.categoryError?
                        <Input valid={false} type="select" name="category" id="category" 
                        placeholder="Enter category" value={this.state.category} onChange={this.onInput}>
                            <option></option>
                            <option>Other</option>
                            <option>Vehicles</option>
                            <option>Furniture</option>
                            <option>Accessories</option>
                            <option>Electronics</option>
                            <option>Clothing</option>
                            <option>Sports</option>
                            <option>Entertainment</option>
                        </Input>
                    :
                        <Input type="select" name="category" id="category" placeholder="Enter category" 
                        value={this.state.category} onChange={this.onInput}>
                            <option></option>
                            <option>Other</option>
                            <option>Vehicles</option>
                            <option>Furniture</option>
                            <option>Accessories</option>
                            <option>Electronics</option>
                            <option>Clothing</option>
                            <option>Sports</option>
                            <option>Entertainment</option>
                        </Input>
                    }
                    <FormFeedback>{this.state.categoryError}</FormFeedback>
                </FormGroup>
            </Col>
            <Col xs="12" md="6" className="d-flex justify-content-center">
                <FormGroup className="w-75">
                    <Label for="initial_price">Initial Price</Label>
                    <InputGroup>
                        <InputGroupAddon>£</InputGroupAddon>
                        {this.state.initialPriceError?
                            <Input valid={false} type="number" name = "initial_price" id = "initial_price" 
                            placeholder="Enter the starting price" step="1" value={this.state.initial_price} 
                            onChange={this.onInput}/>
                        :
                            <Input  type="number" name = "initial_price" id = "initial_price" 
                            placeholder="Enter the starting price" step="1" value={this.state.initial_price} 
                            onChange={this.onInput}/>
                        }
                    </InputGroup>
                    <div style={{color: "#dc3545", fontSize: "small"}}>{this.state.initialPriceError}</div>
                </FormGroup>
            </Col>
            <Col sm="12" className="d-flex justify-content-center py-4">
                <Button color="primary" onClick={this.validate} disabled={this.props.loading}>Create Auction</Button>
            </Col>
        
         </Row>
         </Container>
        );
    }
}
