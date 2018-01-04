import MapView from '../components/MapView'
import { connect } from 'react-redux'
import { getAuctions, getAuction } from '../redux/actions/index'

function mapDispatchToProps(product_id) { 
    return (dispatch, ownProps) => {
        return {
            getAuction: (product_id) => dispatch(getAuction(product_id)),
            getAuctions: () => getAuctions
        }
    }
}

export default connect(
    (state, ownProps) => ({
        currentUser: state.user.currentUser,
        auctions: state.auctions.auctionsList,
        loading: state.realtimeBid.loading
    }),
    mapDispatchToProps
)(MapView)