
import { test, expect } from '@playwright/test';


let OAUTH_CONFIG = {
    tokenURL: 'https://accounts.spotify.com/api/token',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE!
}

let accessToken: string;

test.beforeEach('POST -- generate the access token', async ({ request }) => {

    let response = await request.post(OAUTH_CONFIG.tokenURL, {
        form: {
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret
        }
    });

    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    accessToken = jsonResponse.access_token;
});


test('@regression GET -- get albums data', async ({ request }) => {

    //https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy
    let baseURL = 'https://api.spotify.com';
    let endPointURL = '/v1/albums/4aawyAB9vmqN3uQ7FjRGTy';


    let albumResponse = await request.get(`${baseURL}${endPointURL}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    expect(albumResponse.status()).toBe(200);
    console.log(await albumResponse.json());

    let locationJson = await albumResponse.json();
    console.log(locationJson.images.length);

});



