import React, { Component } from 'react';
import { Link } from 'react-router';

 class Signup extends Component {
  render() {
    return (
      <div>
      <div>
      <Link to='/'>Home </Link>
      <Link to='/signup'>Sign Up </Link>
      <Link to='/login'> Login</Link>
     </div>
This is signup page.
</div>
);
  }
}

export default Signup;