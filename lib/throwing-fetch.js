const log = require("loglevel");

module.exports = throwingFetch;

// fetch doesn't fail if the http status code is 4xx/5xx because of some 
// reasons that I don't understand, this is a quick fix to at least let
// me know there is an error without having to write an if-check on every 
// single method. I want to eventually find some standard package that does 
// this is a less quick and dirty way, or else potentially write one. 
function throwingFetch(fetch) {
    log.trace("init throwingFetch");
    return (url, options) => {
        return fetch(url, options).then(r => {
            log.trace("throwingFetch called, throwing if", !r.ok)
            if(!r.ok) throw new Error(r.status + ": " + r.statusText);
            return r;
        });
    };
}

