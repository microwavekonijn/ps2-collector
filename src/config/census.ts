import { get } from './utils/env';

export default class Census {
    /**
     * @type {string} Service id used when connecting to the census api
     */
    public readonly serviceID: string = get('CENSUS_SERVICE_ID');
}

