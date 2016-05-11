import React, { Component } from 'react';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Radium from 'radium';
import { HTTP } from 'meteor/http';
import isEmpty from 'lodash/fp/isEmpty';
import UserInfo from './user/UserInfo.jsx';
import { createContainer } from 'meteor/react-meteor-data';

class  Account extends Component {
  constructor(props) {
    super(props);
    this.state ={
      user: {}
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    const username = this.refs.username.getValue();
    const url = `https://api.github.com/users/${username}`;
    HTTP.call('get', url, (error, res) => {
      if(error) {
        console.log(error);
      } else {
        this.setState({user: JSON.parse(res.content)})
      }
    });
  }

  handleClick(e) {
    e.preventDefault();
    let user = this.state.user;
    const info = {
      profile: {
        avatar_url: user.avatar_url,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos
      }
    };
    Meteor.users.update(Meteor.userId(), {$set: info});
    this.context.router.push('/chat');
  }

  render(){
    let styles = {
      root: {
        flexGrow: 1,
        overflowY: 'scroll',
        paddingTop: '64px',
        paddingLeft: '16px',
        paddingRight: '16px'
      },
      card: {
        maxWidth: '700px',
        margin: '20px auto',
        padding: '20px 15px'
      }
    };
    let GitHubInfo;
    let currentUser = this.props.currentUser;
    if(!isEmpty(this.state.user)) {
      GitHubInfo = (
        <div>
          <UserInfo userInfo={this.state.user} />
          <RaisedButton
            style={{display: 'block', margin: '30px auto 0', width: '180px'}}
            primary={true}
            label="save"
            onClick={this.handleClick.bind(this)} />
        </div>
      );
    } else if (currentUser && currentUser.profile && currentUser.profile.avatar_url) {
      GitHubInfo = (
        <UserInfo userInfo={this.props.currentUser} />
      );
    }

    return (
       <div style={styles.root}>
        <Card style={styles.card}>
          <form onSubmit = {this.handleSubmit.bind(this)}>
            <TextField
              hintText="GitHub Account"
              ref='username' />
            <FlatButton
              type="submit"
              primary={true}
              label="search github" />
          </form>
          { GitHubInfo }
        </Card>
      </div>
      );
  }
}

Account.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Radium(Account));
