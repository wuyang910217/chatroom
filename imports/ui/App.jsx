import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from  'material-ui/AppBar';

import NavBar from './shared/NavBar.jsx';
import AppDrawer from './shared/AppDrawer.jsx';

class App extends Component {
  getChildContext(){
    return {
      muiTheme: getMuiTheme()
    };
  }
  componentWillMount() {
    let setNarbarState = () => {
      this.setState({renderNavNar: window.innerWidth > 700});
    };
    setNarbarState();
    window.onresize = setNarbarState;
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
          { this.state.renderNavNar ? <NavBar /> : <AppBar onLeftIconButtonTouchTap={this.handleTouchTap.bind(this)} /> }
          <AppDrawer ref='drawer' />
          { this.props.children }
        </div>
      </StyleRoot>
    );
  }

  handleTouchTap(){
    this.refs.drawer.handleToggle();
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Radium(App);