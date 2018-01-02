export default function bids(state = {bidsList: [], newBids: null, loading: false}, action) {
    switch (action.type) {
        case 'GET_BIDS':
        return {...state,
            bidsList: action.bid,
            loading: false
        }
        case 'BIDS_LOADING':
        return {...state,
            loading: true
        }
        case 'CREATE_BID':
        return {...state,
            newBid: action.bid,
            loading: false,
        }
        case 'BID_CREATION_FAILED':
        return {...state,
            newBid: null,
            loading:false
        }
        default:
            return state;
    }
}