import React, { Component } from 'react';
import NavBar from './NavBar';
import RegisterModal from '../containers/RegisterModal';
import LoginModal from '../containers/LoginModal';
import { Link, browserHistory } from 'react-router'


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
      <div>
        <header>
          <NavBar 
          toggleRegisterModal={this.toggleRegisterModal} 
          toggleLoginModal={this.toggleLoginModal}
          />
        </header>
        <div>
          {this.props.children}
        </div>
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
