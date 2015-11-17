if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    notes: [
      { text: "This is note 1" },
      { text: "This is note 2" },
      { text: "This is note 3" }
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
