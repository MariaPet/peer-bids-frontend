export default function auctions(state = {auctionsList: [], newAuction: null, loading: false}, action) {
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
        case 'CREATE_AUCTION':
        return {...state,
            newAuction: action.auction,
            loading: false,
        }
        case 'AUCTION_CREATION_FAILED':
        return {...state,
            newAuction: null,
            loading:false
        }
        default:
            return state;
    }
}