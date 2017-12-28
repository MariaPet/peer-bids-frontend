import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'
import { Button,Form, FormGroup, Label, InputGroup, InputGroupAddon, Input, Row, Col } from 'reactstrap';

const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
}
          
 class RealtimeBid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bid_value: ""
        }
        // this.onInput = this.onInput.bind(this);
    }
    // onInput = e => {
    //     let key = e.target.name;
    //     let value = e.target.value;
    //     let newState = {};
    //     newState[key] = value;
    //     this.setState(newState);
    // }
    render() {
        const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props
    
        if (!browserSupportsSpeechRecognition) {
        return null
        }
    
        return (
        <div>
            <button onClick={resetTranscript}>Reset</button>
            <span>{transcript}</span>
        </div>
        )
    }   
}

RealtimeBid.propTypes = propTypes
export default SpeechRecognition(RealtimeBid)