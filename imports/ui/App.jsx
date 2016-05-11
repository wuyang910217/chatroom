import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from  'material-ui/AppBar';
import { Meteor } from 'meteor/meteor';

import NavBar from './shared/NavBar.jsx';
import AppDrawer from './shared/AppDrawer.jsx';
import LogOutMenu from './auth/LogOutMenu.jsx';

import { createContainer } from 'meteor/react-meteor-data';

class App extends Component {
  getChildContext(){
    return {
      muiTheme: getMuiTheme()
    };
  }
  componentWillMount() {
    let setNavbarState = () => {
      this.setState({renderNavBar: window.innerWidth > 700});
    };
    setNavbarState();
    window.onresize = setNavbarState;
  }
  getStyles() {
    return {
      root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        minHeight: '100vh',
      }
    };
  }

  render(){
    const styles = this.getStyles();
    return (
      <StyleRoot>
        <div style={ styles.root }>
          { this.state.renderNavBar ? <NavBar currentUser={ this.props.currentUser } /> :
            (this.props.currentUser ? this.getLoginAppBar() : this.getAppBar()) }
          <AppDrawer ref='drawer' currentUser={ this.props.currentUser }/>
          { this.props.children }
        </div>
      </StyleRoot>
    );
  }

  handleTouchTap(){
    this.refs.drawer.handleToggle();
  }
   getAppBar() {
    return (
      <AppBar onLeftIconButtonTouchTap={this.handleTouchTap.bind(this)} style={{flexShrink: 0}}/>
    );
  }
  getLoginAppBar() {
    return (
      <AppBar onLeftIconButtonTouchTap={this.handleTouchTap.bind(this)}
        iconStyleRight={{marginTop: 0}}
        style={{flexShrink: 0}}
        iconElementRight={<LogOutMenu currentUser={Meteor.user()}/>}/>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

App.propTypes = {
  currentUser: React.PropTypes.object,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Radium(App));