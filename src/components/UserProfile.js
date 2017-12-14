import React, {Component} from 'react'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardText
} from 'reactstrap'
import noUserImage from '../img/no-user-image.gif'

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: "Bids"
        }
        this.showTab = this.showTab.bind(this);
    }
    showTab = tabName => e => {
        console.log(tabName);
        this.setState(
            {
                tab: tabName
            }
        );
    }
    render() {
        return (
            <Row>
                <Col xs="12" md="4" className="d-flex flex-column align-items-center py-4">
                    <img src={noUserImage} alt="Profile Image" className="rounded-circle" />
                    <span>Name Surname</span>
                </Col>
                <Col xs="12" md="8" className="d-flex flex-column py-4">
                    <Card className="mb-2">
                        <CardHeader>Personal Information</CardHeader>
                        <CardBody>
                            <CardText>
                                Name: Name <br />
                                Email: email <br />
                            </CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            Activity
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#" onClick={this.showTab("Bids")}>Bids</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" onClick={this.showTab("Auctions")}>Auctions</a>
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
        );
    }
}

class Bids extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                Bids
            </div>
        );
    }
}

class Auctions extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                Auctions
            </div>
        );
    }
}