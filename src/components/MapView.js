import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react'
import markerIcon from '../img/marker.png'
import {Popover, PopoverHeader, PopoverBody} from 'reactstrap'

const AnyReactComponent = ({ text }) => <img id="imgPopover" style={{height: "30px", width: "30px"}} src={markerIcon}/>;

export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          popoverOpen: false
        };
    }
    static defaultProps = {
        center: {lat: 50.9, lng: -1.4},
        zoom: 13
    };
    
    
    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        })
    }

    render() {
        return (
            <GoogleMapReact style={{height: "400px"}}
                bootstrapURLKeys={{
                    key: "AIzaSyDDs0MlMr1jwchsHIjMqdl0hvFy5Prio_k"
                }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            >
                <AnyReactComponent
                lat={50.9}
                lng={-1.4}
                />
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="imgPopover" toggle={this.toggle}>
                    <PopoverHeader>Popover Title</PopoverHeader>
                    <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                </Popover>
            </GoogleMapReact>
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