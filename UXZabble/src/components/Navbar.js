import React, { Component } from 'react'
import { Auth } from 'aws-amplify';
import { IoIosMenu } from "react-icons/io";

export default class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showMainMenu: false,
      showItemMenu: false
    }
  }

  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.Authprops.setAuthStatus(false)
      this.props.Authprops.setUser(null)
      window.location.href = '/';
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item nav-logo_container" href="/">

            <img src={require("./zabblezerologo.png")} alt="zabble logo" className="nav-logo" />


          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          {/* <div className="navbar-start">
            <a href="/products" className="navbar-item">
              <span className="title">
                Dashboard
              </span>
            </a>
            <a href="/admin" className="navbar-item">
              Admin
            </a>
          </div> */}

          <div className="navbar-end">
            <div className="navbar-item">
              {
                this.props.Authprops.isAuthenticated
                  && this.props.Authprops.user ?
                  <p className="nav-username"> Hello {this.props.Authprops.user.username}</p> :
                  null
              }
              <div className="nav-menu_container">
                {!this.props.Authprops.isAuthenticated && (
                  <div className="nav-menu_wrapper">
                    <a href="/register" className="button is-primary btn btn-main">
                      <strong>Register</strong>
                    </a>
                    <a href="/" className="nav-btn_login">
                      Log in
                  </a>
                  </div>
                )}
                {this.props.Authprops.isAuthenticated && (
                  <React.Fragment>
                    <ul className="nav-main">
                      <li className="nav-main_item">
                        <a href="/dashboard" className="navbar-item">
                            Dashboard
                        </a>
                      </li>
                    </ul>
                    <div className="nav-auth_container"
                      onMouseLeave={e => this.setState({ showMainMenu: false })}
                    >
                      <button className="burger"
                        onClick={e => this.setState({ showMainMenu: !this.state.showMainMenu })}
                      >
                        <IoIosMenu />
                      </button>
                      <div className={`nav-menu_wrapper is_auth ${this.state.showMainMenu ? "show" : ""}`}>
                        <a href="/changepassword" className="nav-menu_item">
                          Change Password
                  </a>
                        <a href="/" onClick={this.handleLogOut} className="nav-menu_item logout-btn">
                          Log out
                  </a>
                      </div>
                    </div>
                  </React.Fragment>)}
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    )
  }
}
