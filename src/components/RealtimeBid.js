import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { Button, Form, Input} from 'reactstrap';
import microphone from '../img/microphone-icon.png';
import '../styles/realtimeBid.css';
import { realtimeBid } from '../redux/actions/index';
import { productDetails} from '../redux/actions/index';
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
            bid_value: "",
            product_id: this.props.params.auction,
            show:true
        };
        this.onSpeech = this.onSpeech.bind(this);
        this.bids = this.props.location.state.bids;
    }     
    onSpeech= function(event) {        
        event.stopPropagation();
        this.setState({bid_value: event.target.value});
        this.setState({show: false});
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
        console.log(this.props.location.state)
        
    }
    
    render() {
        console.log(this.props.location.state)
        var bids_added = [];
        if(this.props.location.state.bids){
            bids_added = Object.keys(this.props.location.state.bids).map(key => {
                console.log(this.props.location.state.bids[key]);
                return this.props.location.state.bids[key];    
            });    
        }
        
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
  
        function multipleActions(){    
            // startListening();
            resetTranscript();            
        }

        return (

            <div className="top">                   
                <div className="microphone">
                {this.props.location.state.status === "open" ?  (
                    <div className="mic-icon" >                        
                        <Input  style={style1} type = "image" alt="Microphone-Off" className="gray-mic" name = "bid_value"  value= { transcript } onClick = { this.onSpeech } src={microphone} />
                        <Input  style={style}  type = "image" alt="Microphone-On"  className="gray-mic" name = "bid_value"  value= { transcript } onClick = { this.onSpeech } src={microphone} />
                        <p style={style1} > Your last offer: {this.last_value ? this.last_value : "£0"}</p>   
                        <p style={style}>Click to make a bid </p>

                    </div>
                ): (
                    <div className="closed-auction">
                        <p>This auction is closed. You cannot make bids anymore.</p>
                    </div>
                )}
                </div>            
                <div className="actual-bids">
                    <div className="bids">                        
                        <ul>
                            <li><span>Username: </span> 22</li>
                            <li><span>Username: </span> 23 </li>
                            <li><span>Username: </span> 24 </li>
                        </ul>
                    </div>                
                    <div className="product-details">
                        <p><span>Category: </span>{ this.props.location.state.category ? this.props.location.state.category : " no category"}</p>
                        <p><span>Product name: </span>{ this.props.location.state.title}</p>
                        <p><span>Product Details: </span>{ this.props.location.state.description}</p>
                        <p><span>Condition: </span>{ this.props.location.state.status}</p>
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