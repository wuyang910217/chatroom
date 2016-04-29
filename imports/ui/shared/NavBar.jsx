import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';

class NavBar extends Component {
  handleChange(value) {
    console.log(value);
  }

  render() {
    return (
      <div>
      <Tabs onChange={ this.handleChange.bind(this) }>
      <Tab label='Home'  value='/' />
      <Tab label='Sign up' value='/signup' />
      <Tab label='Login' value='/Login' />
      </Tabs>
      </div>
    );
  }
}

NavBar.contextTypes= {
  muiTheme: React.PropTypes.object.isRequired,
};

export default NavBar;