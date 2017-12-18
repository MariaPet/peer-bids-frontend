import RegisterModal from '../components/RegisteModal'
import { connect } from 'react-redux'
import { registerUser } from '../redux/actions/index'

export default connect(
    (state, props) => ({user: state.user}),
    { registerUser: () => registerUser }
)(RegisterModal)