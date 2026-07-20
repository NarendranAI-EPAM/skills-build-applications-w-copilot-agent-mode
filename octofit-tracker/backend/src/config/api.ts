import type { Request } from 'express';

export const getApiBaseUrl = (req?: Request) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const port = process.env.PORT || '8000';

  if (codespaceName) {
    return `https://${codespaceName}-${port}.app.github.dev`;
  }

  return `http://localhost:${port}`;
};

export const getApiUrl = (req: Request | undefined, path: string) => {
  const baseUrl = getApiBaseUrl(req);
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};
