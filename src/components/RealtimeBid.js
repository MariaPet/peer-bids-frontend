import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { Button, Form, Input} from 'reactstrap';
import microphone from '../img/microphone-icon.png';
import '../styles/realtimeBid.css';
import { realtimeBid, productDetails } from '../redux/actions/index';
import ReactDOM from 'react-dom';

const propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool,
    recognition: PropTypes.any
}
const last_value = 0;

class RealtimeBid extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            // bid_value: "",
            product_id: this.props.params.auction
        };
        this.onSpeech = this.onSpeech.bind(this);
    }     
    
   
    onSpeech= function(event) {
        
    //    console.log( productDetails(this.state.product_id));
        // this.props.productDetails(this.state.product_id);  
        event.stopPropagation();
        this.setState({bid_value: event.target.value});
        console.log(this.props.params.auction); 
        console.log(this.state.product_id);    
        console.log(this.state.bid_value);       
        var txt = event.target.value;
        var value = txt.match(/\d/g);
        if (value == null){
            value= 0;
        } else {
            value = value.join("");
        }
        var bid_value = parseInt(value);
        this.last_value = bid_value ? bid_value : 0;
        this.props.realtimeBid(bid_value,this.state.product_id); 
    }
    
    render() {
        const { transcript, resetTranscript, browserSupportsSpeechRecognition, recognition, startListening, stopListening } = this.props        
        recognition.lang = 'en-GB';
        recognition.interimResults = true;  
 
        if (!browserSupportsSpeechRecognition) {
        return null
        }    
        return (
        <div className="top">    
            <div className="microphone">
                <div className="mic-icon" >
                    <img src={microphone} alt="Microphone" className="gray-mic" onClick = { resetTranscript }  />
                
                    {/* <img style={{height:"100px", width:"100px", backgroundColor: "darkseagreen"}} src={microphone} alt="Microphone" className="rounded-circle"  onClick = { startListening }  />
                    {/* <img style={{height:"100px", width:"100px", backgroundColor: "#a75d5d"}} src={microphone} alt="Microphone" className="rounded-circle"  onClick = { stopListening} /> */} 

                    <Input type = "text" name = "bid_value" id = "bid_val" value= { transcript } onChange = { this.onSpeech } />
                    {/* <p className="transcript">{ this.state.bid_value ? this.state.bid_value : "Start bidding"}</p>   */}
                    {/* <p className="transcript"> {transcript ? transcript : "click the button to start bidding"} </p>  */}
                    <p>Your last offer: {this.last_value ? this.last_value : 0}</p>   
                </div>
            </div> 
            <div className="actual-bids">
                <div className="bids">
                    <ul>
                        <li><span>Username: </span> 20 </li>
                        <li><span>Username: </span> 21 </li>
                        <li><span>Username: </span> 24 </li>

                    </ul>
                </div>                
                <div className="product-details">
                    <p><span>Category:</span>House items</p>
                    <p><span>Product name:</span>cushions</p>
                    <p><span>Product Details:</span>IKEA Red decorative cushions</p>
                    <p><span>Condition:</span>NEW</p>
                </div>                                  
            </div>  
            <div className="images">
                <img className="product-image" src="http://www.ikea.com/ms/media/seorange/20171/20143_txca01a_cushion_cushion_covers_PH138030.jpg"/>
                <img className="product-image" src="http://www.ikea.com/gb/en/images/breakout/ikea-skogsnava-cushion-cover__1364338769199-s31.jpg"/>
                <img className="product-image" src="http://www.ikea.com/gb/en/images/gb-img-fy15/ikea-rodarv-cushion-40x65__1364439875500-s31.jpg"/>
            </div>       
                      
        </div>
    
        )
    }   
}


RealtimeBid.propTypes = propTypes
export default SpeechRecognition(RealtimeBid)