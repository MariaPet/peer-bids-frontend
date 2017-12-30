import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import '../styles/mapview.css'
import {Row, Col, Form} from 'reactstrap'
import $ from 'jquery'; 
import { GoogleMap, Circle , Marker, HeatmapLayer, withScriptjs, withGoogleMap } from "react-google-maps"
import { MAP } from 'react-google-maps/lib/constants'

export default class MapView extends Component {
    componentDidMount() {
        if (this.props.auctions == false) {
            browserHistory.push({pathname: '/'});
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            previewedAuctions: null
        }
        this.updatePreview = this.updatePreview.bind(this);
    }
    updatePreview(user) {
        debugger;
        this.setState({previewedAuctions: user});
    }
    render() {
        return (
            <div id="mapView">
            <Map 
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDs0MlMr1jwchsHIjMqdl0hvFy5Prio_k&libraries=places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div id="map" />}
                mapElement={<div style={{ height: `100%` }} />}
                users={this.props.auctions}
                updatePreview={this.updatePreview}
            />
            <AuctionPreview user={this.state.previewedAuctions}/>
            </div>
            
        );
    }
}

const Map = withScriptjs(withGoogleMap(props => {
    var densityCircles = [];
    var users = props.users;
    for (var user in users) {
        if (users[user].auctions) {
            if(users[user].latitude && users[user].longitude) {
                densityCircles.push(<AuctionCircle key={user}
                    center = {{lat: parseFloat(users[user].latitude), lng: parseFloat(users[user].longitude)}}
                    radius = {Math.sqrt(Object.keys(users[user].auctions).length) * 80}
                    user = {users[user]}
                    updatePreview = {props.updatePreview}
                     />)
            }
        }
    }
    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={{lat: 50.9, lng: -1.4}}
        >
            {densityCircles}
        </GoogleMap> 
    )
}))

class AuctionCircle extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return(
            <Circle center={this.props.center} radius={this.props.radius}
            onClick = {(e) => {$('.transform-slider').toggleClass('slide-in');this.props.updatePreview(this.props.user);}}/>
        )
    }
}
class AuctionPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({username: nextProps.user.username});
        }
    }
    render() {
        return (
            <div id="auctionPreview" className="transform-slider" style={{height: "400px", width: "30%", background: "blue", position:"absolute", bottom: "-100%"}}>
                <h1>{this.state.username}</h1>
            </div>
        )
    }
}