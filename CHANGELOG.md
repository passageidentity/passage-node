# Change Log - @passageidentity/passage-node

This log was last generated on Wed, 30 Oct 2024 17:11:25 GMT and should not be manually modified.

<!-- Start content -->

## [2.12.0](https://github.com/passageidentity/passage-node/compare/passage-node-v2.11.2...passage-node-v2.12.0) (2024-12-09)


### Features

* Add Audience Validation ([#180](https://github.com/passageidentity/passage-node/issues/180)) ([8d6c7ab](https://github.com/passageidentity/passage-node/commit/8d6c7abd70c0e5283478e89f9c28903c515fda8b))
* **codegen:** create magic link request fields are now optional ([#191](https://github.com/passageidentity/passage-node/issues/191)) ([d36dfdf](https://github.com/passageidentity/passage-node/commit/d36dfdf8897fc264ef274da99d1060440c4c2dda))
* Reorg SDK with new Class Organization ([#174](https://github.com/passageidentity/passage-node/issues/174)) ([2dfcc8a](https://github.com/passageidentity/passage-node/commit/2dfcc8ab1cff4cdff46f79e476f492fd8486f8b4))
* Updated CreateMagicLinkArgs parameter ([#194](https://github.com/passageidentity/passage-node/issues/194)) ([ce2e404](https://github.com/passageidentity/passage-node/commit/ce2e40479741dd02830fec2f36ba3bf83fc41a1b))


### Bug Fixes

* Address Node Feedback ([#190](https://github.com/passageidentity/passage-node/issues/190)) ([0cd94ec](https://github.com/passageidentity/passage-node/commit/0cd94ec0e097af9a8d9a4a2ed7b4fbd5fdac1ccf))
* Use consistent user not found error ([#192](https://github.com/passageidentity/passage-node/issues/192)) ([af438d4](https://github.com/passageidentity/passage-node/commit/af438d41f10b7e216c989b159eab5d948f15a322))

## 2.11.2

Wed, 30 Oct 2024 17:11:25 GMT

### Patches

-   support external fetch api (kevin.flanagan@passage.id)

## 2.11.1

Fri, 18 Oct 2024 18:43:05 GMT

### Patches

-   Update README and LICENSE files (jennifer.macfarlane@agilebits.com)
-   fix: API error messages are now correctly mapped to the PassageError class (chris.tran@agilebits.com)

## 2.11.0

Wed, 04 Sep 2024 16:42:22 GMT

### Minor changes

-   New build that should work for a wider set of tools and frameworks (kevin.flanagan@passage.id)

### Patches

-   Bump ws from 7.5.9 to 7.5.10 (chris.tran@agilebits.com)
-   Bump jose from 4.14.4 to 4.15.5 (chris.tran@agilebits.com)
-   --- updated-dependencies: - dependency-name: express dependency-type: direct:development ... (chris.tran@agilebits.com)
-   Bump braces from 3.0.2 to 3.0.3 (chris.tran@agilebits.com)

## 2.10.1

Tue, 21 May 2024 15:39:51 GMT

### Patches

-   fix: removes modules.exports to correctly uses the esm export syntax (chris.tran@agilebits.com)

## 2.10.0

Thu, 04 Apr 2024 19:11:38 GMT

### Minor changes

-   SDK updates (133175154+danilo-kaltner@users.noreply.github.com)
-   Added new method to get user by identifier, getUserByIdentifier (tamara.deshong@agilebits.com)

## 2.9.0

Thu, 18 Jan 2024 20:24:23 GMT

### Minor changes

-   Added SocialConnectionNotFound 404 Error (vanessa.burroughs@passage.id)

## 2.8.0

Wed, 10 Jan 2024 18:05:01 GMT

### Minor changes

-   use built-in node http IncomingMessage type for requests (kevin.flanagan@passage.id)

## 2.7.0

Thu, 04 Jan 2024 20:09:48 GMT

### Minor changes

-   add AuthMethods field to App (bert.ramirez@agilebits.com)
-   Add social login support (vanessa.burroughs@passage.id)
-   add dark mode settings to AppInfo (bert.ramirez@agilebits.com)
-   SDK updates - Create AuthMethods (vanessa.burroughs@passage.id)

### Patches

-   Bump @babel/traverse from 7.22.11 to 7.23.5 (vanessa.burroughs@passage.id)

## 2.6.0

Mon, 02 Oct 2023 20:13:35 GMT

### Minor changes

-   New API Element customization variables (vanessa.burroughs@passage.id)

## 2.5.3

Wed, 20 Sep 2023 15:48:55 GMT

### Patches

-   Update Beachball publish token command (vanessa.burroughs@passage.id)

## 2.5.2

Mon, 18 Sep 2023 16:20:27 GMT

### Patches

-   Pin beachball to version 2.33.3 (vanessa.burroughs@passage.id)

## 2.5.1

Fri, 15 Sep 2023 18:06:19 GMT

### Patches

-   Include changelog in published package (kevin.flanagan@passage.id)

## 2.5.0

Fri, 15 Sep 2023 17:12:46 GMT

### Minor changes

-   SDK is now generated with openapi-generator (vanessa.burroughs@passage.id)
-   Potentially introduces Typescript errors. Several type names have been added and changed (vanessa.burroughs@passage.id)

## 2.4.2

Fri, 11 Aug 2023 15:16:54 GMT

### Patches

-   [object Object] (vanessa.burroughs@passage.id)

## 2.4.1

Wed, 19 Jul 2023 15:02:00 GMT

### Patches

-   Replace axios for node-fetch (email not defined)

## 2.4.0

Tue, 11 Jul 2023 18:48:21 GMT

### Minor changes

-   create magic link with specific type (anna.pobletts@agilebits.com)

### Patches

-   Fixing the MagicLink Enumeration (bester.duane@gmail.com)

## 2.3.2

Fri, 23 Jun 2023 00:50:10 GMT

### Patches

-   Replace JWKS Lookup with Jose createRemoteJWKSet (1934806+himichaelroberts@users.noreply.github.com)

## 2.3.1

Thu, 22 Jun 2023 01:27:40 GMT

### Patches

-   Update security vulnerabilities in npm packages (mac.evans@passage.id)

## 2.3.0

Fri, 09 Jun 2023 15:32:31 GMT

### Minor changes

-   Export all types from indexfile, clean up eslintconfig and prettierconfigs (jennifer.macfarlane@agilebits.com)

## 2.2.2

Tue, 06 Jun 2023 21:10:47 GMT

### Patches

-   PSG-2003: Replace jsonwebtoken and jwk-to-pem with jose (bester.duane@gmail.com)
-   PSG-2055: fix type errors for when apps default our lib to CJS (bester.duane@gmail.com)

## 2.2.0

Thu, 06 Apr 2023 15:55:49 GMT

### Minor changes

-   Add Auth Fallback Method Properties (1934806+himichaelroberts@users.noreply.github.com)

## 2.1.2

Mon, 06 Feb 2023 16:20:13 GMT

### Patches

-   Improve typing for MagicLinkRequest (kevin.flanagan@passage.id)

## 2.1.1

Wed, 12 Oct 2022 17:08:12 GMT

### Patches

-   add sdk version header (luis.ramirez@passage.id)

## 2.1.0

Wed, 28 Sep 2022 15:34:12 GMT

### Minor changes

-   add new PassageError class for handling errors (chris.loper@passage.id)

## 2.0.4

Wed, 28 Sep 2022 14:49:14 GMT

### Patches

-   PSG-1017: parse cookies without regex (luis.ramirez@passage.id)

## 2.0.3

Fri, 16 Sep 2022 14:08:34 GMT

### Patches

-   add locale support to passage-node (chris.loper@passage.id)

## 2.0.2

Thu, 08 Sep 2022 18:56:38 GMT

### Patches

-   Remove boolean value from promise return type value on authenticateRequest (mac.evans@passage.id)

## 2.0.1

Fri, 02 Sep 2022 14:07:34 GMT

### Patches

-   add refresh token sighOut (chris.loper@passage.id)

## 2.0.0

Tue, 26 Jul 2022 19:59:20 GMT

### Major changes

-   update App and User fields (luis.ramirez@passage.id)

## 1.11.1

Fri, 22 Jul 2022 17:40:00 GMT

### Patches

-   add fields to device type (luis.ramirez@passage.id)

## 1.11.0

Wed, 13 Jul 2022 21:01:30 GMT

### Minor changes

-   improvement in jwks caching (anna.pobletts@gmail.com)

## 1.10.1

Fri, 24 Jun 2022 14:41:19 GMT

### Patches

-   no longer require jwk to validAuthToken (chris.loper@passage.id)

## 1.10.0

Mon, 23 May 2022 16:42:44 GMT

### Minor changes

-   add getApp Details to Passage class (1934806+himichaelroberts@users.noreply.github.com)

## 1.9.0

Mon, 16 May 2022 18:56:55 GMT

### Minor changes

-   JWK support; fetchPublicKey -> fetchJWKs (dylan.brookes@passage.id)

## 1.8.1

Fri, 29 Apr 2022 17:34:59 GMT

### Patches

-   User metadata and devices now supported (dylan.brookes@passage.id)

## 1.8.0

Fri, 29 Apr 2022 16:05:31 GMT

### Minor changes

-   User metadata now supported when creating or updating users (dylan.brookes@passage.id)

### Patches

-   API enhancements (dylan.brookes@passage.id)

## 1.3.0

Fri, 18 Feb 2022 16:32:45 GMT

### Minor changes

-   User status now an enum (no longer active boolean) (dylan.brookes@passage.id)

## 1.2.0

Wed, 05 Jan 2022 17:04:51 GMT

### Minor changes

-   Type safety refinement (dylan.brookes@passage.id)

## 1.1.0

Wed, 15 Dec 2021 21:15:19 GMT

### Minor changes

-   Added User methods: delete, create (dylan.brookes@passage.id)
