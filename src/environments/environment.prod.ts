export const environment = {
  production: true,
  baseUrl: (window as any).__env?.apiBaseUrl,
  baseAuth: (window as any).__env?.authUrl,
};