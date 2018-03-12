// -------------------------- GOOGLE STUFF ------------------------------------------
// Client ID and API key from the Developer Console
export const CLIENT_ID = '951627156938-5d2pd5k9vjksj9ksh7fgksjanhvicjmu.apps.googleusercontent.com';
export const API_KEY = 'DUrDmorIQ6UpoDMWNmlnSaNz';

// Array of API discovery doc URLs for APIs used by the quickstart
export const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
export const SCOPES = 'https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/tasks.readonly';

// ------------------------------------------ ROUTES ---------------------------------------

export const LOGIN_ROUTE = '/LOGIN';

// ------------------------------------------ TASK API BASE ENDPOINTS ----------------------

export const LISTS_API_URL = 'https://www.googleapis.com/tasks/v1/users/@me';
export const TASKS_API_URL = 'https://www.googleapis.com/tasks/v1/lists';
