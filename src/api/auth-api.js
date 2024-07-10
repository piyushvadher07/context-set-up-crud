import apiUris from "./apiUris"
import { postData } from "./base-api"



export const AuthAPI = {
    registerUser(request) {
        return postData(apiUris.authenticate.register, request)
    },
    loginUser(request) {
        return postData(apiUris.authenticate.login, request)
    }
}