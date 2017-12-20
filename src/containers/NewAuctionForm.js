import NewAuctionForm from '../components/NewAuctionForm';
import { connect } from 'react-redux';
import { createAuction } from '../redux/actions/index';

//For post async requests use this form of mapdispatchtoprops to be able to pass form data
function mapDispatchToProps(auction) { 
    return (dispatch, ownProps) => {
        return {
            createAuction: (auction) => dispatch(createAuction(auction))
        }
    }
}

export default connect(
    (state, props) => ({
        auction: state.auctions.newAuction,
        currentUser: state.user.currentUser
    }),
    mapDispatchToProps
)(NewAuctionForm);
