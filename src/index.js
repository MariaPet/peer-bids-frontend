import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import MapView from './components/MapView';
import UserProfile from './containers/UserProfile'
import NewAuctionForm from './containers/NewAuctionForm'
import RealtimeBid from './containers/RealtimeBid'
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store/config';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import FrontSearch from './containers/FrontSearch';
import {refreshToken} from './redux/actions/index';

store.dispatch(refreshToken);
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>
            <Route path="/" component={App}>
                {/*IndexRoute component holds the body of the homepage*/}
                <IndexRoute component={FrontSearch}/>
                <Route path="map" component={MapView}/>
                <Route path="profile" component={UserProfile} />
                <Route path="new" component={NewAuctionForm} />
                <Route path="/realtime-bid/:auction" component={RealtimeBid}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
