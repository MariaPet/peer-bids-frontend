import React, {Component, Children} from 'react'
import { browserHistory } from 'react-router'
import '../styles/mapview.css'
import {Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap'
//import $ from 'jquery'; 
import { GoogleMap, Circle, withScriptjs, withGoogleMap } from "react-google-maps"
import Countdown from 'react-countdown-now';

export default class MapView extends Component {
    componentDidMount() {
        if (!this.props.auctions) browserHistory.push({pathname: '/'});
    }

    constructor(props) {
        super(props);
        this.state = { previewedAuctions: null }
        this.updatePreview = this.updatePreview.bind(this);
    }
    updatePreview(user) {
        this.setState({previewedAuctions: user});
    }
    render() {
        return (
            <Row>
                <Col xs="12" md="4">
                    <AuctionPreview user={this.state.previewedAuctions}/>
                </Col>
                <Col xs="12" md="8">
                    <Map 
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDs0MlMr1jwchsHIjMqdl0hvFy5Prio_k&libraries=places"
                        loadingElement={<div style={{ height: '100%' }} />}
                        containerElement={<div id="map" />}
                        mapElement={<div style={{ height: '100%' }} />}
                        users={this.props.auctions}
                        updatePreview={this.updatePreview}
                    />
                </Col>   
            </Row>  
        );
    }
}

const Map = withScriptjs(withGoogleMap(props => {
    var densityCircles = [];
    var users = props.users;
    for (var user in users) {
        if (users[user].auctions) {
            if(users[user].latitude && users[user].longitude) {
                densityCircles.push(
                <AuctionCircle key={user}
                    center = {{lat: parseFloat(users[user].latitude), lng: parseFloat(users[user].longitude)}}
                    radius = {Math.sqrt(Object.keys(users[user].auctions).length) * 80}
                    user = {users[user]}
                    updatePreview = {props.updatePreview}/>
                )
            }
        }
    }
    return (
        <GoogleMap defaultZoom={13} defaultCenter={{lat: 50.9, lng: -1.4}}>
            {densityCircles}
        </GoogleMap> 
    )
}))

class AuctionCircle extends Component {
    render() {
        return(
            <Circle center={this.props.center} radius={this.props.radius}
            onClick = {(e) => {this.props.updatePreview(this.props.user);}}/>
        )
    }
}
class AuctionPreview extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) this.setState({user: nextProps.user});
        else this.setState({user: null});
    }
    render() {
        var renderElements = null;
        if (this.state.user) {
            let auctionItems = []
            var renderer = ({ days, hours, minutes, seconds, completed }) => {
                if (completed) {
                  // Render a completed state 
                  return <span>BOOM</span>;
                } else {
                  // Render a countdown 
                  return (
                  <span className='d-flex justify-content-end'>
                     <span className="d-flex flex-column">
                        <span>Days</span><span className="rounded-circle clock-element">{days}</span>
                    </span>
                    <span className="d-flex flex-column">
                        <span>Hours</span><span className="rounded-circle clock-element">{hours}</span>
                    </span>
                    <span className="d-flex flex-column">
                        <span>Minutes</span><span className="rounded-circle clock-element">{minutes}</span>
                    </span>
                    <span className="d-flex flex-column">
                        <span>Seconds</span><span className="rounded-circle clock-element">{seconds}</span>
                    </span>
                  </span>);
                }
            };
            for (var auction in this.state.user.auctions) {
                auctionItems.push(<AuctionItem key={auction} id={auction} auction={this.state.user.auctions[auction]}>
                    <Countdown key={auction} date={this.state.user.auctions[auction].expiration_date * 1000} 
                    renderer={renderer} />
                </AuctionItem>);
            }
            renderElements = 
            (<Row id="auctionPreview" className="transform-slider pt-3">
                <Col xs="12">
                    <h1>{this.state.user.username}</h1>
                </Col>
                <Col xs='12'>
                    <ListGroup>
                        {auctionItems}
                    </ListGroup>
                </Col>
            </Row>)
        }
        else {
            renderElements = 
            (<Row id="auctionPreview" className="transform-slider pt-3">
                <Col xs="12">
                    <h1>Click on a circle to preview auction information</h1>
                </Col>
            </Row>)
        }
        return (
            <div>{renderElements}</div>
        )
    }
}

class AuctionItem extends Component {
    render() {
        return(
            <ListGroupItem>
                <ListGroupItemHeading>{this.props.auction.title}</ListGroupItemHeading>
                <ListGroupItemText>
                    {this.props.auction.description}<br />
                    {this.props.auction.min_price}<br />
                    {this.props.children}
                </ListGroupItemText>
            </ListGroupItem>
        );
    }
}