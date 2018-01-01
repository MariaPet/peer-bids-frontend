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
import noUserImage from '../img/no-user-image.gif'

export default class UserProfile extends Authorization {
    constructor(props) {
        super(props);
        this.state = {
            tab: "Bids",
            picture: null
        }
        this.showTab = this.showTab.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    showTab = tabName => e => {
        e.preventDefault();
        this.setState({tab: tabName});
    }
    onDrop = picture => {
        this.setState({picture: picture[0]});
    }
    render() {
        return (
            <Row>
                <Col xs="12" md="4" className="d-flex flex-column align-items-center py-4">
                    <img style={{height:"200px", width:"200px"}} src={this.props.currentUser.profileImg?this.props.currentUser.profileImg:noUserImage} alt="Profile" className="rounded-circle" />
                    <span>Name Surname</span>
                </Col>
                <Col xs="12" md="8" className="py-4">
                    <Row>
                    <Col xs="12" md="4" className="py-4">
                        <Button onClick={(e) => this.props.uploadImage(this.state.picture)}>
                            Upload Image
                        </Button>
                        <ImageUploader 
                            withPreview={false}
                            withIcon={false}
                            buttonText='Select profile pic'
                            onChange={(file) => this.onDrop(file)}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            label=""
                        />
                    </Col>
                    <Col xs="12" md="8" className="py-4">
                        <Card className="mb-2">
                            <CardHeader>Personal Information</CardHeader>
                            <CardBody>
                            {this.props.currentUser ? 
                                <CardText>
                                    Username: {this.props.currentUser.username} <br />
                                    Email: {this.props.currentUser.email} <br />
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
                                        <a className={this.state.tab === "Bids" ? "nav-link active": "nav-link"} href="#" onClick={this.showTab("Bids")}>Bids</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={this.state.tab === "Auctions" ? "nav-link active": "nav-link"} href="#" onClick={this.showTab("Auctions")}>Auctions</a>
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
                Bids
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