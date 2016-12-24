#email-service

This service is an example of how to set up email sending with oauth. nodemailer config is set up in a hidden file called .config.js and has the following:

module.exports = {
  user:'thecodingteacher@gmail.com',
  clientId: "_______________________________.apps.googleusercontent.com",
  clientSecret: "___________________________",
  refreshToken: "__________________________________________"
};
