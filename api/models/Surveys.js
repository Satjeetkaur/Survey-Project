/**
 * Surveys
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
 
    Id: {
      type: 'integer',
     
    },

    Title: {
      type: 'string',
      required: true
    },

    Description: {
      type: 'string',
      required: true
    },

 	  CreatedDate: {
      type: 'string',
      required: true
    },

    ExpiresOn: {
      type: 'string',
      required: true
    },

  	CreatedBy: {
      type: 'string',
      required: true
    }
    
  }
};
