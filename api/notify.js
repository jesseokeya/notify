class notify {

  constructor(sendwithus, twilio) {

    (sendwithus !== null)
      ? this.sendwithus = require('sendwithus')(sendwithus)
      : '';

    (twilio !== null)
      ? this.twilio = require('twilio')(twilio.accountSid, twilio.authToken)
      : '';
  }

  callback(err, response) {
    if (err) {
      throw err;
    } else {
      (response)
        ? response
        : '';
    }
  }

  sendEmail(data) {
    (this.sendwithus !== null)
      ? this.sendwithus.send(data, this.callback)
      : '';
  }

  renderEmail(data) {
    (this.sendwithus !== null)
      ? this.sendwithus.render(data, this.callback)
      : '';
  }

  sendText(data) {
    (this.sendwithus !== null)
      ? this.twilio.messages.create(data, this.callback)
      : '';
  }

}

module.exports = notify;
