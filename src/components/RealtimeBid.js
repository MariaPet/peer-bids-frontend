import React, { Component } from 'react';
import Authorization from './Authorization'
import $ from 'jquery';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { Card, CardImg, CardBody, CardTitle, CardText, Row, Col, Button, Form, Input, CardSubtitle, ListGroup, ListGroupItem, ListGroupItemText} from 'reactstrap';
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

// only for authorized users 
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
            source: null
        };
        // this.onSpeech = this.onSpeech.bind(this);
        this.toggleMic = this.toggleMic.bind(this);
        this.submitBid = this.submitBid.bind(this);
    }
    componentWillMount() {
        if (this.props.params.auction === "null" || !this.props.productOwner) browserHistory.push({pathname: '/'});
    }
    componentDidMount() {
        var source = new EventSource(this.props.stream)
        var that = this;
        source.addEventListener("patch", function(event) {
            that.props.realtimeUpdate(JSON.parse(event.data))});
        this.setState({ source });
    }
    componentWillUnmount() {
        if (this.state.source) this.state.source.close();
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
        if(this.props.productOwner) {
            var bidItems = [];
            for (var bid in this.state.auction.bids) {
                bidItems.push(<BidItem key={bid} bid={this.state.auction.bids[bid]}/>)
            }
            return (
                <Row className="top">                   
                    <Col xs="12" className="d-flex justify-content-center py-5">                      
                        <img  onClick={this.toggleMic} style={{backgroundColor:"transparent", width:"150px", height:"150px"}} alt="Microphone-On" className="gray-mic" src={microphone} />  
                    </Col>
                    <Col xs="12" className="d-flex justify-content-center">
                        <p>{this.props.listening? "Microphone ON": "Microphone OFF"} </p>
                    </Col>
                    <Col xs="12" className="d-flex flex-column align-items-center ">
                        <h3> Current price: {this.state.auction.min_price} </h3>   
                        
                        <div>Your bid is: { this.props.transcript }</div>
                        <div>
                            <Button onClick={this.props.resetTranscript}>Reset Bid</Button>{' '} 
                            <Button color="primary" onClick={this.submitBid}>Submit Bid</Button>
                        </div>
                    </Col> 
                    <Col xs="12" className="actual-bids mt-5">  
                    <Row className="scrolledList">  
                        <Col xs="6">                
                            <ProductDetails username={this.props.productOwner.username} auction={this.state.auction} />                                 
                        </Col>       
                        <Col xs="6">
                            <h2>Other Bids</h2>
                            <ListGroup>                       
                                {bidItems.length > 0 ? bidItems : "No bids yet"}
                            </ListGroup>
                        </Col>  
                    </Row>
                    </Col>
                    {/* <div className="images"> */}
                        {/* <img className="product-image" src="http://www.ikea.com/ms/media/seorange/20171/20143_txca01a_cushion_cushion_covers_PH138030.jpg"/> */}
                        {/* <img className="product-image" src="http://www.ikea.com/gb/en/images/breakout/ikea-skogsnava-cushion-cover__1364338769199-s31.jpg"/> */}
                        {/* <img className="product-image" src="http://www.ikea.com/gb/en/images/gb-img-fy15/ikea-rodarv-cushion-40x65__1364439875500-s31.jpg"/> */}
                        {/* <img className="product-image" src={"gs://cloudappdevproject.appspot.com/products/%2F" + this.product_id + "/(0).jpg"} /> */}
                        {/* <img className="product-image" src={"gs://cloudappdevproject.appspot.com/products/%2F" + this.product_id + "/(1).jpg"} /> */}
                        {/* <img className="product-image" src={"gs://cloudappdevproject.appspot.com/products/%2F" + this.product_id + "/(2).jpg"} /> */}
                    {/* </div>                         */}
                </Row>    
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
           
            <Card>
            {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
            <CardBody>
                <CardTitle>{auction.title}</CardTitle>
                <CardSubtitle>By {this.props.username}</CardSubtitle>
                <CardText>
                    <span>Category: </span>{ auction.category ? auction.category : " no category"} <br />
                    <span>Product Details: </span>{ auction.description} <br />
                    <span>Condition: </span>{ auction.status} <br />
                </CardText>
            </CardBody>
            </Card>
           
        );
    }
}

class BidItem extends Component {
    render() {
        var date = new Date(this.props.bid.timestamp*1000)
        var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        // var date = moment.unix(1466760005).format("DD-MM-YYYY HH:mm:ss");
        return (
            <ListGroupItem>
                <ListGroupItemText>
                {date.getDate() + "/" + date.getMonth() + "/" + date.getYear() +
                 " " + date.getHours() + ":" + min + ":" +
                 sec} <br />
                {this.props.bid.username}: {this.props.bid.bid_value} £
                </ListGroupItemText>
            </ListGroupItem>
        );
    }
}

RealtimeBid.propTypes = propTypes
export default SpeechRecognition(RealtimeBid)