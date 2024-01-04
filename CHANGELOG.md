# Change Log - @passageidentity/passage-node

This log was last generated on Thu, 04 Jan 2024 20:09:48 GMT and should not be manually modified.

<!-- Start content -->

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
