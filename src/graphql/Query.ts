import axios from "axios";
import { DimoError } from "../utils/error";

// GraphQL query factory function
export const Query = async (resource: any, baseUrl: any, params: any = {}) => {
  /**
   * Headers
   */

  let headers: Record<string, string> = {};
  if (["access_token", "privilege_token"].includes(resource.auth)) {
    if (params.headers.Authorization) {
      headers = params.headers;
    } else {
      throw new DimoError(`Access token not provided for ${resource.auth} authentication`);
    }
  }
  headers = {
    ...headers,
    ...{
      "Content-Type": "application/json",
      "User-Agent": "dimo-node-sdk",
    },
  };

  const variables = resource.params || {};
  let query = resource.query;

  for (const key in variables) {
    const placeholder = new RegExp(`\\$${key}\\b`, "g");
    if (variables[key] === true) {
      if (!params[key]) {
        console.error(`Missing required input: ${key}`);
        throw new DimoError(`Missing required input: ${key}`);
      }
      const value = typeof params[key] === "string" ? `"${params[key]}"` : params[key];
      query = query.replace(placeholder, value);
    }
  }

  try {
    const response = await axios({
      method: "POST",
      url: baseUrl,
      headers: headers,
      data: {
        query,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error executing GraphQL query:", error);
    throw new DimoError(`Error`);
  }
};

export const CustomQuery = async (resource: any, baseUrl: string, params: any = {}) => {
  /**
   * Headers
   */

  let headers: Record<string, string> = {};
  if (["access_token", "privilege_token"].includes(resource.auth)) {
    if (params.headers.Authorization) {
      headers = params.headers;
    } else {
      throw new DimoError(`Access token not provided for ${resource.auth} authentication`);
    }
  }
  headers = {
    ...headers,
    ...{
      "Content-Type": "application/json",
      "User-Agent": "dimo-node-sdk",
    },
  };

  const query = params.query || {};
  try {
    const response = await axios({
      method: "POST",
      url: baseUrl,
      headers: headers,
      data: {
        query,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error executing Custom GraphQL query:", error);
    throw new DimoError("Error executing Custom GraphQL query");
  }
};
