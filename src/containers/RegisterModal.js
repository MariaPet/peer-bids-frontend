import RegisterModal from '../components/RegisterModal'
import { connect } from 'react-redux'
import { registerUser } from '../redux/actions/index'

//For post async requests use this form of mapdispatchtoprops to be able to pass form data
function mapDispatchToProps(user) { 
    return (dispatch, ownProps) => {
        return {
            registerUser: (user) => dispatch(registerUser(user))
        }
    }
}

export default connect(
    (state, props) => ({user: state.user}),
    mapDispatchToProps
)(RegisterModal)
