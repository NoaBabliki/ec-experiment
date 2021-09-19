import axios from 'axios';
import {SERVER_PATH} from './APIConstants'

export type ApiClient = {
    getProperties: (client_categories: object[][]) => Promise<object[][]>;
}
/*
export type ApiClientFlow = {
    getProperties: (to_change:boolean, flow?:number) => Promise<number>;
}
*/

/** get tickets with search and page queries */
export const createApiClient = (): ApiClient => {
    return {
        getProperties: async (client_categories: object[][]) => {
            const res = await axios.get(SERVER_PATH, { params: { client_categories: client_categories } });
            return res.data;
        }
    }
}
/*
export const createApiClientFlow = (): ApiClientFlow => {
    return {
        getProperties: async (to_change:boolean, flow?:number) => {
            const res = await axios.get(SERVER_PATH_FLOW, { params: { flow: flow, to_change: to_change } });
            return res.data;
        }
    }
}
*/

export default createApiClient

