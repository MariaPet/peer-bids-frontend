export default function user(state = {auction: null, loading: false}, action) {
    switch (action.type) {
        case 'AUCTION_CREATION_LOADING':
            return {...state,
                loading: true
            }
        case 'CREATE_AUCTION':
            return {...state,
                auction: action.auction,
                loading: false,
            }
        case 'AUCTION_CREATION_FAILED':
            return {...state,
                auction = null,
                loading:false

            }
        default:
            return state;
    }
}