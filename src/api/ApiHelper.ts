//chapter 2

import { APIRequestContext } from "@playwright/test";

export class ApiHelper {

    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }


    //GET
    async get(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.get(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        //console.log('API GET response: ', response);
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //POSt
    async post(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        return {
            status: response.status(),
            body: await response.json()
        }
    }


    //PUT
    async put(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //Delete
    async delete(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseURL}${endPoint}`, {
            headers: headers
        });
        return {
            status: response.status()
        }
    }

}