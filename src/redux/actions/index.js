import $ from 'jquery'
import { browserHistory } from 'react-router'
import {
    pendingTask, // The action key for modifying loading state
    begin, // The action value if a "long" running task begun
    end // The action value if a "long" running task ended
  } from 'react-redux-spinner';

const server = 'http://localhost:5000/';
// const server = 'https://peer-bids-back-end.appspot.com/';

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

export const getAuctions = (dispatch, state) => {
    dispatch({type: 'AUCTIONS_LOADING', [ pendingTask ]: begin});
    var getAuctions = server + "api/product";
    $.getJSON(getAuctions).done(responceData => {
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
    if (token) {
        var auctionCreate = server + "api/product";
        $.ajax({
            url: auctionCreate,
            type: 'post',
            data: auction,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
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

export const realtimeBid = (bid_value)=> (dispatch, state) => {
    dispatch({type: 'BID_LOADING'});
    var token = window.localStorage.getItem("token");
    if (token) {
        var addBid = server + "api/realtime_bid/<p_id>'";
        $.ajax({
            url: addBid,
            type: 'post',
            data: bid_value,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "x-access-token": token
            },
            dataType: 'json',
            success: function (responceData) {
                dispatch({type: 'CREATE_AUCTION', auction: responceData.data});
            },
            error: function() {
                console.log('error with new bid')
                dispatch({type: 'BID_ADDING_FAILED'})
            }
        });  
    }
    else {
        dispatch({type: 'BID_ADDING_FAILED'})
    }
}

   