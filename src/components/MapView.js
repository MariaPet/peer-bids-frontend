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
        //Initialize markers
        let marker = new window.google.maps.Marker({
            map,
            position: {lat: 50.9, lng: -1.4}
        });
        marker.addListener('click', () => {
            //Open slider with info
            $('.transform-slider').toggleClass('slide-in');
        });
    }

    constructor(props) {
        super(props);
        this.state = {}
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