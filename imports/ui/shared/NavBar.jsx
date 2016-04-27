import React, { Component } from 'react';
import { Link } from 'react-router';

class NavBar extends Component {
  render() {
    return (
      <div>
      <Link to='/'>Home</Link>
      <Link to='/signup'>Sign up</Link>
      <Link to='/login'>Login</Link>
      </div>
    );
  }
}

export default NavBar;