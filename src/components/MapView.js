import React, {Component} from 'react'
import markerIcon from '../img/marker.png'
import {Popover, PopoverHeader, PopoverBody} from 'reactstrap'

const AnyReactComponent = ({ text }) => <img id="imgPopover" style={{height: "30px", width: "30px"}} src={markerIcon}/>;

export default class MapView extends Component {
    componentDidMount() {
        let map = new window.google.maps.Map(document.getElementById('map'),
        {
            center: {lat: 50.9, lng: -1.4},
            zoom: 13
        });
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div id="map" style={{height: "400px"}} />
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
            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                <PopoverHeader>Popover Title</PopoverHeader>
                <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
            </Popover>
        )
    }
}