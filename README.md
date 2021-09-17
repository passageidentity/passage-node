# passage-node

This Node.js SDK allows for verification of server-side authentication for applications using [Passage](https://passage.id)

Install this package using npm.

```
npm i --save passage-node
```

## Authenticating a Request With Express & Passage

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

// Authentication using the built-in Passage middleware for Express
let passage = new Passage(passageConfig);
app.get("/authenticatedRoute", passage.express, async (req, res) => {
  /** The user has been authenticated!
    Note: you can access passage methods and
    attributes with res.passage, or access
    user information using res.passage.user

    For example, if I want a user ID: res.passage.user.id
    To retrieve that user: await res.passage.user.get(USER_ID_HERE)
  **/
  res.render("You've been authenticated with Passage!");
});

app.listen(5000, () => {
  console.log(`Example app listening on port 5000`);
});
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

## Class Methods

[Click here](https://github.com/passageidentity/passage-node/blob/main/src/classes/readme.MD) to view all available class methods.
