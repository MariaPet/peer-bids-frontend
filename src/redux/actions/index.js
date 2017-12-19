import $ from 'jquery'

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
    dispatch({type: 'AUTHENTICATION_LOADING'});
    var registerUser = "http://localhost:5000/signup";
    $.post(registerUser, user, (responceData) => {
        dispatch({type: 'REGISTER', user: responceData.data});
    }, "json").fail(() => dispatch({type: 'AUTHENTICATION_FAILED'}));
}

export const login = (credentials) => (dispatch, state) => {
    debugger;
    dispatch({type: 'AUTHENTICATION_LOADING'});
    var loginUser = "http://localhost:5000/login";
    $.post(loginUser, credentials, (responceData) => {
        dispatch({type: 'LOGIN', user: responceData.data});
    }, "json").fail(() => dispatch({type: 'AUTHENTICATION_FAILED'}));
}

export const logout = (dispatch, state) => {
    dispatch({type: 'LOG_OUT'});
    //delete token from local storage
}