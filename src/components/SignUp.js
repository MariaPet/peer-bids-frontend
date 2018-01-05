import React from 'react';
// import './SignUp.css';
//import ReactCSSTransitionGroup from 'react-transition-group';
var createReactClass = require('create-react-class');
var Input = createReactClass({
	render: function() {
		return (
			<div className="Input">
				<input 
					id={this.props.id}
					autoComplete="false"
					required
					type={this.props.type}
					placeholder={this.props.placeholder}
				/>	
				<label htmlFor={this.props.id}></label>
			</div>
		);
	}
});

var Modal = createReactClass({
	render: function() {
		return (
			<div className="Modal">
				<form 
					onSubmit={this.props.onSubmit}
					className="ModalForm">
					<Input
						id="name"
						type="text"
						placeholder="Name" />
					<Input
						id="username"
						type="email"
						placeholder="Email" />
					<Input
						id="password"
						type="password"
						placeholder="password" />
            <Input
						id="Telephone"
						type="text"
						placeholder="phone number" />
            <Input
						id="Street"
						type="text"
						placeholder="Street name" />
            <Input
						id="City"
						type="text"
						placeholder="city name" />
            <Input
						id="Postal Code"
						type="text"
						placeholder="postal code" />
            
					<button>
						Sign Up <i className="fa fa-fw fa-chevron-right"></i>
					</button>
				</form>
			</div>
		);
	}
});

var SignUp = createReactClass({
	
	getInitialState: function() {
		return { mounted: false };
	},
	
	componentDidMount: function() {
		this.setState({ mounted: true });
	},
	
	handleSubmit: function(e) {
		this.setState({ mounted: false });
		e.preventDefault();
	},

	render: function() {
		var child;

		if(this.state.mounted) {
			child = (<Modal onSubmit={this.handleSubmit} />);
		}
		
		return(
			<div className="SignUp">
				{/* <ReactCSSTransitionGroup 
					transitionName="example"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
						{child}
        </ReactCSSTransitionGroup> */}
        {child}
			</div>
		);
	}
});

export default SignUp;































