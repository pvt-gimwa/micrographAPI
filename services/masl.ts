import * as msal from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: "15c3cafa-43f1-4e68-ab8e-53793dbdca9a",
    authority: "https://login.microsoftonline.com/75aea1b3-5ccf-4af6-948d-d9eb51f1c4f1",
    redirectUri: "http://localhost:3000/",
    // clientId: clientId, // This is the ONLY mandatory field that you need to supply.
    // authority: authority, // Defaults to "https://login.microsoftonline.com/common"
    // redirectUri: '/', // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
    postLogoutRedirectUri: '/login', // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};
export const loginRequest = {
  scopes: ['User.Read'],
};

export const apiRequest = {
  scopes: ['https://api-dev.roshalimaging.org/api/user_impersonation'],
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export { msalInstance };