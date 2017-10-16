/**
 * UserController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */


var bcrypt = require('bcrypt'); // For passowrd security 
module.exports = {

  // This loads the sign-up page --> index.ejs
  'index': function(req, res) {
    res.view();
  },

  Create: function(req, res, next) {
    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    User.create(req.params.all(), function userCreated(err, user) {

     if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
       // If error redirect back to sign-up page
        return res.redirect('/User/index');
      }

      // Log user in
     req.session.authenticated = false;
     req.session.User = user;

      // Change status to online
      User.online = true;
      // sails.log('Wow, there are %d users named' + req.param('name') +  'Check it out:', req.session.authenticated);
      res.redirect('/session/new/');
    });
  },

// render the  view (e.g. /Users/AdminLogin.ejs)
 AdminLogin: function(req, res) {
    res.view();
  },

// render the  view (e.g. /Users/LoginSuccess.ejs)
  LoginSuccess: function(req, res, next) {
    if (!req.param('email') || !req.param('password')) {
      // return next({err: ["Password doesn't match password confirmation."]});

      var usernamePasswordRequiredError = [{
        name: 'usernamePasswordRequired',
        message: 'You must enter both a username and password.'
      }]

      // Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
      // the key of usernamePasswordRequiredError
      req.session.flash = {
        err: usernamePasswordRequiredError
      }
      sails.log('error1');
      res.redirect('/User/index');
      return;
    }

    // Try to find the user by there email address. 
    // findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
    // User.findOneByEmail(req.param('email')).done(function(err, user) {
    User.findOneByEmail(req.param('email'), function foundUser(err, user) {
      if (err) return next(err);

      // If no user is found...
      if (!user) {
        var noAccountError = [{
          name: 'noAccount',
          message: 'The email address ' + req.param('email') + ' not found.'
        }]
        req.session.flash = {
          err: noAccountError
        }
        sails.log('error 2');
        res.redirect('/User/index');
        return;
      }

      // Compare password from the form params to the encrypted password of the user found.
      bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
        if (err) return next(err);

        // If the password from the form doesn't match the password from the database...
        if (!valid) {
          var usernamePasswordMismatchError = [{
            name: 'usernamePasswordMismatch',
            message: 'Invalid username and password combination.'
          }]
          req.session.flash = {
            err: usernamePasswordMismatchError
          }
          sails.log('error3');
          res.redirect('/User/index');
          return;
        }

        // Log user in
        req.session.authenticated = true;
        req.session.User = user;

        // Change status to online
        User.online = true;
        //User.save(function(err, user) {
          if (err) return next(err);

          // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
          User.publishUpdate(user.Id, { 
            loggedIn: true,
            Id: user.Id,
            name: user.userName,
            action: ' has logged in.'
          });

          // If the user is also an admin redirect to the user list (e.g. /views/user/index.ejs)
          // This is used in conjunction with config/policies.js file
          if (req.session.User.admin) {
            res.redirect('/User/AdminLogin/');
            return;
          }
       
          //Redirect to their profile page (e.g. /views/user/show.ejs)
          res.redirect('/Surveys/ViewSurvey/');
        //});
      });
    });
  },

// render the edit view (e.g. /Users/UpdateRecord.ejs)
  UpdateRecord: function(req, res, next) {
    // Find the user from the id passed in via params
    User.findOne(req.param('Id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next('User doesn\'t exist.');

      res.view({
        user: user
      });
    });
  },

// Update the infrormation in User table
  update: function(req, res, next) {

    if (req.session.User.admin) {
      var userObj = {
        name: req.param('name'),
        title: req.param('title'),
        email: req.param('email'),
        admin: req.param('admin')
      }
    } else {
      var userObj = {
        name: req.param('name'),
        title: req.param('title'),
        email: req.param('email')
      }
    }

    User.update(req.param('Id'), userObj, function userUpdated(err) {
      if (err) {
        return res.redirect('/user/edit/' + req.param('Id'));
      }

      res.redirect('/user/show/' + req.param('Id'));
    });
  },

// Delete the infrormation in User table if required 
  destroy: function(req, res, next) {

    User.findOne(req.param('Id'), function foundUser(err, user) {
      if (err) return next(err);

      if (!user) return next('User doesn\'t exist.');

      User.destroy(req.param('Id'), function userDestroyed(err) {
        if (err) return next(err);

        // Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
        User.publishUpdate(user.Id, {
          name: user.name,
          action: ' has been destroyed.'
        });

        // Let other sockets know that the user instance was destroyed.
        User.publishDestroy(user.Id);

      });        

      res.redirect('/user');

    });
  },

  // This action works with app.js socket.get('/user/subscribe') to
  // subscribe to the User model classroom and instances of the user
  // model
  subscribe: function(req, res) {
 
    // Find all current users in the user model
    User.find(function foundUsers(err, users) {
      if (err) return next(err);
 
      // subscribe this socket to the User model classroom
      User.subscribe(req.socket);
 
      // subscribe this socket to the user instance rooms
      User.subscribe(req.socket, users);
 
      // This will avoid a warning from the socket for trying to render
      // html over the socket.
      res.send(200);
    });
  }

};