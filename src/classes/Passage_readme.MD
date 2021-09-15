## Functions

<dl>
<dt><a href="#authenticateRequest">authenticateRequest(req, res, next)</a> ⇒</dt>
<dd><p>Authenticate request with a cookie, or header. If no authentication
strategy is given, authenticate the request via cookie (default
authentication strategy).</p>
</dd>
<dt><a href="#fetchPublicKey">fetchPublicKey()</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Fetch the corresponding public key for this Passage instance.</p>
</dd>
<dt><a href="#authenticateRequestWithHeader">authenticateRequestWithHeader(req, res, next)</a> ⇒</dt>
<dd><p>Authenticate a request via the http header.</p>
</dd>
<dt><a href="#authenticateRequestWithCookie">authenticateRequestWithCookie(req, res, next)</a> ⇒</dt>
<dd><p>Authenticate request via cookie.</p>
</dd>
<dt><a href="#validAuthToken">validAuthToken(token, publicKey)</a> ⇒ <code>boolean</code></dt>
<dd><p>Determine if the provided token is valid when compared with its
respective public key.</p>
</dd>
</dl>

<a name="authenticateRequest"></a>

## authenticateRequest(req, res, next) ⇒
Authenticate request with a cookie, or header. If no authentication
strategy is given, authenticate the request via cookie (default
authentication strategy).

**Kind**: global function  
**Returns**: Middleware function for use in authentication  

| Param | Description |
| --- | --- |
| req | Express request |
| res | Express response |
| next | Express next |

<a name="fetchPublicKey"></a>

## fetchPublicKey() ⇒ <code>Promise.&lt;string&gt;</code>
Fetch the corresponding public key for this Passage instance.

**Kind**: global function  
**Returns**: <code>Promise.&lt;string&gt;</code> - publicKey  
<a name="authenticateRequestWithHeader"></a>

## authenticateRequestWithHeader(req, res, next) ⇒
Authenticate a request via the http header.

**Kind**: global function  
**Returns**: Middleware function for use in header authentication  

| Param | Description |
| --- | --- |
| req | Express request |
| res | Express response |
| next | Express next |

<a name="authenticateRequestWithCookie"></a>

## authenticateRequestWithCookie(req, res, next) ⇒
Authenticate request via cookie.

**Kind**: global function  
**Returns**: Middleware function for use in cookie authentication  

| Param | Description |
| --- | --- |
| req | Express request |
| res | Express response |
| next | Express next |

<a name="validAuthToken"></a>

## validAuthToken(token, publicKey) ⇒ <code>boolean</code>
Determine if the provided token is valid when compared with its
respective public key.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the jwt can be verified, false jwt cannot be verified  

| Param | Description |
| --- | --- |
| token | Authentication token |
| publicKey | The public key corresponding to the Passage application |

