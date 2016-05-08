import React, { Component } from 'react';
import Radium from 'radium';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import NavBar from './shared/NavBar.jsx';

class App extends Component {
  getChildContext(){
    return {
      muiTheme: getMuiTheme()
    };
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
      <div style={ styles.root }>
      <NavBar />
      { this.props.children }
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Radium(App);