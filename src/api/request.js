import axios from "axios";
// import CONSTANTS from "../config";

const request = (method, url, body, callback, errorCallback, networkError) => {
    let myAxios = axios.create();

    // myAxios.defaults.headers.common["Authorization"] = localStorage.getItem(`${CONSTANTS.JWT}`);
    // myAxios.defaults.headers.common["Authorization"] = "67cef70d-e7a5-466a-8b66-0a5f4a49dbb8";

    myAxios[method](url, method === "delete" ? { data: body } : body)
        .then((response) => {
            if (!response.data.error) {
                callback(response.data);
            } else {
                errorCallback(response.data);
            }
        })
        .catch((error) => {
            if (networkError) {
                networkError(error.message);
            }
            errorCallback(error.response.data.message);
        });
};

export default request;
