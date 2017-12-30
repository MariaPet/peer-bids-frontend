import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'
import { Button, Input} from 'reactstrap';
//import { realtimeBid } from '../redux/actions/index'

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
    // console.log(this.props.match.params.auction);    
    onSpeech= function(event) {
        event.stopPropagation();
        this.setState({bid_value: event.target.value});
        this.props.realtimeBid("83");
        // this.props.realtimeBid(this.state.bid_value)       
    }

    render() {
        const { transcript, resetTranscript, browserSupportsSpeechRecognition, recognition } = this.props        
        recognition.lang = 'en-US'
        recognition.interimResults = false;
        if (!browserSupportsSpeechRecognition) {
        return null
        }    
        return (
        <div>            
            <Button onClick={resetTranscript}>Reset</Button>
            <Input type="text" name="bid_value" id="bid_value" value= {transcript} onChange = { this.onSpeech } />
            <p>{this.state.bid_value}</p>           
        </div>
        )
    }   
}

RealtimeBid.propTypes = propTypes
export default SpeechRecognition(RealtimeBid)