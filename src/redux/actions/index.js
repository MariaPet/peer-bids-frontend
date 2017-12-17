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
        debugger;
        dispatch({type: 'GET_AUCTIONS', auctions: data});
    })
}

export const registerUser = (dispatch, state) => {
    dispatch({type: 'AUTHENTICATION_LOADING'});
    var registerUser = "register_enpoint";
    //JSON call post
}

export const login = (dispatch, state) => {
    dispatch({type: 'AUTHENTICATION_LOADING'});
    var loginUser = "login_endpoint";
    //JSON call get
}

export const logout = (dispatch, state) => {
    dispatch({type: 'LOG_OUT'});
    //delete token from local storage
}