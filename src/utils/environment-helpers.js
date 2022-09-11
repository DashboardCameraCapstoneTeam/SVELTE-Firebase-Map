import * as constants from 'constants';

export const isProduction = () => process.env.NODE_ENV === constants.PRODUCTION;

export const isTest = () => process.env.NODE_ENV === constants.TEST;

export const isDevelopment = () => process.env.NODE_ENV === constants.DEVELOPMENT;

export const getDeployedAppServer = () => process.env.BASE_URL;
