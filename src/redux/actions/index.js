import $ from 'jquery'
import qs from'qs';
import assert from 'assert';
import { browserHistory } from 'react-router'
import {
    pendingTask, // The action key for modifying loading state
    begin, // The action value if a "long" running task begun
    end // The action value if a "long" running task ended
  } from 'react-redux-spinner';

// const server = 'http://localhost:5000/';
const server = 'https://peer-bids-back-end.appspot.com/';

//TODO remove test action getApiData
export const getApiData = (dispatch, state) => {
    dispatch({type: 'DATA_LOADING'});
    var flaskAPI = "https://peer-bids-back-end.appspot.com/api/dummy"
    // var flaskAPI = "http://localhost:5000/api/dummy";
    $.getJSON(flaskAPI).done(data => {
        console.log(data);
        dispatch({type: 'DATA', data: data})
    })
}

export const getAuctions = (searchTerms) => (dispatch, state) => {
    var data = {};
    if (searchTerms.title) {
        data.title = searchTerms.title;
    }
    if (searchTerms.latitude && searchTerms.longitude) {
        data.latitude = searchTerms.latitude;
        data.longitude = searchTerms.longitude;
    }
    dispatch({type: 'AUCTIONS_LOADING', [ pendingTask ]: begin});
    var getAuctions = server + "api/product";
    $.getJSON(getAuctions, data).done(responceData => {

        dispatch({type: 'GET_AUCTIONS', auctions: responceData.data, [ pendingTask ]: end});
        browserHistory.push({pathname: '/map'});
    }).fail(() => {dispatch({type: 'GET_AUCTIONS_FAILED', [ pendingTask ]: end})});
}

export const registerUser = (user) => (dispatch, state) => {
    dispatch({type: 'AUTHENTICATION_LOADING', [ pendingTask ]: begin});
    var registerUser = server + "signup";
    $.post(registerUser, user, (responceData) => {
        dispatch({type: 'REGISTER', user: responceData.data, [ pendingTask ]: end});
        browserHistory.push({pathname: '/', state:{showRegisterModal: false}});
    }, "json").fail(() => dispatch({type: 'AUTHENTICATION_FAILED', [ pendingTask ]: end}));
}

export const login = (credentials) => (dispatch, state) => {
    dispatch({type: 'AUTHENTICATION_LOADING', [ pendingTask ]: begin});
    var loginUser = server + "login";
    $.post(loginUser, credentials, (responceData) => {
        window.localStorage.setItem("idToken", responceData.token);
        dispatch({type: 'LOGIN', user: responceData.data.claims, [ pendingTask ]: end});
        browserHistory.push({pathname: '/', state:{showLoginModal: false}});
    }, "json").fail(() => dispatch({type: 'AUTHENTICATION_FAILED', [ pendingTask ]: end}));
}

export const refreshToken = (dispatch, state) => {
    dispatch({type: 'AUTHENTICATION_LOADING', [ pendingTask ]: begin});
    let refreshTokenUrl = server + "refresh";
    let refreshToken = window.localStorage.getItem("idToken");
    if (refreshToken) {
        $.post(refreshTokenUrl, {refreshToken}, (responceData) => {
                window.localStorage.setItem("idToken", responceData.token);
                dispatch({type: 'REFRESH_TOKEN', user: responceData.data, [ pendingTask ]: end})
            },
            "json"
        ).fail(() => {
            dispatch({type: 'AUTHENTICATION_FAILED', [ pendingTask ]: end})
        });
    }
    else {
        dispatch({type: 'AUTHENTICATION_FAILED', [ pendingTask ]: end})
    }
}

export const logout = (dispatch, state) => {
    localStorage.clear();
    dispatch({type: 'LOG_OUT'});
    browserHistory.push('/');
}

export const uploadImage = (picture) => (dispatch, state) => {
    dispatch({type: 'UPLOAD_FILE_LOADING'});
    var token = window.localStorage.getItem("idToken");
    var formData = new FormData();
    formData.append('profilePic', picture);
    if (token) {
        var uploadUrl = server + "upload";
        $.ajax({
            url: uploadUrl,
            type: 'post',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',                
                "x-access-token": token
            },
            dataType: 'json',
            success: function (responceData) {
                dispatch({type: 'UPLOAD_FILE', auction: responceData.data});
            },
            error: function() {
                dispatch({type: 'UPLOAD_FILE_FAILED'})
            }
        });
    }
}

export const createAuction = (auction) => (dispatch, state) => {
    dispatch({type: 'AUCTIONS_LOADING'});
    var token = window.localStorage.getItem("idToken");
    var formData = new FormData();
    for(var key in auction)
    {
        formData.append(key, auction[key]);
    }
    if (token) {
        var auctionCreate = server + "api/product";
        $.ajax({
            url: auctionCreate,
            type: 'post',
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            headers: {
                "x-access-token": token
            },
            dataType: 'json',
            success: function (responceData) {
                dispatch({type: 'CREATE_AUCTION', auction: responceData.data});
            },
            error: function() {
                console.log('error with new auction')
                dispatch({type: 'AUCTION_CREATION_FAILED'})
            }
        });
    }
    else {
        dispatch({type: 'AUCTION_CREATION_FAILED'})
    }
}


export const realtimeBid = (bid_value, product_id)=> (dispatch, state) => {
    var token =  window.localStorage.getItem("idToken");
    var formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('bid_value',bid_value);
    if (token) {
        var addBid = server + "api/bid";         
        $.ajax({
            url: addBid,
            type: 'post',
            dataType: 'json',   
            data: formData,   
            processData: false,
            contentType: false,  
            headers: {
                "x-access-token": token
            },
            success: function (responceData) {
                dispatch({type: 'CREATE_BID', bid: responceData.data}); 
            },
            error: function() {
                console.log('error with new bid');
                dispatch({type: 'BID_CREATION_FAILED'})
            }
        });  
    }
    else {
        console.log("no token identified");
        dispatch({type: 'BID_CREATION_FAILED'})
    }
}

export const productDetails = (product_id)=> (dispatch, state) => {   
    var product_details = server + "/api/product";
    var formData = new FormData();
    formData.append('product_id', product_id);
    $.ajax({
        url: product_details,
        type: 'post',
        dataType: 'json',     
        data: formData,
        contentType:false,
        processData: false, 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (responceData) {
            dispatch({type: 'GET_PRODUCT', product: responceData.data});
        },
        error: function() {
            console.log("error with getting the product details");
            dispatch({type: 'PRODUCT_LOADING_FAILED'})
        }
    });          
}