"use strict";
const log = require("loglevel");

module.exports = cookieFetch;

// I couldn't figure out how to get fetch-cookie to work, probably doing
// something wrong. This just wraps fetch looking for the set-cookie header and
// saves off the cookies to include in subsequent requests. Currently every 
// request with a set-cookie header will overwrite any previous cookies that 
// have bee saved off.
function cookieFetch(fetch) {
    log.trace("cookie fetch is alive");
    let cookies = [];

    return (url, options) => {
        log.trace("calling cookieFetch");
        if(cookies.length !== 0) {
            options = options || {};
            options.headers = options.headers || {};
            log.trace("setting cookies on request", cookies)
            options.headers["cookie"] = cookies;
        };
        return fetch(url, options).then(r => {
            if(r.ok) {
                log.trace("attempt to set cookie", r.headers)
                const setCookie = r.headers.getAll("set-cookie");
                if(setCookie && setCookie.length) {
                    log.trace("persisting cookies", setCookie);
                    cookies = parseCookies(setCookie);
                };
            }
            return r;
        });
    };
    
    // rawCookies is a string[], members of which look like
    // 'AK=9eOBQQVj0f;Version=1;Domain=.dev.praesid.io;Path=/;Max-Age=5400;Secure;HttpOnly'
    // stript off all but the beginning part, worry about expiration and other
    // stuff later
    function parseCookies(rawCookies) {
        return rawCookies.map(raw => raw.split(";")[0]);
    }
}

