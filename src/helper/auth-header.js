export function authHeader() {
    // return authorization header with basic auth credentials
    let user_auth = JSON.parse(localStorage.getItem('user_auth'));

    if (user_auth) {
        return { 'Authorization': 'Basic ' + user_auth };
    } else {
        return {};
    }
}