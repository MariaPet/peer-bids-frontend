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
        if (responceData.status && responceData.status.code === 200) {
            dispatch({type: 'REGISTER', message: "You have registered successfully! You can now login.", [ pendingTask ]: end});
            browserHistory.push({pathname: '/', state:{showRegisterModal: false}});
        }
        else {
            dispatch({type: 'AUTHENTICATION_FAILED', [ pendingTask ]: end})
        }
    }, "json").fail(() => dispatch({type: 'AUTHENTICATION_FAILED', [ pendingTask ]: end}));
}

export const login = (credentials) => (dispatch, state) => {
    dispatch({type: 'AUTHENTICATION_LOADING', [ pendingTask ]: begin});
    var loginUser = server + "login";
    $.post(loginUser, credentials, (responceData) => {
        if (responceData.status && responceData.status.code === 200) {
            window.localStorage.setItem("idToken", responceData.token);
            dispatch({type: 'LOGIN', user: responceData.data.claims, [ pendingTask ]: end});
            browserHistory.push({pathname: '/', state:{showLoginModal: false}});
        }
        else {
            dispatch({type: 'LOGIN_ERROR', message: responceData.msg})
            dispatch({type: 'AUTHENTICATION_FAILED', [ pendingTask ]: end})
        }
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

export const uploadImage = (pictureState) => (dispatch, state) => {
    dispatch({type: 'UPLOAD_FILE_LOADING'});
    var token = window.localStorage.getItem("idToken");
    var formData = new FormData();
    formData.append('profilePic', pictureState['picture']);
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
                "x-access-token": token
            },
            dataType: 'json',
            success: function (responceData) {
                dispatch({type: 'PROFILE_IMG_UPDATE', url: responceData.data.profileImg});
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
        if(key === "pictures") {
            for (var i=0; i < auction.pictures.length; i++) {
                formData.append("photo_url[]", auction.pictures[i]);
            }
        }
        else {
            formData.append(key, auction[key]);
        }   
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
            dataType: 'json',
            headers: {
                "x-access-token": token
            },
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


export const realtimeBid = (bidData)=> (dispatch, state) => {
    dispatch({type: 'BID_ACTION_LOADING', [ pendingTask ]: begin});
    var token =  window.localStorage.getItem("idToken");
    if (token) {
        var addBid = server + "api/bid";         
        $.ajax({
            url: addBid,
            type: 'post',
            dataType: 'json',   
            data: bidData,     
            headers: {
                "x-access-token": token
            },
            dataType: 'json',
            success: function (responceData) {
                dispatch({type: 'CREATE_BID', productOwner: responceData.data, [ pendingTask ]: end}); 
            },
            error: function() {
                console.log('error with new bid');
                dispatch({type: 'BID_ACTION_FAILED', [ pendingTask ]: end})
            }
        });  
    }
    else {
        console.log("no token identified");
        dispatch({type: 'BID_ACTION_FAILED', [ pendingTask ]: end})
    }
}

export const getAuction = (product_id )=> (dispatch, state) => {   
    var product_details = server + "api/product/" + product_id;
    dispatch({type: 'BID_ACTION_LOADING', [ pendingTask ]: begin});
    var token =  window.localStorage.getItem("idToken");
    if (token) {
        $.ajax({
            url: product_details,
            type: 'get',
            dataType: 'json',
            success: function (responceData) {
                dispatch({type: 'GET_PRODUCT_DATA', productOwner: responceData.data, stream: responceData.data.stream_url, product_id, [ pendingTask ]: end});
                browserHistory.push({pathname: '/realtime-bid/' + product_id});
            },
            error: function() {
                dispatch({type: 'BID_ACTION_FAILED', [ pendingTask ]: end})
            }
        });
    }
    else {
        dispatch({type: 'BID_ACTION_FAILED', [ pendingTask ]: end})
    }          
}

export const realtimeUpdate = (event) => (dispatch, state) => {
    if (event.path === "/auctions/" + state().realtimeBid.product_id) {
        dispatch({type: 'REALTIME_UPDATE_PRICE', event: event});
    }
    if (event.path.indexOf("/auctions/" + state().realtimeBid.product_id + '/bids/') === 0 ) {
        dispatch({type: 'REALTIME_UPDATE_BIDS', event: event, bidId: event.path.split('/')[4]});
    }
    
}