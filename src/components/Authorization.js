import { Component } from 'react';
import PropTypes from 'prop-types'

export default class Authorization extends Component {
    
    /*constructor(props) {
        super(props);
    }*/
    static PropTypes = {
        routes: PropTypes.array.isRequired
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentWillMount() {
        //const { routes } = this.props;
        const { router } = this.context;
        //check if there is current user
        if (!this.props.currentUser) {
            router.push({pathname: '/', state:{showLoginModal: true}});
        }
    }
}