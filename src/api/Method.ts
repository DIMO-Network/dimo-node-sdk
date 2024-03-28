import axios from 'axios';
import * as functionIndex from '../api/functions/';
import { DimoEnvironment } from 'environments';

export async function Method(resource: any, baseUrl: any, params: any = {}, env: keyof typeof DimoEnvironment) {

    /**
     * Headers
     */

    let headers: Record<string, string> = {};
    
    if (['access_token', 'privilege_token'].includes(resource.auth)) {
        if (params.headers.Authorization) {
            headers = params.headers;
        } else {
            throw new Error(`Access token not provided for ${resource.auth} authentication`);
        }
    }

    if (resource.headers) {
        headers = { ...headers, ...resource.headers }
    }

    // If resource.method is 'FUNCTION', call the function defined by 'resource.path'
    if (resource.method === 'FUNCTION') {
        const functionName = resource.path; 
        const dynamicFunction = (functionIndex as Record<string, Function>)[functionName];
        if (typeof dynamicFunction === 'function') {
            // Call the dynamic function with params and pass the necessary arguments
            return dynamicFunction(params, env);
        } else {
            throw new Error(`Function in ${resource.path} is not a valid function.`);
        }
    }
    
    /**
     * Query Parameters
     * Extract required queryParams from the resource object
     */ 

    const queryParams = resource.queryParams || {};
    // Check if required queryParams match with incoming params
    for (const key in queryParams) {
        // We'll fail early if there's a missing required query param from the user
        if (queryParams[key] === true && !params[key]) {
            console.error(`Missing required query parameter: ${key}`);
            throw new Error(`Missing required query parameter: ${key}`);
        }
        // Keep the constants if they are fed in as strings
        if (typeof queryParams[key] === 'string') {
            params[key] = queryParams[key]
        }
    }

    /**
     * URL Parameters
     * Check for placeholders in the resource path and replace them with values from params
     */ 

    let url = baseUrl + resource.path;

    const placeholderRegex = /:([\w]+)/g;
    let match;
    while ((match = placeholderRegex.exec(resource.path)) !== null) {
        const key = match[1];
        const value = params[key];
        if (value !== undefined) {
            url = url.replace(match[0], value.toString());
        }
    }
    
    /**
     * Body Parameters
     */

    let body: Record<string, string> = {};

    if (resource.body) {
        for (const key in resource.body) {
            if (typeof resource.body[key] === 'boolean') {
                if (!params[key]) {
                    console.error(`Missing required body parameter: ${key}`);
                    throw new Error(`Missing required body parameter: ${key}`);
                } else {
                    body[key] = params[key];
                }
            } else if (typeof resource.body[key] === 'string') {
                body[key] = resource.body[key];
            }
        }
    }

    // console.log('Body: ', body);
    // console.log('Headers: ', headers);
    // console.log('User Defined Params: ', params);
    // console.log('URL: ', url);
    // console.log('============================')

    try {
        const response = await axios({
            method: resource.method,
            url: url,
            params: resource.queryParams ? params : {},
            data: resource.body ? body : '',
            headers: headers
        });

        // Return response.data directly if resource.return does not exist
        if (!resource.return) {
            return response.data; 
        }
    
        // Special returns for access_token & privilege token
        let authHeader = {};
    
        if (resource.return === 'access_token') {
            authHeader = { Authorization: `Bearer ${response.data.access_token}` };
        } else if (resource.return === 'privilege_token') {
            authHeader = { Authorization: `Bearer ${response.data.token}` };
        }
    
        return { headers: authHeader };
    } catch (error: any) {
        console.error('API call error:', error.response.data);
        // throw error;
    }
}