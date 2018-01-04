import RealtimeBid from '../components/RealtimeBid';
import { connect } from 'react-redux';
import { productDetails } from '../redux/actions/index';

function mapDispatchToProps(product_id) { 
    return (dispatch, ownProps) => {
        return {
            productDetails: (product_id) => dispatch(productDetails(product_id))
        }
    }
}

export default connect(
    (state, props) => ({
        product_id: state.product_id
    }),
    mapDispatchToProps
)(RealtimeBid);
