export function getApiPort() {
    return Number(process.env.PORT) || 8000;
}
export function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-${getApiPort()}.app.github.dev`
        : `http://localhost:${getApiPort()}`;
}
