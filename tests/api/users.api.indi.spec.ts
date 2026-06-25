import { test, expect } from '../../src/fixtures/apifixtures';

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = {
    Authorization: `Bearer ${TOKEN}`,
};

//helper - generic function - create a fresh user
async function createUser(apiHelper: any) {
    let userData = {
        name: 'Naveen API',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;
}


//Test 1: Create a user test + verify: AAA
//POST ---> userId --> GET /userId -- verify
test('@regression POST - create a user', async ({ apiHelper }) => {

    //create a user:
    let userResponse = await createUser(apiHelper);

    //get the user:
    let response = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Naveen API");

});


//Test 2: Update a user test + verify: AAA
//POST ---> userId --> PUT --> GET /userId -- verify
test('@regression PUT - update a user', async ({ apiHelper }) => {
    //create a user: POST
    let userResponse = await createUser(apiHelper);
    let userUpdatedData = {
        name: 'Naveen API Updated',
        status: 'inactive'
    };

    //update the user:
    let response = await apiHelper.put(`/public/v2/users/${userResponse.id}`, userUpdatedData, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userUpdatedData.name);
    expect(response.body.status).toBe(userUpdatedData.status);

    //get the user:
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(userUpdatedData.name);
    expect(getResponse.body.status).toBe(userUpdatedData.status);

});



//Test 3: Delete a user test + verify: AAA
//POST ---> userId --> DELETE(204) --> GET /userId -- verify(404)
test('@regression DELETE - delete a user', async ({ apiHelper }) => {
    //create a user: POST
    let userResponse = await createUser(apiHelper);

    //update the user:
    let response = await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(response.status).toBe(204);

    //get the user:
    let getResponse = await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body.message).toBe('Resource not found');
});