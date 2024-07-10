import axios from "axios";
import { localStorageItemNames } from "../constant/local-storage-item";


export const getData = (urlToGetData) => {
    return resolveApiCall(axios.get(urlToGetData, getRequestConfiguration()));
};

export const postData = (urlToPostData, data) => {
    return resolveApiCall(
        axios.post(urlToPostData, data, getRequestConfiguration())
    );
};

export const postFileData = (urlToPostData, data) => {
    return resolveApiCall(axios.post(urlToPostData, data, getFileRequest()));
};

export const postFormData = (urlToPostData, data) => {
    return resolveApiCall(
        axios.post(urlToPostData, data, getFormRequestConfiguration())
    );
};

export const putData = (urlToPutData, data) => {
    return resolveApiCall(
        axios.put(urlToPutData, data, getRequestConfiguration())
    );
};

export const deleteData = (urlToDeleteData) => {
    return resolveApiCall(
        axios.delete(urlToDeleteData, getRequestConfiguration())
    );
};

const resolveApiCall = (apiCall) => {
    return new Promise((resolve) => {
        const apiResult = {};
        apiCall
            .then((response) => {
                apiResult.data = response && response.data ? response.data : undefined;
                resolve(apiResult);
            })
            .catch((error) => {
                apiResult.error = error;
                resolve(apiResult);
            });
    });
};

const getRequestConfiguration = () => {
    const axiosRequestConfig = {};
    axiosRequestConfig.headers = getHeaders("json");
    return axiosRequestConfig;
};

const getFormRequestConfiguration = () => {
    const axiosRequestConfig = {};
    axiosRequestConfig.headers = getHeaders("form");
    return axiosRequestConfig;
};

const getHeaders = (type) => {
    const headers = {};

    switch (type) {
        case "form":
            headers["Content-Type"] = "application/x-www-form-urlencoded";
            break;

        default:
            headers["Content-Type"] = "application/json";
            break;
    }

    const token = getToken();
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
};

const getToken = () => {
    const token = localStorage.getItem(localStorageItemNames.token);
    return token;
};

const getFileRequest = () => {
    const axiosRequestConfig = getRequestConfiguration();
    axiosRequestConfig.responseType = "arraybuffer"; // blob also can be possible
    return axiosRequestConfig;
};
