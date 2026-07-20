const getCodespaceName = () => import.meta.env.VITE_CODESPACE_NAME?.trim();

export const getApiBaseUrl = () => {
  const codespaceName = getCodespaceName();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const getApiUrl = (resource) => {
  const normalizedResource = resource.startsWith('/') ? resource.slice(1) : resource;
  return `${getApiBaseUrl()}/api/${normalizedResource}/`;
};
