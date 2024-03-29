import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";
import configureStore from "./stores";

import App from "./components/App";
import Chat from "./components/Chat";
import Signup from "./components/Signup";
import Login from "./components/Login";

const preloadedState = window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);

delete window.__PRELOADED_STATE__;

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/" component={Chat} />
				</Switch>
			</App>
		</Router>
	</Provider>,
	document.getElementById("root")
);