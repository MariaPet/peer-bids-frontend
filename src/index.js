import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Test from './components/Test';
import ApiData from './containers/ApiData';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store/config';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>
            <Route path="/" component={App}>
                {/*IndexRoute component holds the body of the homepage*/}
                <IndexRoute component={ApiData}/>
                <Route path="test" component={Test}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
