import App from '../components/App';
import { connect } from 'react-redux';

export default connect(
    (state, props) => ({
        currentUser: state.user.currentUser,
        loading: state.user.loading,
    }),
    {}
)(App);