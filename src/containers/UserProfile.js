import UserProfile from '../components/UserProfile';
import { connect } from 'react-redux';
import { uploadImage } from '../redux/actions/index';

function mapDispatchToProps(image) { 
    return (dispatch, ownProps) => {
        return {
            uploadImage: (image) => dispatch(uploadImage(image))
        }
    }
}

export default connect(
    (state, ownProps) => ({currentUser: state.user.currentUser}),
    mapDispatchToProps
)(UserProfile);