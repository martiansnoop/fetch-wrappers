"use strict";
const {cookieFetch, jsonFetch, throwingFetch, uberFetch} = require("../index.js");
const expect = require("chai").expect;

describe("Throwing Fetch", function() {
    it("triggers error handler on 4xx or 5xx response code", function(done) {
        throwingFetch("http://localhost:1234/400", {method: "GET"})
          .then(() => {
              throw new Error("request succeeded, should fail");
          })
          .catch(error => {
              console.log("error ", error);
              done();
          });
    });
});


describe("Cookie Fetch", function() {
    it("saves set-cookie header and reapplies it to outgoing requests", function() {
        // not sure which api's to use to test this        
        throw new Error("test not implemented");
    });
});

describe("Json Fetch", function() {
    it("maps success response to .json()", function(done) {
        jsonFetch("http://localhost:1234/getJson", {method: "GET"})
          .then(returned => {
              console.log(returned)
              expect(returned.foo).to.equal("kittens");
              expect(returned.bar).to.equal(12);
              done();
          });
    });
});

