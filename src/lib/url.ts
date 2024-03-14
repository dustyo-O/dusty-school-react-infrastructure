export const API_ORIGIN = 'http://localhost:3000';

export function apiURL(path: string, params: { [key: string]: string } = {}) {
    const urlParams = new URLSearchParams(params);

    const tail = urlParams.toString();

    return API_ORIGIN + '/' + path + (tail ? '?' + tail : '');
}
