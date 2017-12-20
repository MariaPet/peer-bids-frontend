import NewAuctionForm from '../components/NewAuctionForm';
import { connect } from 'react-redux';
import { createAuction } from '../redux/actions/index';

//For post async requests use this form of mapdispatchtoprops to be able to pass form data
function mapDispatchToProps(user) { 
    return (dispatch, ownProps) => {
        return {
            createAuction: (user) => dispatch(createAuction(user))
        }
    }
}

export default connect(
    (state, props) => ({user: state.user}),
    mapDispatchToProps
)(NewAuctionForm);
