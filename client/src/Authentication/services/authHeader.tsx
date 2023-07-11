export default function authHeader() {
    const userString = localStorage.getItem("user");
    let user = null;

    if (userString) {
        user = JSON.parse(userString);
    }

    if (user && user.accessToken) {

        return { 'x-access-token': user.accessToken }

    } else {

        return { 'x-access-token': null }
    }
}