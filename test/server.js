const http = require("http");
const dispatcher= require("httpdispatcher");

const server = http.createServer((request, response) => {
    try {
        console.log(request.url);
        dispatcher.dispatch(request, response);
    }
    catch(error) {
        console.log(error);
    }
});

dispatcher.onGet('/getJson', (req, res) => {
    const returnVal = {
        foo: "kittens", 
        bar: 12
    };
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(returnVal));
});

dispatcher.onGet("/400", (req, res) => {
    res.writeHead(400);
    res.end("an error happened");
});

const port = 1234;
server.listen(port, () => {
    console.log("server listening on http://localhost:%s", port);
});
