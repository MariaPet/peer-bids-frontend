import React, { Component } from 'react'
import Authorization from './Authorization'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardText,
    Button
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
        this.showTab = this.showTab.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    showTab = tabName => e => {
        e.preventDefault();
        this.setState({tab: tabName});
    };
    onDrop = picture => {        
        this.state['picture'] = picture[0];
        this.props.uploadImage(this.state);
        this.hidePreview();
    };
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
                    <div className=" profile-header" style={{backgroundImage: "url(" + this.props.currentUser.profileImg + ")"}}>
                        {/* <img className="profile-image" src={this.props.currentUser.profileImg ? this.props.currentUser.profileImg:noUserImage}/>   */}
                    </div>
                    <div className="image-username">                    
                    <img className="profile-image" style={{width: "250px", "height": "250px", display: "block"}} src={this.props.currentUser.profileImg ? this.props.currentUser.profileImg:noUserImage} alt="Profile" className="rounded-circle" />  
                    <span className="username">{this.props.currentUser.username}</span> 
                    </div>                   
                </Col>
                <Col xs="12" md="8" className="py-4 " id="profilePhoto">
                    <Row>
                        <Col xs="12" md="12" className="py-4">                
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
                                        Username: {this.props.currentUser.username} <br />
                                        Email:  {this.props.currentUser.email} <br />
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
                                    Activity
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <a className={this.state.tab === "Bids" ? "nav-link active": "nav-link"} href="#" onClick={this.showTab("Bids")}>Won Auctions</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className={this.state.tab === "Auctions" ? "nav-link active": "nav-link"} href="#" onClick={this.showTab("Auctions")}>My Auctions</a>
                                        </li>
                                    </ul>
                                </CardHeader>
                                <CardBody>
                                    {
                                        this.state.tab === "Bids" ? 
                                        (<Bids />) : 
                                        (<Auctions />)
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

class Bids extends Component {
    /*constructor(props) {
        super(props)
    }*/
    render() {
        return (
            <div>
                Won Auctions
            </div>
        );
    }
}

class Auctions extends Component {
    /*constructor(props) {
        super(props)
    }*/
    render() {
        return (
            <div>
                Auctions
            </div>
        );
    }
}