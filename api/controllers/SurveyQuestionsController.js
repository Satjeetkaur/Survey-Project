/**
 * SurveyQuestionsController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */



module.exports = {

  'index': function(req, res) {
    res.view();
  },

  create: function(req, res, next) {

    SurveyQuestions.create(req.params.all(), function userCreated(err, surveyQuestions) {

     if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        // If error detect redirect back SurveyQuestions/index
        return res.redirect('/SurveyQuestions/index');
      }

      // Log user in
      req.session.authenticated = true;
      
      req.session.User = user;

      req.session.User.admin = 1;

      sails.log('Wow, there are %d users named Finn.  Check it out:', req.session.authenticated);
       res.redirect('/SurveyQuestions/EditQuestions.ejs/');
  
    });
  },

  //Redirect to /SurveyQuestions/ViewQuestions.ejs
  ViewQuestions: function(req, res, next) {
      SurveyQuestions.findOne(req.param('Id'), function foundSurveyQuestions(err,surveyQuestions) {
      if (err) return next(err);
      if (!surveyQuestions) return next('User doesn\'t exist.');

      res.view({
        surveyQuestions: surveyQuestions
      });
    });
  }, 

  //Redirect to /SurveyQuestions/UpdateQuestions.ejs
  UpdateQuestions: function(req, res, next) {
  // Get an array of all Questions from table surveyQuestions
     SurveyQuestions.findOne(req.param('Id'), function foundSurveyQuestions(err,surveyQuestions) {
      if (err) return next(err);
      if (!surveyQuestions) return next('User doesn\'t exist.');
      // pass the array down to the Updatequestions.ejs page
      res.view({
        surveyQuestions: surveyQuestions
      });
    });
  }, 

  //Redirect to /SurveyQuestions/EditQuestions.ejs
   EditQuestions: function(req, res, next) {
   // Get an array of all Questions from table surveyQuestions
    SurveyQuestions.find(function foundSurveyQuestions(err, surveyQuestions) {
      if (err) return next(err);
      // pass the array down to the Editquestions.ejs page
      res.view({
        surveyQuestions: surveyQuestions
      });
    });
  },

 //Delete information in SurveyQuestions
  destroy: function(req, res, next) {
    SurveyQuestions.destroy(req.param('Id'), function SurveyQuestionsUpdated(err) {
      if (err) {}

     res.redirect('/SurveyQuestions/EditQuestions.ejs/' + req.param('Id'));
    });
  },

   //Update the questions information in SurveyQuestions
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

       res.redirect('/SurveyQuestions/EditQuestions.ejs/' + req.param('Id'));
  
    });
  }

}
