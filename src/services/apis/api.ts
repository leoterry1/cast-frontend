import axios, { AxiosResponse } from "axios";

export interface EndpointDeclaration {
  name: string;
  method: string;
  url: string;
}

export interface EndpointData {
  data?: {};
  id?: string | number;
  params?: {};
  headers?: {}
}

export interface RequestData {
  method: string;
  url: string;
  data?: {};
  id?: string | number;
  params?: {};
  baseUrl: string;
  headers: {}
}

export interface ApiConstructor {
  baseUrl: string;
  headers?: {};
  endpoints: EndpointDeclaration[]
}

const request = async ({ method, url, id, data, params, baseUrl, headers }: RequestData) => {
  return await axios({
    method,
    url: [baseUrl, url, id].join("/").replace(/\/$/, ""),
    data,
    headers: headers,
    params,
  }).catch((error) => error.response);
};

export class Api {
  [key: string]: (data: EndpointData) => Promise<AxiosResponse>;

  constructor({ baseUrl, endpoints }: ApiConstructor) {
    endpoints.map((ep: EndpointDeclaration) => {
      this[ep.name] = async ({ id, data, params, headers = {} }: EndpointData) => {
        return await request({ 
          method: ep.method,
          url: ep.url,
          id,
          data,
          params,
          baseUrl,
          headers
        })
      }
    })
  }
}
