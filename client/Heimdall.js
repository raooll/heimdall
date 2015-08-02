if (Meteor.isClient) {

    Meteor.subscribe("Users");

    Template.loginBox.events({
        'click #facebook-login': function(event) {
            Meteor.loginWithFacebook({}, function(err){
                if (err) {
                    throw new Meteor.Error("Facebook login failed");
                }
            });
        }
    });


    Template.homePage.helpers({

        timezones: function() {
            x =  _.uniq(Meteor.users.find({}, {
                sort: { 'profile.timestamp' : 1}, fields: { profile : true}
            }).map(function(x) {
                    return x.profile.timezone;
                    //return { 'tz' :  x.profile.timezone} ;
                }), true);

            console.log(Meteor.users.find({}, {
                sort: { profile : 1}, fields: { profile : true}
            }).fetch().map(function(x) {
                    return { 'tz' :  x.profile.timezone} ;
                }), true);
            console.log(x.length)
            return x;
        },

        currentTime: function(timez) {
            return moment.tz(Date(), timez).format('MMMM Do YYYY, h:mm:ss a');
        },

        userList: function(timez) {
           console.log(timez);
           a =  Meteor.users.find({'profile.timezone' : timez});
           console.log(a.fetch());
           return a;
        }
    });



    Template.homePage.events({
        'click #logout': function(event) {
            Meteor.logout(function(err){
                if (err) {
                    throw new Meteor.Error("Logout failed");
                }
            })
        },

        'change .timezonepicker': function(event){
            Meteor.call("updateTimeZone",$(event.target).val());
        }


    });

// set the user's timezone
    Deps.autorun(function() {
        if (Meteor.user()){
            if (!Meteor.user().profile.timezone) {
                Meteor.call("updateTimeZone",TimezonePicker.detectedZone());
            }
        }
    });

}





