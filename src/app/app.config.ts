// const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;
const USE_INTERACTION_CODE = false;

export default {
  oidc: {
    clientId: '0oa1ym2xjaNvLv7Kq1d7',
    issuer: 'https://login.ytsu.me/oauth2/default',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
    testing: {
      disableHttpsCheck: false
    },
  },
  widget: {
    useInteractionCodeFlow: `${USE_INTERACTION_CODE}`,
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};

