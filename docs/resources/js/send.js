// BUG: showSucessMessage() && showErrorMessage()
const sendText = () => {
  const {twilio_config} = api_keys;

  const message_config = {
    to: $('#recipient_number').val(),
    from: '+16042293585 ',
    body: $('#recipient_text').val()
  }

  /* expected sample JSON object */
  const textPostRequest = {
    twilio_config,
    message_config
  };

  const url = '/api/send_text';
  const check = $('#recipient_number').val() !== '';
  if (check && $('#recipient_text').val() !== '') {
    $.post(url, textPostRequest, (result) => {
      if (result.statusCode === 200) {
        const recipientPhoneNumber = $('#recipient_number').val();
        $('#text-message').empty();
        $('#recipient_number').val('');
        $('#recipient_text').val('');
        $('#text-message').append(getSuccessMessage(`text message successfully sent to ${recipientPhoneNumber}`));
      } else {
        $('#text-message').empty();
        $('#recipient_number').val('');
        $('#recipient_text').val('');
        $('#text-message').append(getErrorMessage(`text message couldn't be sent`));
      }
      setTimeout(() => {
        $('#text-message').empty();
      }, 3000);
    });
  } else {
    $('#text-message').empty();
    $('#text-message').append(getErrorMessage(`empty form fields. try again`));
    setTimeout(() => {
      $('#text-message').empty();
    }, 3000);
  }
}

const sendEmail = () => {
  const {sendwithus_key, esp_account, template} = api_keys;
  const email_config = {
    template: template,
    recipient: {
      address: `${$('#recipient_email').val()}`
    },
    template_data: {
      first_name: `${$('#recipient_name').val()}`,
      notify_message: `${$('#email_message').val()}`
    },
    sender: {
      address: 'no-reply@notify.com', // required
      name: 'notify'
    },
    esp_account: esp_account // replace with valid esp account
  }

  /* expected sample JSON object */
  const emailPostRequest = {
    sendwithus_key,
    email_config
  };
  const url = '/api/send_email';
  const check = $('#email_message').val() !== '';
  if (check && $('#recipient_email').val() !== '' && $('#recipient_name').val() !== '') {
    $.post(url, emailPostRequest, (result) => {
      if (result.statusCode === 200) {
        const recipientEmail = $('#recipient_email').val();
        $('#email-message-cont').empty();
        $('#recipient_name').val('');
        $('#recipient_email').val('');
        $('#email_message').val('')
        $('#email-message-cont').append(getSuccessMessage(`email successfully sent to ${recipientEmail}`));
      } else {
        $('#email-message-cont').empty();
        $('#recipient_email').val('');
        $('#recipient_name').val('');
        $('#email_message').val('')
        $('#email-message-cont').append(getErrorMessage(`email couldn't be sent`));
      }
      setTimeout(() => {
        $('#email-message-cont').empty();
      }, 3000);
    });
  } else {
    $('#email-message-cont').empty();
    $('#email-message-cont').append(getErrorMessage(`empty form fields. try again`));
    setTimeout(() => {
      $('#email-message-cont').empty();
    }, 3000);
  }
}

const getSuccessMessage = message => {
  return `<div class="alert alert-success" role="alert">${message}</div>`;
}

const getErrorMessage = message => {
  return `<div class="alert alert-danger" role="alert">${message}</div>`;
}
