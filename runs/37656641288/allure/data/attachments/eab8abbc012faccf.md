# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/spotify.oauth2.spec.ts >> @regression GET -- get albums data
- Location: tests/api/spotify.oauth2.spec.ts:31:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
```

# Test source

```ts
  1  | 
  2  | import { test, expect } from '@playwright/test';
  3  | 
  4  | 
  5  | let OAUTH_CONFIG = {
  6  |     tokenURL: 'https://accounts.spotify.com/api/token',
  7  |     clientId: process.env.OAUTH_CLIENT_ID!,
  8  |     clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  9  |     grantType: process.env.GRANT_TYPE!
  10 | }
  11 | 
  12 | let accessToken: string;
  13 | 
  14 | test.beforeEach('POST -- generate the access token', async ({ request }) => {
  15 | 
  16 |     let response = await request.post(OAUTH_CONFIG.tokenURL, {
  17 |         form: {
  18 |             grant_type: OAUTH_CONFIG.grantType,
  19 |             client_id: OAUTH_CONFIG.clientId,
  20 |             client_secret: OAUTH_CONFIG.clientSecret
  21 |         }
  22 |     });
  23 | 
> 24 |     expect(response.status()).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  25 |     let jsonResponse = await response.json();
  26 |     console.log(jsonResponse);
  27 |     accessToken = jsonResponse.access_token;
  28 | });
  29 | 
  30 | 
  31 | test('@regression GET -- get albums data', async ({ request }) => {
  32 | 
  33 |     //https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy
  34 |     let baseURL = 'https://api.spotify.com';
  35 |     let endPointURL = '/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';
  36 | 
  37 | 
  38 |     let albumResponse = await request.get(`${baseURL}${endPointURL}`, {
  39 |         headers: {
  40 |             Authorization: `Bearer ${accessToken}`
  41 |         }
  42 |     });
  43 | 
  44 |     expect(albumResponse.status()).toBe(200);
  45 |     console.log(await albumResponse.json());
  46 | 
  47 |     let locationJson = await albumResponse.json();
  48 |     console.log(locationJson.images.length);
  49 | 
  50 | });
  51 | 
  52 | 
  53 | 
  54 | 
```