import {ipcMain} from 'electron';

const electronOauth2 = require('electron-oauth2');
const oauthConfig = require('./googleOAuthConfig').oauth;

//authentication and autheriztion start
const loginWindowParams = {
  alwaysOnTop: true,
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration: false,
  },
};

const options = {
  scope:
    'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.email',
  accessType: 'online',
};

export const googleOAuth = electronOauth2(oauthConfig, loginWindowParams);
ipcMain.on('google-oauth', (event, arg) => {
  googleOAuth.getAccessToken(options)
    .then(token => {
      console.info('Got OAuth token', token);
      event.sender.send('google-oauth-reply', token);
    }, err => {
      //loginWindowParams.quit();
      event.sender.send('google-oauth-error', err);
    });
});
ipcMain.on('google-oauth-refresh', (event, refreshToken) => {
  if (refreshToken == null) {
    event.sender.send('google-oauth-logout');
    return;
  }

  googleOAuth.refreshToken(refreshToken)
    .then(token => {
      console.info('Got OAuth refresh token', token);
      event.sender.send('google-oauth-reply', token);
    }, err => {
      //loginWindowParams.quit();
      event.sender.send('google-oauth-error', err);
    });
});
//authentication and authorization ends