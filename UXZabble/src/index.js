import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify'
import config from './config.json'
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
Amplify.configure({
    Auth:{
        mandatorySignId:true,
        region:config.cognito.REGION,
        userPoolId:config.cognito.USER_POOL_ID,
        userPoolWebClientId:config.cognito.APP_CLIENT_ID
    },
    API: {
		endpoints: [
			{
                name: "api_platform",
				endpoint: "https://q4q8qnkav9.execute-api.us-east-1.amazonaws.com/dev/dashboard",
				region: "us-east-1"
			}
		]
	}

})



const history = createBrowserHistory();

const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
if (path) {
    history.replace(path);
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
