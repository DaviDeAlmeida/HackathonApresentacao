export const DEFAULT_LANGUAGE = 'ptBr';
export const ANALYTICS_UA = 'UA-147032999-1';

export const API_ORIGIN = 'http://191.232.172.163:5005';
export const ORIGIN = 'http://accuscheduler.z15.web.core.windows.net';

export const IdentitySettings = {
  authority: 'http://191.232.172.163:5000/',
  client_id: 'accuscheduler_react',
  scope: 'openid profile accuscheduler_api',
  redirect_uri: `${ORIGIN}/signin-redirect`,
  post_logout_redirect_uri: ORIGIN,
  response_type: 'id_token token',
  grant_type: 'implicit',
  loadUserInfo: true,
  revokeAccessTokenOnSignout: true,
  automaticSilentRenew: true,
  silent_redirect_uri: `${ORIGIN}/silent-renew`,
};
