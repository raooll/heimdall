
Meteor.startup(function () {
    // code to run on server at startup
    console.log("server is running");

});

Meteor.methods({
    // methods go here
    updateTimeZone: function (timez){
        console.log("Timezone update called");
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        Meteor.users.update(Meteor.userId(), {$set: {
            'profile.timezone': timez
        }});
    },

    getFbID: function(){
        console.log("Timezone update called");
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }


    },

    setuprofile: function(){
        console.log("setuprofile called");
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Session.set('fb_id', Meteor.users.findOne(Meteor.userId()).services.facebook.id);
    }

});



Meteor.publish("Users", function () {
    return Meteor.users.find({}, { fields: {_id: 1, profile: 1} })
});

Accounts.onCreateUser(function(options, user) {

    console.log(user);
    if (options.profile)
        user.profile = options.profile;

    user.profile.fb_id = user.services.facebook.id;

    return user;
});


