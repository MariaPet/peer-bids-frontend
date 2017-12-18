import React, { Component } from 'react';
import NavBar from './NavBar';
import RegisterModal from './RegisteModal';
import { Link, browserHistory } from 'react-router'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    this.state = {
      showRegisterModal: false
    }
  }

  toggleRegisterModal() {
    this.setState({
        showRegisterModal: !this.state.showRegisterModal
    });
  }

  render() {
    return (
      <div>
        <header>
          <NavBar toggleRegisterModal={this.toggleRegisterModal}/>
        </header>
        <div>
          {this.props.children}
        </div>
        <RegisterModal modal={this.state.showRegisterModal} toggleModal={this.toggleRegisterModal}/>
      </div>
    )
  }
}
