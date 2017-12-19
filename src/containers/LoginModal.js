import LoginModal from '../components/LoginModal';
import { connect } from 'react-redux';
import { login } from '../redux/actions/index';

//For post async requests use this form of mapdispatchtoprops to be able to pass form data
function mapDispatchToProps(credentials) {
    return (dispatch, ownProps) => {
        return {
            loginUser: (credentials) => dispatch(login(credentials))
        }
    }
}

export default connect(
    (state, props) => ({user: state.user}),
    mapDispatchToProps
)(LoginModal);