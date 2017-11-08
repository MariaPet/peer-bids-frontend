import ApiData from '../components/ApiData'
import { connect } from 'react-redux'
import { getApiData } from '../redux/actions/index'

// const mapStateToProps = (state, ownProps) => {
//     return {
//         data: state.api
//     }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         onFlaskData: () => dispatch(getApiData)
//     }
// }

export default connect(
    (state, ownProps) => ({data: state.api}),
    { onFlaskData: () => getApiData}
)(ApiData)

 