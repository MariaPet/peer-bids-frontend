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
    dispatch({type: 'AUTHENTICATION_LOADING'});
    var loginUser = "http://localhost:5000/login";
    $.post(loginUser, credentials, (responceData) => {
        window.localStorage.setItem("token", responceData.token);
        dispatch({type: 'LOGIN', user: responceData.data});
    }, "json").fail(() => dispatch({type: 'AUTHENTICATION_FAILED'}));
}

export const logout = (dispatch, state) => {
    window.localStorage.removeItem("token");
    dispatch({type: 'LOG_OUT'});
}

export const createAuction = (auction) => (dispatch, state) => {
    dispatch({type: 'AUCTIONS_LOADING'});
    var token = window.localStorage.getItem("token");
    if (token) {
        var auctionCreate = "http://localhost:5000/api/product";
        // $.post(auctionCreate, auction, (responceData) => {
        //     dispatch({type: 'CREATE_AUCTION', auction: responceData.data});
        // }, "json").fail(() => dispatch({type: 'AUCTION_CREATION_FAILED'}));
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

