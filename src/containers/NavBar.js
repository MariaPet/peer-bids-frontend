import NavBar from '../components/NavBar';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/index'

export default connect(
    (state, props) => ({currentUser: state.user.currentUser}),
    { logout: () => logout }
)(NavBar);