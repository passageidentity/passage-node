# passage-node

This Node.js SDK allows for verification of server-side authentication for applications using [Passage](https://passage.id)

Install this package using npm.

```
npm i --save passage-node
```

## Authenticating a Request

To authenticate an HTTP request in an Express application, you can use the Passage as a middleware in your Express server.
You need to provide Passage with your app ID in order to verify the JWTs.

```javascript
import passage from "Passage";

import express from "express";
const app = express();
const port = 3000;

app.use("/authenticated_route", {
  appID: "YOUR_APP_ID",
  /** optional
    apiKey: "YOUR_API_KEY",
    authStrategy: "YOUR_AUTH_STRATEGY,
    failureRedirect: "YOUR_FAILURE_REDIRECT",
    **/
});

app.get("/authenticated_route", (req, res) => {
  res.send("Successful authentication via Passage.");
});

app.list(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```
