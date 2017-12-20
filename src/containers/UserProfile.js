import UserProfile from '../components/UserProfile';
import { connect } from 'react-redux';

export default connect(
    (state, ownProps) => ({currentUser: state.user.currentUser}),
    {}
)(UserProfile);