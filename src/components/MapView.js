import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class MapView extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        center: {lat: 50.9, lng: -1.4},
        zoom: 13
      };

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
                lat={59.955413}
                lng={30.337844}
                text={'Kreyser Avrora'}
                />
            </GoogleMapReact>
        );
    }
}