const { Resend } = require('resend');

const fetch = require('node-fetch');

global.fetch = fetch;
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.Response = fetch.Response;

const resend = new Resend(
  process.env.RESEND_API_KEY
);

async function sendTestEmail() {

  try {

    const response =
      await resend.emails.send({

        from: 'onboarding@resend.dev',

        to: ['akshayaher9696@gmail.com'],

        subject: 'Node Email Test',

        html: `
          <h2>Hello</h2>
          <p>Email sent from Node.js using Resend.</p>
        `
      });

    console.log('Email sent');
    console.log(response);

  } catch (error) {

    console.error(
      'Email failed',
      error
    );
  }
}

module.exports = {
  sendTestEmail
};