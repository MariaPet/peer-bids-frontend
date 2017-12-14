export default function auctions(state = {auctionsList: [], loading: false}, action) {
    switch (action.type) {
        case 'GET_AUCTIONS':
        return {...state,
            auctionsList: action.auctions,
            loading: false
        }
        case 'AUCTIONS_LOADING':
        return {...state,
            loading: true
        }
        default:
            return state;
    }
}