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
            var auctions = nextProps.auctions;
            for (var auction in auctions) {
                if (auctions.hasOwnProperty(auction)) {
                    if(auctions[auction].owner && auctions[auction].owner.latitude && auctions[auction].owner.longitude) {
                        let marker = new window.google.maps.Marker({
                            map: nextState.map,
                            position: {lat: parseFloat(auctions[auction].owner.latitude), lng: parseFloat(auctions[auction].owner.longitude)}
                        });
                        marker.addListener('click', () => {
                            $('.transform-slider').toggleClass('slide-in');
                        });
                    }           
                }
            }
        }
        
    }
    
    constructor(props) {
        super(props);
        this.state = {
            map: null
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