import { localStorageItemNames } from "../constant/local-storage-item";


export const executeApi = async (
    apiFunction,
    request,
    showLoading,
    addMessage
) => {
    try {
        if (showLoading) showLoading(true);

        const response = await (request ? apiFunction(request) : apiFunction());
        const { data, error } = response;
        handleError(
            error,
            addMessage,
            error?.response?.data?.responseStatus
                ? error.response.data.responseStatus
                : data?.responseStatusCode
        );
        if (showLoading) showLoading(false);
        if (error) {
            if (error?.response.status === 401) {
                localStorage.clear(localStorageItemNames.user_token);
                localStorage.clear(localStorageItemNames.userID);
                window.location.replace("/login");
                return false;
            } else {
                return {
                    success: error?.response?.success,
                    msg: error?.response?.data?.msg
                        ? error?.response?.data?.msg
                        : error?.response?.data?.message
                            ? error?.response?.data?.message
                            : error?.response?.data?.error,
                };
            }
        } else {
            return data;
        }
    } catch (ex) {
        if (showLoading) showLoading(false);
        console.error("Api Call Exception", ex);
    }
};

const handleError = (error, addMessage, responseStatusCode) => {
    if (addMessage) {
        if (error && responseStatusCode) {
            addMessage({
                message: responseStatusCode,
            });
        } else if (error && error.response.message) {
            addMessage({ message: error.message });
        }
    }
};
