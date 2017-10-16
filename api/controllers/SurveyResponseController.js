/**
 * SurveyResponseController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling requests.
 */

module.exports = {

  create: function(req, res, next) {

    SurveyResponse.create(req.params.all(), function userCreated(err, user) {

     if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
      // If error redirect back to SurveyQuestions/index
        return res.redirect('/SurveyQuestions/index');
      }

       // Log user in
      req.session.authenticated = true;
      
      req.session.User = user;

      req.session.User.admin = 1;

      sails.log('Wow, there are %d users named Finn.  Check it out:', req.session.authenticated);
      
     res.redirect('/Surveys/ViewSurvey/');
  
    });
  },

  //Redirect to /SurveyResponse/ViewResponse.ejs
  ViewResponse: function(req, res, next) {
     SurveyResponse.find(function foundsurveys(err, surveyResponse) {
      if (err) return next(err);
      // pass the array down to the /SurveyResponse/ViewResponse.ejs page
      res.view({
        surveyResponse: surveyResponse
      });
    });
  }

}
