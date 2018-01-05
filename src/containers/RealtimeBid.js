import RealtimeBid from '../components/RealtimeBid';
import { connect } from 'react-redux';
import { realtimeBid, realtimeUpdate } from '../redux/actions/index';

function mapDispatchToProps(bidData) { 
    return (dispatch, ownProps) => {
        return {
            realtimeBid: (bidData) => dispatch(realtimeBid(bidData)),
            realtimeUpdate: (bidData) => dispatch(realtimeUpdate(bidData))
        }
    }
}

export default connect(
    (state, props) => ({
        productOwner: state.realtimeBid.productOwner,
        product_id: state.realtimeBid.product_id,
        stream: state.realtimeBid.stream,
        currentUser: state.user.currentUser       
    }),
    mapDispatchToProps
)(RealtimeBid);
