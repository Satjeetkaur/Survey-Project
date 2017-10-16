/**
 * SurveyController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {

  'index': function(req, res) {
    res.view();
  },

  create: function(req, res, next) {
    Surveys.create(req.params.all(), function userCreated(err, user) {
     if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        // If error redirect back to /Surveys/index
        return res.redirect('/Surveys/index.ejs');
      }

      // Log user in
      req.session.authenticated = true;
      
      req.session.User = user;

      req.session.User.admin = 1;
      res.redirect('/Surveys/EditSurvey.ejs');
  
    });
  },

//Redirect to /Survey/UpdateSurvey.ejs
  UpdateSurvey: function(req, res, next) {
     // Get an array of all Surveys
     Surveys.findOne(req.param('Id'), function foundsurveys(err,surveys) {
      if (err) return next(err);
      if (!surveys) return next('User doesn\'t exist.');

      res.view({
        surveys: surveys
      });
    });
  }, 

//Redirect to /Survey/EditSurvey.ejs
  EditSurvey: function(req, res, next) {
   // Get an array of all Surveys
     Surveys.find(function foundSurveys(err, surveys) {
      if (err) return next(err);
    
      res.view({
        surveys: surveys
      });
    });
  },

//Delete information in Survey table
  destroy: function(req, res, next) {
    Surveys.destroy(req.param('Id'), function surveysUpdated(err) {
      if (err) {}

     res.redirect('/surveys/EditSurvey.ejs/' + req.param('Id'));
    });
  },

//Update information in Survey table
  update: function(req, res, next) {
    
      var userObj = {
        SurveyId :req.param('SurveyId'),
        Title: req.param('Title'),
        Description: req.param('Description'),
        CreatedDate: req.param('CreatedDate'),
        ExpiresOn: req.param('ExpiresOn'),
        CreatedBy: req.param('CreatedBy'),
      }

      Surveys.update(req.param('Id'), userObj, function userUpdated(err) {
      if (err) return next(err);

       res.redirect('/surveys/EditSurvey.ejs/' + req.param('Id'));
  
    });
  },

//Redirect to /Survey/ViewSurvey.ejs
 ViewSurvey: function(req, res, next) {
    req.session.User.admin = 0;
     Surveys.find(function foundsurveys(err, surveys) {
      if (err) return next(err);
     
      res.view({
        surveys: surveys
      });
    });
  }
  
}