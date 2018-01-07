import React, { Component } from 'react';
import Authorization from './Authorization'
import $ from 'jquery';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { Button, Form, Input} from 'reactstrap';
import microphone from '../img/microphone-icon.png';
import '../styles/realtimeBid.css';
import { realtimeBid } from '../redux/actions/index';
import { productDetails} from '../redux/actions/index';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'

const propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool,
    recognition: PropTypes.any
}
const last_value = 0;


class RealtimeBid extends Authorization {
    constructor(props) {
        super(props);
        var auction = null;
        var product_id = this.props.params.auction;
        if( this.props.productOwner) 
            var auction = this.props.productOwner.auctions[product_id];
        this.state = {
            auction,
            errorMessage: "",
            bid_value: "",
            product_id,
            source: null,
            show:true
        };
        // this.onSpeech = this.onSpeech.bind(this);
        this.toggleMic = this.toggleMic.bind(this);
        this.submitBid = this.submitBid.bind(this);
    }
    componentDidMount() {
        if (!this.props.productOwner) browserHistory.push({pathname: '/'});
        var source = new EventSource(this.props.stream)
        var that = this;
        source.addEventListener("patch", function(event) {
            that.props.realtimeUpdate(JSON.parse(event.data))});
        this.setState({ source });
    }
    componentWillUnmount() {
        this.state.source.close();
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.productOwner) {
            var auction = nextProps.productOwner.auctions[nextProps.params.auction];
            this.setState({auction});
        }        
    }
    toggleMic() {
        if (this.props.listening) this.props.stopListening();
        else this.props.startListening();
    } 
    submitBid() {
        // var bid_value = this.props.finalTranscript;
        var text = this.props.finalTranscript;
        var value = text.match(/\d/g);
        if (value == null){
            value= 0;
        } else {
            value = value.join("");
        }
        var bid_value = value ? parseInt(value) : 0;
        // this.last_value = bid_value;

        if (!isNaN(bid_value)) {
            if (this.state.auction.min_price < bid_value){
                this.props.realtimeBid({bid_value, product_id: this.state.product_id})
            }
            else {
                console.log("Your bid must be greater than the current price");
                this.setState({errorMessage: "Your bid must be greater than the current price"});
            }
        }
        else {
            console.log("Your bid must be a numeric value");
            this.setState({errorMessage: "Your bid must be a numeric value"});
        }
    }
    
    render() {
        
        const { transcript, resetTranscript, browserSupportsSpeechRecognition, recognition, startListening, stopListening, autoStart } = this.props        
        recognition.lang = 'en-GB';
        recognition.interimResults = true;  
        recognition.autoStart= false;

        if (!browserSupportsSpeechRecognition) {
            return null
        }   
        var style = {backgroundColor:"transparent"};
        var style1 = {backgroundColor:"#fff"};

        if (this.state.show == true) {
            style.display = 'block';
            style1.display = 'none';             
        } else {
            style.display = 'none';
            style1.display = 'block';      
        }
        if(this.props.productOwner) {
            var bidItems = [];
            for (var bid in this.state.auction.bids) {
                bidItems.push(<BidItem key={bid} bid={this.state.auction.bids[bid]}/>)
            }
            return (
                <div className="top">                   
                    <div className="microphone">
                        <div className="mic-icon" >                        
                            {/* <Input  style={style1} type = "image" alt="Microphone-Off" className="gray-mic" name = "bid_value"  value= { transcript } onClick = { this.onSpeech } src={microphone} /> */}
                            <img  onClick={this.toggleMic} style={style} alt="Microphone-On" className="gray-mic" src={microphone} />
                            <p style={style1} > Your last offer: {this.last_value ? this.last_value : "£0"}</p>   
                            <p style={style}>{this.props.listening? "Microphone ON": "Microphone OFF"} </p>
                            <div>Your bid is: { this.props.transcript }</div>
                            <div>
                                <Button onClick={this.props.resetTranscript}>Reset Bid</Button> 
                                <Button onClick={this.submitBid}>Submit Bid</Button>
                            </div>
                        </div>
                    </div>            
                    <div className="actual-bids">
                        <div className="bids">                       
                            <ul>
                                {bidItems.length > 0 ? bidItems : "No bids yet"}
                            </ul>
                        </div>                
                        <ProductDetails auction={this.state.auction} />                                 
                    </div>  
                    <div className="images">
                        {/* <img className="product-image" src="http://www.ikea.com/ms/media/seorange/20171/20143_txca01a_cushion_cushion_covers_PH138030.jpg"/> */}
                        {/* <img className="product-image" src="http://www.ikea.com/gb/en/images/breakout/ikea-skogsnava-cushion-cover__1364338769199-s31.jpg"/> */}
                        {/* <img className="product-image" src="http://www.ikea.com/gb/en/images/gb-img-fy15/ikea-rodarv-cushion-40x65__1364439875500-s31.jpg"/> */}
                        <img className="product-image" src={"gs://cloudappdevproject.appspot.com/products/%2F" + this.product_id + "/(0).jpg"} />
                        <img className="product-image" src={"gs://cloudappdevproject.appspot.com/products/%2F" + this.product_id + "/(1).jpg"} />
                        <img className="product-image" src={"gs://cloudappdevproject.appspot.com/products/%2F" + this.product_id + "/(2).jpg"} />
                    </div>                        
                </div>    
            )
        }
        else {
            return (
                <div> Something went wrong </div>
            )
        }
        
    }   
}

class ProductDetails extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var auction = this.props.auction;
        return (
            <div className="product-details">
                <p><span>Current price: </span>{ auction.min_price}</p>
                <p><span>Category: </span>{ auction.category ? auction.category : " no category"}</p>
                <p><span>Product name: </span>{ auction.title}</p>
                <p><span>Product Details: </span>{ auction.description}</p>
                <p><span>Condition: </span>{ auction.status}</p>
            </div>
        );
    }
}

class BidItem extends Component {
    render() {
        return (
            <li><span>{this.props.bid.username}: </span> {this.props.bid.bid_value}</li>
        );
    }
}

RealtimeBid.propTypes = propTypes
export default SpeechRecognition(RealtimeBid)