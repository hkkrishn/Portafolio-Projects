import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard'
import Products from './components/Products';
import ProductAdmin from './components/ProductAdmin';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import Footer from './components/Footer';
import axios from 'axios'
import {Auth} from 'aws-amplify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import cors from 'cors'

library.add(faEdit);

//Pool Id us-east-1_v2WSGjLRf for dashboard users only
//Testpas$1 new
cors()
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      ThereisDashboard:false,
      isAuthenticated:false,
      isAuthenticating:true, //value to prevent rendering before user is authenticated
      user:null,
      dashboard:null,
      params : {
        AwsAccountId: '', /* required */
        DashboardId: '', /* required */
        IdentityType: 'IAM', /* required */
      }
    }

  }

  isDashboarded = dashboarded =>  this.setState({ThereisDashboard:dashboarded})
  setDashbaord = (durl) =>{
    this.setState({dashboard:durl})
    console.log(this.state)
  }

  setAuthStatus = authenticated => this.setState({isAuthenticated:authenticated})
  setUser = userdata =>{
    this.setState({user:userdata})
    console.log(this.state)
  }






   async componentDidMount(){
      try{
        const session = await Auth.currentSession();//retireve session object from local storage and the token gets refreshed automatically
        this.setAuthStatus(true)
        console.log(session);

        const user =  await Auth.currentAuthenticatedUser();
        console.log(user)
        this.setUser(user)
      }catch(error){
        console.log(error.message)
      }
      this.setState({isAuthenticating:false})
  }
  render() {

    const Authprops = {
      isAuthenticated:this.state.isAuthenticated,
      user:this.state.user,
      setAuthStatus:this.setAuthStatus,
      setUser:this.setUser,
      isDashboarded:this.isDashboarded,
      ThereisDashboard:this.state.ThereisDashboard,
      dashboard:this.state.dashboard,
      setDashboard:this.setDashbaord,
      params:this.state.params
    }
    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Router>
          <div>
            <Navbar Authprops = {Authprops} />
            <Switch>
              <Route exact path="/" render = {(props)=><LogIn  {...props} Authprops = {Authprops}/> }/>
              <Route exact path="/dashboard" render = {(props)=><Dashboard  {...props} Authprops = {Authprops}/> }/>
              <Route exact path="/products" render = {(props)=><Products {...props} Authprops = {Authprops}/> } />
              <Route exact path="/admin" render = {(props)=><ProductAdmin {...props}  Authprops = {Authprops}/> } />
              {/* <Route exact path="/home"  render = {(props)=><Home {...props}  Authprops = {Authprops}/> } /> */}
              <Route exact path="/register" render = {(props)=><Register {...props} Authprops = {Authprops}/> } />
              <Route exact path="/forgotpassword" render = {(props)=><ForgotPassword {...props} Authprops = {Authprops}/> } />
              <Route exact path="/forgotpasswordverification" render = {(props)=><ForgotPasswordVerification {...props}  Authprops = {Authprops}/> } />
              <Route exact path="/changepassword" render = {(props)=><ChangePassword {...props} Authprops = {Authprops}/> } />
              <Route exact path="/changepasswordconfirmation" render = {(props)=><ChangePasswordConfirm {...props}  Authprops = {Authprops}/> } />
              <Route exact path="/welcome" render = {(props)=><Welcome {...props} Authprops = {Authprops}/> } />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
