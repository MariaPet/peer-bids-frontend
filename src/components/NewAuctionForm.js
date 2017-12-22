import React from 'react';
import Authorization from './Authorization'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
Form, FormGroup, Label, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import config from './config';

export default class NewAuctionForm extends Authorization {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.location.query.title,
            description: this.props.location.query.description,
            max_price: this.props.location.query.max_price,
            status: this.props.location.query.status,
            expiration_date: this.props.location.query.expiration_date,
            category: this.props.location.query.category,
            imageName: '',
            isUploading: false,
            progress: 0,
            imageURL: ''
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
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
      this.setState({isUploading: false});
      console.error(error);
    }
    handleUploadSuccess = (filename) => {
        this.setState({imageName: filename, progress: 100, isUploading: false});
        firebase.storage().ref('products').child(filename).getDownloadURL().then(imageURL => 
        this.setState({imageURL:[...this.state.imageURL, imageURL]}))
    };
    render() {
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
            <Label for="max_price">Maximum Price</Label>
            <InputGroup>
                <InputGroupAddon>$</InputGroupAddon>
                <Input  type="number" name = "max_price" id = "max_price" placeholder="Enter minimum price" step="1" value={this.state.max_price} 
                onChange={this.onInput}/>
            </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile">Upload Images</Label>
                <FileUploader
                    accept="image/*"
                    name="imageName"
                    multiple
                    storageRef={firebase.storage().ref('products')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                />
            </FormGroup>
            <FormGroup>
                {this.state.isUploading &&
                <p>Progress: {this.state.progress}</p>
                }
                {this.state.imageURL &&
                <div>
                <img src={this.state.imageURL} height="80" width="80"/>
                </div>
                }
            </FormGroup>
            <FormGroup>
            <Button color="primary" onClick={(e) => this.props.createAuction(this.state)}>Create Auction</Button>
            </FormGroup>
        </Form>);
    }
}