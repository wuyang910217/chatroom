import React, { Component } from 'react';

import NavBar from './shared/NavBar.jsx';
import Hello from './Hello.jsx';

class App extends Component {
  render(){
    return (
      <div>
      <Hello />
      <NavBar />
      { this.props.children }
      </div>
    );
  }
}

export default App;