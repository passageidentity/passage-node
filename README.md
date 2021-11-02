# passage-node

This Node.js SDK allows for verification of server-side authentication for applications using [Passage](https://passage.id)

Install this package using npm.

```
npm i --save passage-node
```

## Authenticating a Request

To authenticate an HTTP request in an Express application, you can use the Passage SDK to check a request for a valid authentication tokekn.
You need to provide Passage with your App ID in order to verify the JWTs.

```javascript
import Passage from "@passageidentity/passage-node";
import express from "express";

const app = express();
const port = 3000;

let passageConfig = {
  appID: "YOUR_APP_ID",
};

// example of custom middleware
let passage = new Passage(passageConfig);
let passageAuthMiddleware = (() => {
  return async (req: any, res: any, next: NextFunction) => {
    try {
      let userID = await passage.authenticateRequest(req);
      if (userID) {
        // successfully authenticated. save user ID and continue
        res.userID = userID;
        next();
      }
    } catch (e) {
      // failed authentication
      console.log(e);
      res.status(401).send("Could not authenticate user!");
    }
  };
})();

// example implementation of custom middleware
app.get(
  "/authenticatedRoute",
  passageAuthMiddleware,
  async (req: Request, res: any) => {
    let userID = res.userID;
    // do authenticated things...
  }
);

app.listen(port, () => {
  console.log(`Example app running`);
});
```

## Retrieve User Info

To retrieve information about a user, you should use the `passage.user.get()` function. You will need to use a Passage API key, which can be created in the Passage Console under your Application Settings. This API key grants your web server access to the Passage management APIs to get and update information about users. This API key must be protected and stored in an appropriate secure storage location. It should never be hard-coded in the repository.

```javascript
import Passage from "@passageidentity/passage-node";
import express from "express";

const app = express();
const port = 3000;

let passageConfig = {
  appID: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
};
let passage = new Passage(passageConfig);

// example authenticated route
app.get(
  "/authenticatedRoute",
  passageAuthMiddleware,
  async (req: Request, res: any) => {
    // get passage user ID from middleware
    let userID = res.userID;

    // get user info
    let passageUser = await passage.user.get(userID);
    console.log(passageUser.email);
  }
);
```

## Activate/Deactivate User

You can also activate or deactivate a user using the Passage SDK. These actions require an API Key and deactivating a user will prevent them from logging into your application with Passage.

```javascript
import Passage from "@passageidentity/passage-node";
import express from "express";

const app = express();
const port = 3000;

let passageConfig = {
  appID: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
};
let passage = new Passage(passageConfig);

// example authenticated route
app.get(
  "/authenticatedRoute",
  passageAuthMiddleware,
  async (req: Request, res: any) => {
    // get passage user ID from middleware
    let userID = res.userID;

    // deactivate user
    let passageUser = await passage.user.deactivate(userID);
    console.log(passageUser.activate);
  }
);
```

## Update User Attributes

With the Passage SDK, you can update a User's attributes. These actions require an API Key and deactivating a user will prevent them from logging into your application with Passage.

```javascript
import Passage from "@passageidentity/passage-node";
import express from "express";

const app = express();
const port = 3000;

let passageConfig = {
  appID: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY",
};
let passage = new Passage(passageConfig);

// example authenticated route
app.get(
  "/authenticatedRoute",
  passageAuthMiddleware,
  async (req: Request, res: any) => {
    // get passage user ID from middleware
    let userID = res.userID;
    let newAttributes = {
      email: "newEmail@domain.com",
      phone: "+15005550006",
    };

    // update user attributes
    let passageUser = await passage.user.update(userID, newAttributes);
    console.log(passageUser);
  }
);
```
