import { test, expect } from '@playwright/test';

let AUTH_TOKEN = { Authorization: 'Bearer 1d845aa4bebcdb0fea690adf59de3b6fb715af4f80c5eb86c3556abc69909d81' };


test.skip('get user test', async ({ request }) => {

    let response = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    });

    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);

});

test.skip('create a user test', async ({ request }) => {

    //JS Object
    let userData = {
        name: 'uday',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    //JS Object to JSON: Serialization
    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });

    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());//201
    console.log(response.statusText()); //Created
});


test.skip('Update a user test', async ({ request }) => {

    //JS Object
    let userData = {
        name: 'uday101',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'inactive'
    };

    //JS Object to JSON: Serialization
    let response = await request.put('https://gorest.co.in/public/v2/users/8501947', {
        headers: AUTH_TOKEN,
        data: userData
    });

    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());//200
    console.log(response.statusText()); //OK
});


test.skip('Delete a user test', async ({ request }) => {

    //JS Object to JSON: Serialization
    let response = await request.delete('https://gorest.co.in/public/v2/users/8501947', {
        headers: AUTH_TOKEN,
    });

    console.log(response.status());//204
    console.log(response.statusText()); //No Content
});