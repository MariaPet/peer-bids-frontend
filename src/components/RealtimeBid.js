import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { Button, Form, Input} from 'reactstrap';
import microphone from '../img/microphone-icon.png';
import '../styles/realtimeBid.css';
import { realtimeBid, productDetails } from '../redux/actions/index';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';

const propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool,
    recognition: PropTypes.any
}

class RealtimeBid extends Component {
    constructor(props) {
        super(props);
        this.state = { bid_value: "" };
        this.onSpeech = this.onSpeech.bind(this);
    }     
    
   
    onSpeech= function(event) {
        event.stopPropagation();
        this.setState({bid_value: event.target.value});
        // this.props.realtimeBid("83");        
        console.log(this.props.params.auction);    
        // this.props.realtimeBid(this.state.bid_value); 
        // this.props.productDetails(this.props.params.auction)
              
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
                    <img style={{height:"100px", width:"100px", backgroundColor: "#a75d5d"}} src={microphone} alt="Microphone" className="rounded-circle"  onClick = { stopListening} /> */}

                    {/* <Input type = "text" name = "bid_value" id = "bid_val" value= { transcript } onChange = { this.onSpeech } /> */}
                    {/* <p>{ this.state.bid_value }</p>   */}
                    <p className="transcript"> {transcript} </p>    
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
                    <p><span>Product name:</span>cushions</p>
                    <p><span>Product Details:</span>IKEA Red decorative cushions</p>
                    <p><span>Condition:</span>NEW</p>
                </div>     
            </div>                    
        </div>
      
        )
    }   
}


RealtimeBid.propTypes = propTypes
export default SpeechRecognition(RealtimeBid)