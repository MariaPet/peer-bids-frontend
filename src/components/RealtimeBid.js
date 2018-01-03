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
        this.state = {
            bid_value: "",
            product_id: this.props.params.auction,
            show:true
        };
        // this.onSpeech = this.onSpeech.bind(this);
        this.toggleMic = this.toggleMic.bind(this);
        // this.bids = this.props.location.state.bids;
    }
    componentDidMount() {
        if (!this.props.productOwner) browserHistory.push({pathname: '/'});
    }
    componentWillReceiveProps(nextProps) {
        console.log("is listening " + nextProps.listening);
        console.log("transcript is " + nextProps.transcript);
    }
    toggleMic() {
        // debugger;
        if (this.props.listening) this.props.stopListening();
        else this.props.startListening();
    } 

    // onSpeech= function(event) {        
    //     event.stopPropagation();
    //     this.setState({bid_value: event.target.value});
    //     this.setState({show: false});
    //             var txt = event.target.value;
    //     var value = txt.match(/\d/g);
    //     if (value == null){
    //         value= 0;
    //     } else {
    //         value = value.join("");
    //     }
    //     var bid_value = parseInt(value);
    //     this.last_value = bid_value ? bid_value : 0;
    //     // this.props.realtimeBid(bid_value,this.state.product_id);
    //     // console.log(this.props.location.state)
    // }
    
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
            var auction = this.props.productOwner.auctions[this.props.params.auction];
            
            var bidItems = [];
            for (var bid in auction.bids) {
                bidItems.push(<BidItem key={bid} bid={auction.bids[bid]}/>)
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
                                <Button onClick={(e) => {this.props.realtimeBid({bid_value: this.props.transcript, product_id: this.state.product_id})}}>Submit Bid</Button>
                            </div>
                        </div>
                    </div>            
                    <div className="actual-bids">
                        <div className="bids">                       
                            <ul>
                                {bidItems.length > 0 ? bidItems : "No bids yet"}
                            </ul>
                        </div>                
                        <ProductDetails auction={auction} />                                 
                    </div>  
                    <div className="images">
                        <img className="product-image" src="http://www.ikea.com/ms/media/seorange/20171/20143_txca01a_cushion_cushion_covers_PH138030.jpg"/>
                        <img className="product-image" src="http://www.ikea.com/gb/en/images/breakout/ikea-skogsnava-cushion-cover__1364338769199-s31.jpg"/>
                        <img className="product-image" src="http://www.ikea.com/gb/en/images/gb-img-fy15/ikea-rodarv-cushion-40x65__1364439875500-s31.jpg"/>
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