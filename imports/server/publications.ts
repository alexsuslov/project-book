import { Projects } from "../collections/projects.collection";
import { Users } from "../collections/users.collection";
import { Tags } from "../collections/tags.collection";
import { Email } from 'meteor/email';

Meteor.publish('projects', () => {
  let user = Users.findOne(this.userId);

  if (!user){
    return Projects.find({ is_private: false }, { fields: {
      name: 1,
      owner_id:1,
      description: 1,
      tags: 1,
      rating: 1,
    }});
  }

  return user.isAdmin()
  ? Projects.find()
  : Projects.find({$or: [{is_private: false}, {owner_id: this.userId}]});

});

Meteor.publish('tags', () => {
   return Tags.find({});
});

Meteor.publish('users', () => {
   return Users.find({}, {fields: {profile: 1}});
});

Meteor.methods({
  sendEmail: mail => {
    const { from, to, subject, html } = mail;
    check([to, from, subject, html], [String]);
    this.unblock();
    Email.send({ to, from, subject, html });
  },
});