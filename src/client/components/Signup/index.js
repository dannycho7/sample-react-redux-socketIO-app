import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Form from "./Form";
import { signup } from "../../actions";

const mapStateToProps = (state) => {
	const { isAuthenticated } = state.auth.isAuthenticated;
	return {
		isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signup: (values, history) => dispatch(signup(values, history))
	};
};

const Signup = ({ match, signup, history, isAuthenticated }) => {
	return (
		isAuthenticated ? <Redirect to="/" /> : (
			<div>
				<h1>Signup</h1>
				<Form handleSubmit={ (values) => signup(values, history) }/>
			</div>
		)
	);
};

export default connect(null, mapDispatchToProps)(Signup);
