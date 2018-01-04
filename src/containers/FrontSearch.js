import FrontSearch from '../components/FrontSearch'
import { connect } from 'react-redux'
import {getAuctions} from '../redux/actions/index'

function mapDispatchToProps(searchTerms) {
    return (dispatch, ownProps) => {
        return {
            onSearch: (searchTerms) => dispatch(getAuctions(searchTerms))
        }
    }
}

export default connect(
    (state, ownProps) => ({data: state.auctions}),
    mapDispatchToProps
)(FrontSearch)