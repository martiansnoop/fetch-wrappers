# Fetch wrappers

I wrote a basic project to learn the fetch api, and found myself wanting to reuse certain utilities, so I'm making a project for it. 

# Documentation

## throwingFetch

Throws if the status code is 4xx or 5xx.

```
throwingFetch("url that will return 400 or 500")
  .catch(error => console.log(error));
```

## jsonFetch

Maps the result to its toJson method:

```
jsonFetch("https://your-api.com/api/resource", {method: "GET"})
    .then(json => console.log("json", json));
```

