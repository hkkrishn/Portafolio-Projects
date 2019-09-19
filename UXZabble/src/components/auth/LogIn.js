import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import {Auth} from 'aws-amplify'
import AWS,{sts} from 'aws-sdk';
import superagent from 'superagent'
import {AuthenticationDetails, CognitoUserPool, CognitoUserAttribute, CognitoUser } from  'amazon-cognito-identity-js'
import $ from 'min-jquery'
import {API} from 'aws-amplify';
import axios from 'axios'
import { stringify } from 'querystring';
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');


class LogIn extends Component {
  constructor(){
    super()
    this.state = {
      username: "",
      password: "",
      errors: {
        cognito: null,
        blankfield: false
      }
    };

    }



  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here


    // try{
  //     var data = { UserPoolId : 'us-east-1_2v3qndK4E',
  //     ClientId : '12345du353sm7khjj1q'
  // };
  // var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
  // var cognitoUser = userPool.getCurrentUser();

  // if (cognitoUser != null) {
  //     cognitoUser.getSession(function(err, session) {
  //         if (err) {
  //             alert(err);
  //             return;
  //         }
  //         console.log('session validity: ' + session.isValid());
  //     });
  // }


  const {username,email,password} = this.state;
      var authenticationData = {
        Username : username,
        Password : password,
    };
  const {setAuthStatus,setUser,setDashboard,isDashboarded} = this.props.Authprops
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var poolData = { UserPoolId : 'us-east-1_2v3qndK4E',
        ClientId : '1qadhh9glu1hk110ciiqe3k40p'
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    console.log(userPool)
    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    try{
    const user = await cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            var accessToken = result.getAccessToken().getJwtToken();
            console.log(accessToken)
            console.log('hello')

            /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
            var idToken =  result.idToken.jwtToken;

            console.log(idToken)


            var cognitoUser = userPool.getCurrentUser();
            if (cognitoUser != null) {
	          cognitoUser.getSession(function(err, result) {
		       if (result) {
			      console.log('You are now logged in.');


		}
	});
}

            

            const dashboardgetter = (url,headers,body
              ) => {
                  // Default options are marked with *
                  console.log(JSON.stringify(body))
                  console.log(headers)
                  console.log('fetch request')

                  return fetch(url, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'cors', // no-cors, cors, *same-origin
                        withCredentials:true,
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials:'omit',
                        body:JSON.stringify(body),
                        headers:headers,
                      //   body:data_in, // include, *same-origin, omit
                      //   headers:headers,
                        redirect: 'follow', // manual, *follow, error
                        referrer: 'no-referrer' // no-referrer, *client
                        // body data type must match "Content-Type" heade
                      }).then((res) => {
                        console.log(headers)
                        console.log("this is the response", res.body)
                        return res.json()
                      }).then((finalres) =>{
                        console.log(finalres)
                        isDashboarded(true)
                        setDashboard(finalres.dashboard_url.EmbedUrl)
                        console.log(finalres.dashboard_url.EmbedUrl)
                      })
                      .catch((err) => {
                        console.log(err)
                      })
              }
              dashboardgetter('https://q4q8qnkav9.execute-api.us-east-1.amazonaws.com/dev/dashboard',{'Authorization':idToken},{email_id:'niks.august@gmail.com'})




        },
        onFailure:(err) => {
            console.log(err);
        },
    });
   setAuthStatus(true)
   setUser(user)
    console.log(cognitoUser)
    
    this.props.history.push("/dashboard")
  }catch(error){
    console.log(error)
  }





    // const user = await Auth.signIn({
      //   username,
      //   password

      // });
      // console.log(user)
      // this.props.Authprops.setAuthStatus(true)
      // this.props.Authprops.setUser(user)
      // console.log(user)
      // this.props.history.push("/")

    // }catch(error){
    //   let err = null
    //   !error.message ? err = {"message":error}:err = error
    //   this.setState({errors:{
    //     ...this.state.errors,
    //     cognito:error
    //   }})


    // }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Log in</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  id="username"
                  aria-describedby="usernameHelp"
                  placeholder="Enter username or email"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default LogIn;