export default function bid(state = {productOwner: null, bid: null, loading: false}, action) {
    switch (action.type) {
        case 'CREATE_BID':
        return {...state,
            productOwner: action.productOwner, 
            loading: false
        }
        case 'GET_PRODUCT_DATA':
        return {...state,
            productOwner: action.productOwner,
            loading: false
        }
        case 'BID_ACTION_LOADING':
        return {...state,
            productOwner: null,
            loading: true
        }
        case 'BID_ACTION_FAILED':
        return {...state,
            productOwner: null,
            loading: false
        }
        default:
            return state;
    }
}