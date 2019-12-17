export const DEFAULT_LANGUAGE = 'ptBr';
export const ANALYTICS_UA = 'UA-147032999-1';

// export const API_ORIGIN = 'http://191.232.172.163:32549';
export const API_ORIGIN = 'http://localhost:44339';

// export const ORIGIN = 'http://accuschedulerdev.z15.web.core.windows.net';
export const ORIGIN = 'http://localhost:3000';

export const IdentitySettings = {
  authority: 'http://191.232.172.163:46063/',
  // authority: 'http://localhost:5000/',
  client_id: 'accuscheduler_react',
  scope: 'openid profile accuscheduler_api',
  redirect_uri: `${ORIGIN}/signin-redirect`,
  post_logout_redirect_uri: ORIGIN,
  silent_redirect_uri: `${ORIGIN}/silent-renew`,
  automaticSilentRenew: true,
  response_type: 'id_token token',
  grant_type: 'implicit',
  loadUserInfo: true,
  revokeAccessTokenOnSignout: true,
};
