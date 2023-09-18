<img src="https://storage.googleapis.com/passage-docs/passage-logo-gradient.svg" alt="Passage logo" style="width:250px;"/>

[![npm version](https://badge.fury.io/js/@passageidentity%2Fpassage-node.svg)](https://badge.fury.io/js/@passageidentity%2Fpassage-node)

# passage-node

This Node.js SDK allows for verification of server-side authentication for applications using [Passage](https://passage.id).

Install this package using npm.

```
npm i @passageidentity/passage-node
```

## Authenticating a Request

To authenticate an HTTP request in an Express application, you can use the Passage SDK to check a request for a valid authentication token.
You need to provide Passage with your App ID in order to verify the JWTs.

```javascript
import Passage from '@passageidentity/passage-node';
import express from 'express';

const app = express();
const port = 3000;

let passageConfig = {
    appID: 'YOUR_APP_ID',
};

// example of custom middleware
let passage = new Passage(passageConfig);
let passageAuthMiddleware = (() => {
    return async (req, res, next) => {
        await passage
            .authenticateRequest(req)
            .then((userID) => {
                if (userID) {
                    res.userID = userID;
                    return next();
                } else return res.status(401).send('unauthorized');
            })
            .catch(() => {
                return res.status(401).send('Could not authenticate user!');
            });
    };
})();

// example implementation of custom middleware
app.get('/authenticatedRoute', passageAuthMiddleware, async (req, res) => {
    // authenticated user
    let userID = res.userID;
});

app.listen(port, () => {
    console.log(`Example app running`);
});
```

## Retrieve App Info

To retrieve information about an app, you should use the `passage.getApp()` function.

```javascript
import Passage from '@passageidentity/passage-node';

let passageConfig = {
    appID: 'YOUR_APP_ID',
};

let passage = new Passage(passageConfig);

let passageApp = await passage.getApp();
```

## Retrieve User Info

To retrieve information about a user, you should use the `passage.user.get()` function. You will need to use a Passage API key, which can be created in the Passage Console under your Application Settings. This API key grants your web server access to the Passage management APIs to get and update information about users. This API key must be protected and stored in an appropriate secure storage location. It should never be hard-coded in the repository.

```javascript
import Passage from '@passageidentity/passage-node';
import express from 'express';

const app = express();
const port = 3000;

let passageConfig = {
    appID: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
};
let passage = new Passage(passageConfig);

// example authenticated route
app.get('/authenticatedRoute', passageAuthMiddleware, async (req, res) => {
    // get passage user ID from middleware
    let userID = res.userID;

    // get user info
    let passageUser = await passage.user.get(userID);
    console.log(passageUser.email);
});
```

## Activate/Deactivate User

You can also activate or deactivate a user using the Passage SDK. These actions require an API Key and deactivating a user will prevent them from logging into your application with Passage.

```javascript
import Passage from '@passageidentity/passage-node';
import express from 'express';

const app = express();
const port = 3000;

let passageConfig = {
    appID: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
};
let passage = new Passage(passageConfig);

// example authenticated route
app.get('/authenticatedRoute', passageAuthMiddleware, async (req, res) => {
    // get passage user ID from middleware
    let userID = res.userID;

    // deactivate user
    let passageUser = await passage.user.deactivate(userID);
    console.log(passageUser.activate);
});
```

## Update User Attributes

With the Passage SDK, you can update a User's attributes. These actions require an API Key and deactivating a user will prevent them from logging into your application with Passage.

```javascript
import Passage from '@passageidentity/passage-node';
import express from 'express';

const app = express();
const port = 3000;

let passageConfig = {
    appID: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
};
let passage = new Passage(passageConfig);

// example authenticated route
app.get('/authenticatedRoute', passageAuthMiddleware, async (req, res) => {
    // get passage user ID from middleware
    let userID = res.userID;
    let newAttributes = {
        email: 'newEmail@domain.com',
        phone: '+15005550006',
        // note that user_metadata is an optional field and is defined in your Passage App settings.
        user_metadata: {
            examplefield: 123,
        },
    };

    // update user attributes
    let passageUser = await passage.user.update(userID, newAttributes);
    console.log(passageUser);
});
```

## Delete A User

To delete a Passage user, you will need to provide the `userID`, and corresponding app credentials.

```javascript
import Passage from '@passageidentity/passage-node';
import express from 'express';

const app = express();
const port = 3000;

let passageConfig = {
    appID: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
};
let passage = new Passage(passageConfig);

// example authenticated route
app.get('/authenticatedRoute', passageAuthMiddleware, async (req, res) => {
    // get passage user ID from middleware
    let userID = res.userID;

    // deactivate user
    let deletedPassageUser = await passage.user.delete(userID);
    console.log(deletedPassageUser); // true
});
```

## Create A User

You can also create a Passage user by providing an `email` or `phone` (phone number must be a valid E164 phone number).

```javascript
import Passage from '@passageidentity/passage-node';

let passageConfig = {
    appID: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
};
let passage = new Passage(passageConfig);

// note that user_metadata is an optional field and is defined in your Passage App settings.
let newPassageUser1 = passage.user.create({
    email: 'newEmail@domain.com',
    user_metadata: {
        examplefield: 123,
    },
});
console.log(newPassageUser1); // [userObject]

let newPassageUser2 = passage.user.create({
    phone: '+15005550006',
});
console.log(newPassageUser2); // [userObject]
```

## Create A Magic Link

You can also create a Passage magic link by providing a MagicLinkRequest type

```javascript
import Passage from '@passageidentity/passage-node';

let passageConfig = {
    appID: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
};
let passage = new Passage(passageConfig);

let magicLink = passage.createMagicLink({
    email: 'newEmail@domain.com',
    channel: 'email',
});
```
