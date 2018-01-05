export default function bid(state = {product_id: null, productOwner: null, loading: false, stream: null}, action) {
    switch (action.type) {
        case 'CREATE_BID':
        return {...state,
            productOwner: action.productOwner, 
            loading: false
        }
        case 'GET_PRODUCT_DATA': 
        return {...state,
            productOwner: action.productOwner,
            stream: action.stream,
            product_id: action.product_id,
            loading: false
        }
        case 'BID_ACTION_LOADING':
        return {...state,
            loading: true
        }
        case 'BID_ACTION_FAILED':
        return {...state,
            loading: false
        }
        case 'INITIALIZE_STREAM':
        return {...state,
            source: action.source
        }
        case 'REALTIME_UPDATE_OWNER':
        let updateOwner = state.productOwner
        updateOwner['auctions'][state.product_id]['min_price'] = action.event.data.min_price
        debugger;
        return {...state,
            productOwner: updateOwner
        }
        default:
            return state;
    }
}