export const getApiBaseUrl = (_req) => {
    const codespaceName = process.env.CODESPACE_NAME;
    const port = process.env.PORT || '8000';
    if (codespaceName) {
        return `https://${codespaceName}-${port}.app.github.dev`;
    }
    return `http://localhost:${port}`;
};
export const getApiUrl = (req, path) => {
    const baseUrl = getApiBaseUrl(req);
    return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};
