import MapView from '../components/MapView'
import { connect } from 'react-redux'
import { getAuctions } from '../redux/actions/index'

export default connect(
    (state, ownProps) => ({
        auctions: state.auctions.auctionsList,
        loading: state.auctions.loading
    }),
    { getAuctions: () => getAuctions}
)(MapView)