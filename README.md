# Survey-Project

a [Sails](http://sailsjs.org) application
This the application Created by Our group for the Assessment 3 of subject advance internet programming. This is a survey application for doing survey of students.
We are using Sails.js framework for assessment 3. Sails.js is a MVC framework based on node.js. In sails.js. It provide an automatic RESTful API.
For installation of sails.js - $ npm install sails –g 
Database – MySQL
###################################################################
The Functionality of Survey Application
1.	Sign Up page for creating new account.
2.	Login Page.
3.	Create, update, delete on survey form for admin.
4.	User can Login and fill survey.

##############################################
File Structure of Application
Sails.js is MVC framework so 

To View the Controller 
Go to the api/controllers directory 

SeessionController.js (To check out the information about user login.)
SurveyQuestionController.js (This Controller handle the Question of Survey)
Survey Response Controller.js (This controller handle the responses)
SurveyController.js (This Controller handle the survey information)
UserController.js (It is used to for creating new user.)

Go to the api/models
These files helps to understand how the records in the database will be defined. 	
Session.js (To store the information about the session)
SurveyQuestion.js (The attributes information of Survey question stored in this file.)
SurveyResponse.js (To store the Survey Response attribute information)
Survey.js (The attributes for survey are store in this file.)
User.js (To store the user attributes.)

Go to the Views for ejs files ( Front end files)
For the route setting -Go to the Config/routes.js 

'/': {
    view: 'static/index'  // this the main route of the application
              }
Database Connection file can be found on – Go to the config/connection.js

For the Dependency – Go to package.json 
###################################################
The Design style for this applications are based on below points.

1. Braces - Opening brackets go on the same line.
2. For the VARIABLES & PROPERTY names we are going to use lower camel case capitalization.
3. CONSTANT should be in all uppercase.
4. We try to avoid code duplication as it is bad style instead of that we can use function and calling.
5. Indentation should be in correct manner and using an equal spacing.
6. Comment should be meaningful and able to explain the code.
7. We are using a short identifier as it is convenient to use and also easier to type.
8. Classes name in upper camel case as it is helpful to distinguish class and methods.
##########################################################################

