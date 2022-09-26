import request from "./request";
import requestQuery from './requestQuery';
import URLS from "./url";

export const REQUESTS = {
    // a
    // b
    // c
    // d
    // e
    // f
    // g
    // h
    // i
    // j
    // k
    // l
    // m
    // n
    // o
    // p
    // q
    // r
    // s
    GET_STORIES: (query, callback, errorCallback) => {
        request("get", `${URLS.STORIES + requestQuery(query)}`, {}, callback, errorCallback);
    },
    // t
    // u
    // v
    // w
    // x
    // y
    // z
};
