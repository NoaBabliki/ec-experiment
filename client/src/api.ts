import axios from 'axios';
import {SERVER_PATH} from './APIConstants'

export type ApiClient = {
    getProperties: (client_categories: object[][]) => Promise<object[][]>;
}

/** get tickets with search and page queries */
export const createApiClient = (): ApiClient => {
    return {
        getProperties: async (client_categories: object[][]) => {
            const res = await axios.get(SERVER_PATH, { params: { client_categories: client_categories } });
            return res.data;
        }
    }
}

export default createApiClient

