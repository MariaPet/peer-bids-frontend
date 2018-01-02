import RealtimeBid from '../components/RealtimeBid';
import { connect } from 'react-redux';
import { realtimeBid } from '../redux/actions/index';

function mapDispatchToProps(bid_value,product_id) { 
    return (dispatch, ownProps) => {
        return {
            realtimeBid: (bid_value,product_id) => dispatch(realtimeBid(bid_value,product_id))
        }
    }
}

export default connect(
    (state, props) => ({
        // bid_value: state.realtimeBid.bid_value,
        // product_id: state.product_id,
        currentUser: state.user.currentUser        
    }),
    mapDispatchToProps
)(RealtimeBid);
