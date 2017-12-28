
import realtimeBid from '../components/RealtimeBid';
import { connect } from 'react-redux';
import { realtimeBid } from '../redux/actions/index';

function mapDispatchToProps(bid_value) { 
    return (dispatch, ownProps) => {
        return {
            realtimeBid: (bid_value) => dispatch(realtimeBid(bid_value))
        }
    }
}

export default connect(
    (state, props) => ({
        bid_value: state.bid
    }),
    mapDispatchToProps
)(realtimeBid);
