import React, { Component } from 'react';
import NavBar from '../containers/NavBar';
import RegisterModal from '../containers/RegisterModal';
import LoginModal from '../containers/LoginModal';
import { Link, browserHistory } from 'react-router'
import {
  Spinner
} from 'react-redux-spinner';
import '../styles/spinner.css'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.state = {
      showRegisterModal: false,
      showLoginModal: false
    }
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.location.state) {
        this.setState(nextProps.location.state);
      }
  }

  toggleRegisterModal() {
    this.setState({
        showRegisterModal: !this.state.showRegisterModal
    });
  }

  toggleLoginModal() {
    this.setState({
        showLoginModal: !this.state.showLoginModal
    });
  }

  render() {
    return (
// export default function App({children}) {
//   return (
//     <div>
//       <header>
//         <h1>Peer bids</h1>
//         Links:
//         {' '}
//         <Link to="/">Home</Link>
//         {' '}
//         <Link to="/test">test</Link>
// 	    	{' '}
// 		    <Link to="/signUp">SingUp</Link>
//       </header>
      <div>
        <header>
          <NavBar 
          toggleRegisterModal={this.toggleRegisterModal} 
          toggleLoginModal={this.toggleLoginModal}
          />
        </header>
        {/*User auth spinner*/}
        <div>
          {this.props.loading ? (
          <div>
              <div className="spinner" role="spinner">
              </div>
          </div>) : this.props.children}
        </div>
        {/*Global spinner*/}
        <Spinner>
            <div id="nprogress">
              <div className="spinner" role="spinner">
              </div>
            </div>
          </Spinner>
        <RegisterModal
        modal={this.state.showRegisterModal} 
        toggleModal={this.toggleRegisterModal}
        />
        <LoginModal 
        modal={this.state.showLoginModal} 
        toggleModal={this.toggleLoginModal} 
        />
      </div>
    )
  }
}
