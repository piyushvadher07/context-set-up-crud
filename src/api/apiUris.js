const apiUris = {};

const baseUri = "http://localhost:5000/api";

const AUTHENTICATE_ROOT = `${baseUri}/auth`;
const authenticate = {
    register: `${AUTHENTICATE_ROOT}/signup`,
    login: `${AUTHENTICATE_ROOT}/login`,
}

apiUris.authenticate = authenticate;

const USER_ROOT = `${baseUri}/users`;
const user = {
    getUser: `${USER_ROOT}`,
    updateUser: `${USER_ROOT}/updateUser`,
    deleteUser: `${USER_ROOT}/deleteUser`
}
apiUris.user = user;

export default apiUris;