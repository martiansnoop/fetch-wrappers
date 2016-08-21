"use strict";
const fetch = require("node-fetch");

const jsonFetch = require("./lib/json-fetch");
const cookieFetch = require("./lib/cookie-fetch");
const throwingFetch = require("./lib/throwing-fetch");

//TODO: should these exports instead be the wrapper functions themselves?
//That would allow more configurability but would involve more boilerplate.
module.exports = {
    jsonFetch: jsonFetch(fetch),
    cookieFetch: cookieFetch(fetch),
    throwingFetch: throwingFetch(fetch),
    uberFetch: jsonFetch(throwingFetch(cookieFetch(fetch)))
};

