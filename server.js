const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function getAccessToken() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    if (accessToken.token) {
      return accessToken.token;
    }
    throw new Error('Failed to retrieve access token');
  } catch (error) {
    console.error('Error getting access token:', error.message);
    throw error;
  }
}

async function sendMail(name, email, message) {
  try {
    const accessToken = await getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.USER_EMAIL,
      subject: `New message from ${name}`,
      text: message,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
}

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    console.log("heard that")
    await sendMail(name, email, message);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.log(error)
    res.status(500).send('Error sending email');
  }
});

app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.send('Authentication successful! You can close this window.');
  } catch (error) {
    console.error('Error during OAuth2 callback:', error.message);
    res.status(500).send('Authentication failed');
  }
});

app.use(express.static(path.join(__dirname, './')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});