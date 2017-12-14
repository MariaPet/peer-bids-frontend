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
    var getAuctions = "link_to_backend_endpoint";
    $.getJSON(getAuctions).done(data => {
        dispatch({type: 'GET_AUCTIONS', auctions: data});
    })
}