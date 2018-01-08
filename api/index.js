const express = require('express');
const notify = require('./notify');
const api_keys = require('../config');
const router = express.Router()

/* GET REQUESTS */
router.get(['/', '/docs'], (req, res) => {
  res.sendfile('./docs/index.html');
})

router.get('/api_keys', (req, res) => {
  res.json(api_keys);
})


/* POST REQUESTS */
router.post('/send_email', (req, res) => {
  if (req.body) {
    const {sendwithus_key, email_config} = req.body;
    const _notify = new notify(sendwithus_key, null);
    const response = _notify.sendEmail(email_config);
    res.send({response: response, statusCode: 200, message: `email sent to ${email_config.recipient.address}`});
  } else {
    res.status(404).send({statusCode: 404, message: 'invalid / undefined request body'})
  }
});

router.post('/send_text', (req, res) => {
  if (req.body) {
    const {twilio_config, message_config} = req.body;
    const _notify = new notify(null, twilio_config);
    const response = _notify.sendText(message_config);
    res.send({response: response, statusCode: 200, message: `text sent to ${message_config.to}`});
  } else {
    res.status(404).send({statusCode: 404, message: 'invalid / undefined request body'})
  }
});

router.post('/generate_token', (req, res) => {
  const {token_length} = req.body;
  if (token_length) {
    const randtoken = require('rand-token');
    token = randtoken.generate(token_length);
    res.send({token_length: token_length, token: token, statusCode: 200, message: `token successfully generated: ${token}`});
  } else {
    res.status(404).send({statusCode: 404, message: 'invalid / undefined request body'})
  }
})

module.exports = router;
