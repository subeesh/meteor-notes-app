Notes = new Mongo.Collection("notes");
 
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    notes: function () {
      return Notes.find({}, {sort: {createdAt: -1}});
    }
  });


  Template.body.events({
    "submit .new-note": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a task into the collection
      Notes.insert({
        text: text,
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.text.value = "";
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
