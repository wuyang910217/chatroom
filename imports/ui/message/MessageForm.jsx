import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import {Meteor} from 'meteor/meteor';

class MessageForm extends Component {
  constructor(props){
    super(props);
    this.state={
      inputValue: ''
    };
  }

  handleChange(e) {
    this.setState({inputValue: this.refs.message.getValue()});
  }
  handleSubmit(e) {
    e.preventDefault();
    const message = this.refs.message.getValue();
    const currentUser = this.props.currentUser;
    const username = currentUser.username;
    const avatar_url = currentUser.profile && currentUser.profile.avatar_url ? currentUser.profile.avatar_url : null;
    Meteor.call('insert/message', username, avatar_url, message, (error) => {
      if (error) {
        console.log(error);
        return;
      }
      this.setState({inputValue: ''});
    });
  }

  getStyles() {
    return {
      card: {
        padding: '10px',
        flexShrink: 0,
      },
      form: {
        textAlign: 'center'
      },
      textField: {
        marginRight: '5px',
        transition: 'none',
        height: '45px',
        width: '80%',
      },
      label: {
        fontWeight: '600',
        fontSize: '14px',
        padding: '0 12px',
      },
      button: {
        minWidth: 0,
      }
    };
  }
  render() {
    let styles = this.getStyles();
    return (
      <Card style={styles.card}>
        <form style={styles.form} onSubmit={ this.handleSubmit.bind(this) }>
          <TextField
            ref="message"
            style={styles.textField}
            value={this.state.inputValue}
            onChange={this.handleChange.bind(this)}
            hintText="说点儿什么"
            multiLine={true} />
          <RaisedButton
            style={styles.button}
            labelStyle={styles.label}
            type="submit"
            label="发送"
            secondary={true} />
        </form>
      </Card>
    );
  }
}
export default MessageForm;