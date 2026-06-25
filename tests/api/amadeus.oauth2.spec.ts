
import { test, expect } from '@playwright/test';


let OAUTH_CONFIG = {
    tokenURL: 'https://test.api.amadeus.com/v1/security/oauth2/token',
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


test('@regression GET -- get location data', async ({ request }) => {

    //https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=MUC&countryCode=DE
    let baseURL = 'https://test.api.amadeus.com';
    let endPointURL = '/v1/reference-data/locations';

    let queryParam = {
        subType: 'CITY,AIRPORT',
        keyword: 'MUC',
        countryCode: 'DE'
    };

    let locationResponse = await request.get(`${baseURL}${endPointURL}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        params: queryParam

    });

    expect(locationResponse.status()).toBe(200);
    console.log(await locationResponse.json());

    let locationJson = await locationResponse.json();
    console.log(locationJson.meta.count);

    let location1 = locationJson.data[0];
    console.log(location1);
});



