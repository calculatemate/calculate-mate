export const getEnvironment = (): string | undefined => process.env.NODE_ENV;

export const isDev = getEnvironment() === 'development';
