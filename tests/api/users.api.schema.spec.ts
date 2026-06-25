//schema : type of response data
//P ---> C
//ajv --> node lib for the schema validation
//npm install ajv


import { test, expect } from '../../src/fixtures/apifixtures';
import Ajv from 'ajv';

let TOKEN = process.env.API_TOKEN;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

//setup the AJV:
let ajv = new Ajv();

//define JSON schema:
let userSchema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
};


let userArraysSchema = {
    "type": "array",
    "items": userSchema
};



test('@smoke GET -- get a user', async ({ apiHelper }) => {

    let userData = {
        name: 'schema test',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };


    //post -- create a user
    let createResponse = await apiHelper.post("/public/v2/users", userData, AUTH_HEADER);
    let userId = createResponse.body.id;

    //get - get a user
    let getUserResponse = await apiHelper.get(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(getUserResponse.status).toBe(200);

    //schema validation code:
    let validate = ajv.compile(userSchema);
    let isSchemaValid = validate(getUserResponse.body)

    if (!isSchemaValid) {
        console.log("Schema Errors: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();

});


test('@smoke GET -- get all users', async ({ apiHelper }) => {

    //get - get a user
    let getUsersResponse = await apiHelper.get(`/public/v2/users`, AUTH_HEADER);
    expect(getUsersResponse.status).toBe(200);

    //schema validation code:
    let validate = ajv.compile(userArraysSchema);
    let isSchemaValid = validate(getUsersResponse.body)

    if (!isSchemaValid) {
        console.log("Schema Errors: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();

});