/**
 * UsercomplaintController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */



module.exports = {

  'index': function(req, res) {
    res.view();
  },

  create: function(req, res, next) {

    SurveyQuestions.create(req.params.all(), function userCreated(err, user) {

     if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        // If error redirect back to sign-up page
        return res.redirect('/SurveyQuestions/index');
      }

      // Log user in
      req.session.authenticated = true;
      
      req.session.User = user;

      req.session.User.admin = 1;

      sails.log('Wow, there are %d users named Finn.  Check it out:', req.session.authenticated);
      //res.redirect('/User/Success/'+ req.session.User);
      res.redirect('/SurveyQuestions/EditQuestions/');
  
    });
  },

  // render the questions information
 ViewQuestions: function(req, res, next) {
      SurveyQuestions.findOne(req.param('Id'), function foundSurveyQuestions(err,surveyQuestions) {
      if (err) return next(err);
      if (!surveyQuestions) return next('User doesn\'t exist.');

      res.view({
        surveyQuestions: surveyQuestions
      });
    });
  }, 

  UpdateQuestions: function(req, res, next) {
  // Get an array of all users in the User collection(e.g. table)
     SurveyQuestions.findOne(req.param('Id'), function foundSurveyQuestions(err,surveyQuestions) {
      if (err) return next(err);
      if (!surveyQuestions) return next('User doesn\'t exist.');

      res.view({
        surveyQuestions: surveyQuestions
      });
    });
  
  }, 

  EditQuestions: function(req, res, next) {

    // Get an array of all users in the User collection(e.g. table)
    SurveyQuestions.find(function foundSurveyQuestions(err, surveyQuestions) {
      if (err) return next(err);
      // pass the array down to the /views/index.ejs page
      res.view({
        surveyQuestions: surveyQuestions
      });
    });
  },

  destroy: function(req, res, next) {

    SurveyQuestions.destroy(req.param('Id'), function SurveyQuestionsUpdated(err) {
      if (err) {}

     res.redirect('/SurveyQuestions/EditQuestions/' + req.param('Id'));
    });

  },

  // process the info from edit view
  update: function(req, res, next) {
    
      var userObj = {
        SurveyId :req.param('SurveyId'),
        Question1: req.param('Question1'),
        Question2: req.param('Question2'),
        Question3: req.param('Question3'),
        Question4: req.param('Question4'),
        Question5: req.param('Question5'),
      }
   

    SurveyQuestions.update(req.param('Id'), userObj, function userUpdated(err) {
      if (err) return next(err);

       res.redirect('/SurveyQuestions/EditQuestions/' + req.param('Id'));
  
    });
  }

}
