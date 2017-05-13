var nodemailer = require("nodemailer");
var hbs = require('nodemailer-express-handlebars');
//var auth = require("./auth.js");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vidivenimail@gmail.com',
        pass: process.env.APP_PASSWORD
    }
});

var options = {
 viewEngine: {
     extname: '.handlebars',
     layoutsDir: 'views/layouts/',
     defaultLayout : 'mail',
     partialsDir : 'views/partials/'
 },
 viewPath: 'views',
 extName: '.handlebars'
};

transporter.use('compile', hbs(options));

module.exports = transporter;


//send mail with options 
// var mail = {
//    from: 'from@domain.com',
//    to: 'to@domain.com',
//    subject: 'Test',
//    template: 'email',
//    context: {
//        name: 'Name'
//    }
// };


