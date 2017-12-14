import React, {Component} from 'react'
import {
    Row,
    Col
} from 'reactstrap'
import noUserImage from '../img/no-user-image.gif'

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Row>
                <Col xs="12" md="4" className="bg-danger d-flex flex-column align-items-center">
                    <img src={noUserImage} alt="Profile Image" className="rounded-circle" />
                    <span>Name Surname</span>
                </Col>
                <Col xs="12" md="8" className="bg-info">

                </Col>
            </Row>
        );
    }
}