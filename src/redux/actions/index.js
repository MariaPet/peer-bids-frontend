import $ from 'jquery'
import { browserHistory } from 'react-router'
import {
    pendingTask, // The action key for modifying loading state
    begin, // The action value if a "long" running task begun
    end // The action value if a "long" running task ended
  } from 'react-redux-spinner';

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
    dispatch({type: 'AUCTIONS_LOADING'});
    var getAuctions = "http://localhost:5000/api/product";
    $.getJSON(getAuctions).done(data => {
        dispatch({type: 'GET_AUCTIONS', auctions: data});
    })
}

export const registerUser = (user) => (dispatch, state) => {
    dispatch({type: 'AUTHENTICATION_LOADING', [ pendingTask ]: begin});
    var registerUser = "http://localhost:5000/signup";
    $.post(registerUser, user, (responceData) => {
        dispatch({type: 'REGISTER', user: responceData.data, [ pendingTask ]: end});
        browserHistory.push({pathname: '/', state:{showRegisterModal: false}});
    }, "json").fail(() => dispatch({type: 'AUTHENTICATION_FAILED', [ pendingTask ]: end}));
}

export const login = (credentials) => (dispatch, state) => {
    dispatch({type: 'AUTHENTICATION_LOADING', [ pendingTask ]: begin});
    var loginUser = "http://localhost:5000/login";
    $.post(loginUser, credentials, (responceData) => {
        window.localStorage.setItem("idToken", responceData.data.idToken);
        window.localStorage.setItem("refreshToken", responceData.data.refreshToken);
        window.localStorage.setItem("userId", responceData.data.localId);
        dispatch({type: 'LOGIN', user: responceData.user, [ pendingTask ]: end});
        browserHistory.push({pathname: '/', state:{showLoginModal: false}});
    }, "json").fail(() => dispatch({type: 'AUTHENTICATION_FAILED', [ pendingTask ]: end}));
}

export const refreshToken = (dispatch, state) => {
    dispatch({type: 'AUTHENTICATION_LOADING', [ pendingTask ]: begin});
    let refreshTokenUrl = "http://localhost:5000/refresh";
    let refreshToken = window.localStorage.getItem("refreshToken");
    if (refreshToken) {
        $.post(refreshTokenUrl, {refreshToken}, (responceData) => {
                window.localStorage.setItem("idToken", responceData.data.idToken);
                window.localStorage.setItem("refreshToken", responceData.data.refreshToken);
                window.localStorage.setItem("userId", responceData.data.userId);
                dispatch({type: 'REFRESH_TOKEN', user: responceData.user, [ pendingTask ]: end})
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

export const uploadImage = (image) => (dispatch, state) => {
    var token = window.localStorage.getItem("idToken");
    if (token) {
        var auctionCreate = "http://localhost:5000/upload";
        $.ajax({
            url: auctionCreate,
            type: 'post',
            data: {},
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
}

export const createAuction = (auction) => (dispatch, state) => {
    dispatch({type: 'AUCTIONS_LOADING'});
    var token = window.localStorage.getItem("idToken");
    if (token) {
        var auctionCreate = "http://localhost:5000/api/product";
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

