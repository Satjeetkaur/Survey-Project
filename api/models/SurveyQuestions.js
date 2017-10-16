/**
 * SurveyQuestions
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 *
 */

module.exports = {

  //schema: true,
  autoCreatedAt:false,
  autoUpdatedAt:false,

  attributes: {

   
    SurveyId: {
      type: 'integer',
      required: true,   
    },

  	Question1: {
  		type: 'string',
  		required: true
  	},

    Question2: {
      type: 'string',
      required: true
    },
 
    Question3: {
      type: 'string',
      required: true
    },

    Question4: {
      type: 'string',
      required: true
    },
   
   Question5: {
      type: 'string',
      required: true
    }
  }
};
