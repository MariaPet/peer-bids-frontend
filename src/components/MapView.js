import React, {Component} from 'react'
import '../styles/mapview.css'
import {Row, Col} from 'reactstrap'
import $ from 'jquery'; 

export default class MapView extends Component {
    componentDidMount() {
        //Initialize map
        let map = new window.google.maps.Map(document.getElementById('map'),
        {
            center: {lat: 50.9, lng: -1.4},
            zoom: 13
        });
        this.setState({map});
    }

    componentWillUpdate(nextProps, nextState) {
        //Initialize markers
        if (nextProps.auctions) {
            var users = nextProps.auctions;
            var latLngSet = []
            for (var user in users) {
                if (users[user].auctions) {
                    if(users[user].latitude && users[user].longitude) {
                        var auctionDensity = new window.google.maps.Circle({
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35,
                            map: nextState.map,
                            center: {lat: parseFloat(users[user].latitude), lng: parseFloat(users[user].longitude)},
                            radius: Math.sqrt(Object.keys(users[user].auctions).length) * 80
                          });
                          auctionDensity.addListener('click', () => {
                            $('.transform-slider').toggleClass('slide-in');
                        });
                    }           
                } 
            }
        }
        
    }
    
    constructor(props) {
        super(props);
        var latLngSet = new Set(null, function (a, b) {
            return a.lat === b.lat && a.lng === b.lng;
        });
        this.state = {
            map: null,
            latLngSet: []
        }
    }

    render() {
        return (
            <div id="mapView">
                <div id="map" />
                <div id="auctionPreview" className="transform-slider">
                </div>
            </div>
        );
    }
}

class AuctionPreview extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div style={{height: "400px", width: "30%", background: "blue", position:"absolute", bottom: "-100%"}}>
            </div>
        )
    }
}