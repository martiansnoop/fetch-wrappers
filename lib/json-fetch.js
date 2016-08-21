"use strict";

module.exports = jsonFetch;

function jsonFetch(fetch) {
    return (url, options) => {
        return fetch(url, options).then(response => response.json());
    }
}
