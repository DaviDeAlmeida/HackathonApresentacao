import * as development from './settings-development';
import * as production from './settings-production';

const enviroments = {
  development,
  production,
};

const settings = enviroments[process.env.NODE_ENV];

export const API_ROOT = `${settings.API_ORIGIN}/api`;

export const {
  ORIGIN,
  API_ORIGIN,
  IdentitySettings,
} = settings;

export const DEFAULT_LANGUAGE = settings.DEFAULT_LANGUAGE || 'ptBr';
export const ANALYTICS_UA = settings.ANALYTICS_UA || 'UA-147032999-1';
