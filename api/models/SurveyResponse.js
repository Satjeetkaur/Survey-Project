/**
 * SurveyResponse
 *
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

  	Answer1: {
  		type: 'string',
  		required: true
  	},

    Answer2: {
      type: 'string',
      required: true
    },
 
    Answer3: {
      type: 'string',
      required: true
    },

    Answer4: {
      type: 'string',
      required: true
    },
   
    Answer5: {
      type: 'string',
      required: true
    }
  }
};
