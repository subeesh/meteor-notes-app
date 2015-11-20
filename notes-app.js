Notes = new Mongo.Collection("notes");
 
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    notes: function () {
      if(Session.get("searchKey")) {
        return Notes.find({  text: { $regex: Session.get("searchKey") } }, {sort: {createdAt: -1}});;
      } else {
        return Notes.find({}, {sort: {createdAt: -1}});
      }
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
    },
    "input .search-notes": function(e) {
      Session.set("searchKey", e.currentTarget.value)
    }
  });

  Template.note.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Notes.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Notes.remove(this._id);
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
