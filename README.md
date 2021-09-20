# passage-node

This Node.js SDK allows for verification of server-side authentication for applications using [Passage](https://passage.id)

Install this package using npm.

```
npm i --save passage-node
```

## HTTP authentication using the Passage class

Use the Passage API by initializing a Passage class.
You will need to provide Passage with your app ID, and your Passage API Key.

```javascript
import { Passage } from "passage-node";

let passageConfig = {
  appID: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
};

let passage = new Passage(passageConfig);

// Authentication using passage class instance
let passage = new Passage(passageConfig);
app.get("/authenticatedRoute", async (req, res) => {
  try {
    let userID = await passage.authenticateRequest(req, res);
    if (userID) {
      // user is authenticated
      let { email } = passage.user.get(userID);
      res.render("You're authenticated with Passage!");
    }
  } catch (e) {
    // authentication failed
    console.log(e);
    res.send("Authentication failed!");
  }
});
```

## Authenticating a Request With Middleware

To authenticate an HTTP request in an Express application, you can use the Passage as a middleware in your Express server.
You need to provide Passage with your app ID in order to verify the JWTs.

```javascript
import Passage from "@passageidentity/passage-node";
import express from "express";

const app = express();
const port = 3000;

let passageConfig = {
  appID: "YOUR_APP_ID",
};

// example of custom middleware
let passage = new psg(passageConfig);
let customMiddleware = (() => {
  return async (req: any, res: any, next: NextFunction) => {
    try {
      let userID = await passage.authenticateRequest(req);
      if (userID) res.userID = userID;
      else res.userID = false;
      next();
    } catch (e) {
      console.log(e);
      res.status(401).send("Could not authenticate user!");
    }
  };
})();

// example implementation of custom middleware
app.get("/", customMiddleware, async (req: Request, res: any) => {
  let userID = res.userID;
  if (userID) {
    res.send(userID);
  } else {
    res.send("Failed to get user");
  }
});

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
```

## Class Methods

[Click here](https://github.com/passageidentity/passage-node/blob/main/src/classes/readme.MD) to view all available class methods.
