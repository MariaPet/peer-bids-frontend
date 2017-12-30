import UserProfile from '../components/UserProfile';
import { connect } from 'react-redux';
import { uploadImage } from '../redux/actions/index';

function mapDispatchToProps(picture) { 
    return (dispatch, ownProps) => {
        return {
            uploadImage: (picture) =>  dispatch(uploadImage(picture))
        }
    }
}

export default connect(
    (state, ownProps) => ({currentUser: state.user.currentUser}),
    mapDispatchToProps
)(UserProfile);