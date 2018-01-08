import React, { Component } from 'react'
import Authorization from './Authorization'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardText
} from 'reactstrap'
import ImageUploader from 'react-images-upload';
import noUserImage from '../img/no-user-image.gif';
import '../styles/user.css';

export default class UserProfile extends Authorization {
    constructor(props) {
        super(props);
        this.state = {
            tab: "Bids",
            picture: null
        };
        this.onDrop = this.onDrop.bind(this);
        this.header_image =  this.props.currentUser.profileImg ? this.props.currentUser.profileImg : noUserImage;
    }
//when user uploads new profile image, set the picture to state and hide the preview of the image
    onDrop = picture => {        
        this.state['picture'] = picture[0];
        this.props.uploadImage(this.state);
        this.hidePreview();
    };
//hide the image preview. This preview is realised automatically by the ImageUploader component
    hidePreview = ()=>{
        const uploader = document.getElementById("profilePhoto");
        const preview = uploader.getElementsByClassName("uploadPicturesWrapper");
        for(let i = 0; i< preview.length; i++){
            preview[i].style.display="none";
        }
    }
    render() {
        return (
            <Row>
                <Col xs="12" md="12" className="d-flex flex-column align-items-center py-4" >
                    <div className=" profile-header" style={{backgroundImage: "url(" + this.header_image + ")"}}>
                    </div>
                    <div className="image-username">                    
                        <img className="profile-image" style={{width: "250px", "height": "250px", display: "block"}} src={this.props.currentUser.profileImg ? this.props.currentUser.profileImg:noUserImage} alt="Profile Image missing." className="rounded-circle" />  
                    <   span className="username">{this.props.currentUser.username}</span> 
                    </div>                   
                </Col>
                <Col sm="12" md={{ size: 8, offset: 2 }}  id="profilePhoto" className="py-4 ">
                    <Row>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                            <ImageUploader 
                                withIcon={false}
                                buttonText='Change profile image'
                                onChange={(file) => this.onDrop(file)}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                                label=""
                            />
                        </Col>
                        <Col xs="12" md="12" className="py-4">
                            <Card className="mb-2">
                                <CardHeader>Personal Information</CardHeader>
                                <CardBody>
                                {this.props.currentUser ? 
                                    <CardText>
                                        Username:{this.props.currentUser.username} <br />
                                        Email:{this.props.currentUser.email} <br />
                                        Telephone: {this.props.currentUser.telephone} <br />
                                        Address: {this.props.currentUser.street}, {this.props.currentUser.city}, {this.props.currentUser.postal_code} <br />
                                    </CardText>
                                :
                                    <CardText>
                                    </CardText>
                                }
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="12" className="py-4">
                            <Card>
                                <CardHeader>
                                    My Auctions
                                </CardHeader>
                                <CardBody>                                                                    
                                    <ul>
                                        {
                                            Object.keys(this.props.currentUser.auctions).map((key,index)=> {
                                            return <li key={index}>{this.props.currentUser.auctions[key].title}  - £{this.props.currentUser.auctions[key].min_price}</li>
                                            })
                                        }
                                    </ul>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}