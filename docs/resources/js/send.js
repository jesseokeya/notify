// BUG: showSucessMessage() && showErrorMessage()
const sendText = () => {
  const twilio_config = {
    accountSid: 'AC878d81ab8996dadbcab30f23c6d6d99c',
    authToken: '3ec1fc48324ae30dac05e8c4ba593931'
  }

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

  console.log(textPostRequest);
  const url = 'https://notify-dev.herokuapp.com/api/send_text';

  $.post(url, textPostRequest, (result) => {
    console.log(result.statusCode === 200)
  });

}

const sendEmail = () => {
  const sendwithus_key = 'live_53edfd950064f5d03df81c836441070f2f92f3ec';
  const email_config = {
    template: 'tem_3JmhvdD7SdwGYg6gGfF8XKjb',
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
    esp_account: 'esp_3WcPypVCcQfqb3wF89qgq8HR' // replace with valid esp account
  }

  /* expected sample JSON object */
  const emailPostRequest = {
    sendwithus_key,
    email_config
  };
  const url = 'https://notify-dev.herokuapp.com/api/send_email';

  $.post(url, emailPostRequest, (result) => {
    console.log(result.statusCode === 200)
  });
}
