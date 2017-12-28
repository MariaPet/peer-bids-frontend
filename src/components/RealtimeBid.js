import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'
import { Button, Form, Input} from 'reactstrap';

const propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool,
    recognition: PropTypes.string
}

class RealtimeBid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bid_value: ""
        }
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
            <button onClick={resetTranscript}>Reset</button>
            <Form name="form">
                <Input type="text" name="bid_value" id="bid_value" value= {transcript} />
            </Form>           
        </div>
        )
    }   
}

RealtimeBid.propTypes = propTypes
export default SpeechRecognition(RealtimeBid)