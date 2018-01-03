import RealtimeBid from '../components/RealtimeBid';
import { connect } from 'react-redux';
import { realtimeBid } from '../redux/actions/index';

function mapDispatchToProps(bidData) { 
    return (dispatch, ownProps) => {
        return {
            realtimeBid: (bidData) => dispatch(realtimeBid(bidData))
        }
    }
}

export default connect(
    (state, props) => ({
        productOwner: state.realtimeBid.productOwner,
        currentUser: state.user.currentUser        
    }),
    mapDispatchToProps
)(RealtimeBid);
