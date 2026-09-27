

import { test, expect } from '../../src/fixtures/apifixtures';



let accessToken: string;

test.beforeEach('POST -- generate the access token', async ({ request }) => {

    let creds = {
        username: "admin",
        password: "password123"
    }

    let authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: creds,
        headers: { 'Content-Type': 'application/json' }
    });

    expect(authResponse.status()).toBe(200);
    let jsonResponse = await authResponse.json();
    console.log(jsonResponse);
    accessToken = jsonResponse.token;
    console.log('token ===>', accessToken);
});

test('booking CRUD with token', async ({ request }) => {
    const base = 'https://restful-booker.herokuapp.com';

    // create (no auth needed)
    const createRes = await request.post(`${base}/booking`, {
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        },
    });
    expect(createRes.status()).toBe(200);
    const bookingJson = await createRes.json();
    const bookingid = bookingJson.bookingid;
    console.log('Booking ID: ', bookingid);

    // update (needs token)
    const updateRes = await request.put(`${base}/booking/${bookingid}`, {
        headers: { Cookie: `token=${accessToken}` },
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 121,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Lunch"
        },
    });
    expect(updateRes.status()).toBe(200);
    expect((await updateRes.json()).lastname).toBe('Brown');

    // delete (needs token)
    const deleteRes = await request.delete(`${base}/booking/${bookingid}`, {
        headers: { Cookie: `token=${accessToken}` },
    });
    expect(deleteRes.status()).toBe(201);   // restful-booker returns 201 on delete
});