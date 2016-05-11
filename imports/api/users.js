import { Meteor } from 'meteor/meteor';
Meteor.methods({
  'update/user': function (githubInfo) {
    var info = {
      profile: {
        avatar_url: githubInfo.avatar_url,
        followers: githubInfo.followers,
        following: githubInfo.following,
        public_repos: githubInfo.public_repos
      }
    }
    Meteor.users.update(Meteor.userId(), {$set: info})
  }
});

if (Meteor.isServer) {
  Meteor.publish("userStatus", function() {
    return Meteor.users.find({ "status.online": true });
  });
}
