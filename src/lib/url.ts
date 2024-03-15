export const API_ORIGIN = process.env.REACT_APP_API_ORIGIN;

export function apiURL(path: string, params: { [key: string]: string } = {}) {
    const urlParams = new URLSearchParams(params);

    const tail = urlParams.toString();

    return API_ORIGIN + '/' + path + (tail ? '?' + tail : '');
}
