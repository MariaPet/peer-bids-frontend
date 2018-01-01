// import RealtimeBid from '../components/RealtimeBid';
import { connect } from 'react-redux';
import { productDetails } from '../redux/actions/index';

function mapDispatchToProps(credentials) {
    return (dispatch, ownProps) => {
        return {
            productDetails: (product_id) => dispatch(productDetails(product_id))
        }
    }
}

export default connect(
    (state, props) => ({
        loading: state.user.loading  //?
    }),
    mapDispatchToProps
)(RealtimeBid);