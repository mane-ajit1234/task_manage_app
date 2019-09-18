const sgMail = require("@sendgrid/mail");



sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        "to":email,
        "from":"mane.ajit90@gmail.com",
        "subject":"Thanks for Joining in.",
        "text":`Hey ${name}, Welcome to the Task Manager App.`,
        "html":`<strong>Hey ${name}, Welcome to the Task Manager App.</strong>`
    });
}

module.exports = {
    sendWelcomeEmail
}



