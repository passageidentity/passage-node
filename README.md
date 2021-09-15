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
import passage from "passage-node";
import express from "express";

const app = express();
const port = 3000;

let passageConfig = {
  appID: "YOUR_APP_ID",
  /** Optional Config Options:
    apiKey: "YOUR_API_KEY",
    authStrategy: "YOUR_AUTH_STRATEGY",
    **/
};

app.get(
  "/authenticatedRoute",
  passage(passageConfig),
  async (req, res, next) => {
    // Here you can access your Passage instance
    let apiKey = res.passage.apiKey;
    let publicKey = res.passage.publicKey;
    let validAuthToken = res.passage.validAuthToken("TOKEN", "PUBLIC_KEY");

    // To use the Passage API for users, use passage.user
    let userObject = await res.passage.user.get("USER_ID");
    let activateUserResponseObject = await res.passage.user.activate("USER_ID");
    let deactivateUserResponseObject = await res.passage.user.deactivate(
      "USER_ID"
    );

    res.send("This is an authenticated route!");
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

## Using The Passage API Without Express

Use the Passage API by initializing a Passage class.
You will need to provide Passage with your app ID, and your Passage API Key.

```javascript
import { Passage } from "passage-node";

let passageConfig = {
  appID: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
};

let passage = new Passage(passageConfig);

async function main() {
  let publicKey = await passage.fetchPublicKey();
  let userObject = await passage.user.get("USER_ID");
  let activateUserResponseObject = await passage.user.activate("USER_ID");
  let deactivateUserResponseObject = await passage.user.deactivate("USER_ID");
  let validAuthToken = passage.validAuthToken("TOKEN", "PUBLIC_KEY");
}
```

## Class Methods

[Click here](https://github.com/passageidentity/passage-node/blob/main/src/classes/readme.MD) to view all available class methods.
