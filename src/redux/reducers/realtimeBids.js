export default function bid(state = {bid: null, loading: false}, action) {
    switch (action.type) {
        // case 'GET_BID':
        // return {...state,
        //     bid: action.bid,
        //     loading: false
        // }
        case 'CREATE_BID':
        return {...state,
            bid: action.bid, 
            loading: false, //
        }
        case 'BID_CREATION_FAILED': 
        return {...state,
            bid: null,
            loading:false
        }
        default:
            return state;
    }
}