import FrontSearch from '../components/FrontSearch'
import { connect } from 'react-redux'
import {getAuctions} from '../redux/actions/index'

export default connect(
    (state, ownProps) => ({data: state.auctions}),
    { onSearch: () => getAuctions}
)(FrontSearch)