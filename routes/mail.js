const mailsRouters = require('express').Router();

const { mailer } = require('../conf');

mailsRouters.post('/', (req, res) => {
  const { email, firstName, message } = req.body;

  const mail = {
    from: process.env.MAIL_USER,
    to: process.env.RECEIVER_MAIL,
    subject: 'contact Wayne Danza',
    html: `<p>email: ${email}</p><p>name: ${firstName}</p><p>message: ${message}</p>`,
  };

  mailer.sendMail(mail, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send('success');
    }
  });
});

module.exports = mailsRouters;
