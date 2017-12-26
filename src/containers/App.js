import App from '../components/App';
import { connect } from 'react-redux';
import { refreshToken } from '../redux/actions/index'

export default connect(
    (state, props) => ({
        currentUser: state.user.currentUser,
    }),
    {refreshToken: () => refreshToken}
)(App);