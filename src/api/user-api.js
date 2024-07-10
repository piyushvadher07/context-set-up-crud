import apiUris from "./apiUris"
import { deleteData, getData, putData } from "./base-api"

export const UserAPI = {
    getUser(request) {
        return getData(apiUris.user.getUser, request)
    },
    updateUser(request) {
        return putData(`${apiUris.user.updateUser}/${request?._id}`, request)
    },
    deleteUser(id) {
        return deleteData(`${apiUris.user.deleteUser}/${id}`)
    }

}