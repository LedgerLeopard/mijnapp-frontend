import qs from 'qs';

class Http {
    baseUrl: string | undefined;
    unauthorized: any;
    errorMessage: any;

    static async parseResponse(response: Response, responseType: string) {
        switch (responseType) {
            case 'json':
                return response.json();
            case 'blob':
                return response.blob();
            default:
                return response;
        }
    }

    constructor(options: { baseUrl: string; }) {
        Object.assign(this, options);
    }

    async request(url: string, {
        headers = {},
        method = 'GET',
        isPublic = false,
        responseType = 'json',
        data
    }: any = {}) {
        const isForm = typeof FormData !== 'undefined' && data instanceof FormData;
        url = this.baseUrl + url;

        const opts: any = {method};
        if (method === 'GET') {
            if (data) {
                let query;
                [url, query] = url.split('?');
                url += '?' + qs.stringify({...qs.parse(query), ...data}, {indices: false});
            }
        } else if (isForm) {
            opts.body = data;
        } else {
            opts.body = JSON.stringify(data);
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...headers,
            };
        }

        if (!isPublic) headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');

        const response = await fetch(url, {...opts, headers});
        if (response.status === 401) setTimeout(() => this.unauthorized());
        if (!response.ok) {
            this.errorMessage(response);
            return Promise.reject(response);
        }

        try {
            return await Http.parseResponse(response, responseType);
        } catch (e) {
            this.errorMessage({status: 'badParsing'});
            return Promise.reject(null);
        }
    }

    get(url: string, opts: { isPublic: boolean, responseType: string }) {
        return this.request(url, {...opts, method: 'GET'});
    }

    post(url: string, opts: { isPublic: boolean, responseType: string, data: any }) {
        return this.request(url, {...opts, method: 'POST'});
    }

    put(url: string, opts: { isPublic: boolean, responseType: string, data: any }) {
        return this.request(url, {...opts, method: 'PUT'});
    }

    del(url: string, opts: { isPublic: boolean, responseType: string }) {
        return this.request(url, {...opts, method: 'DELETE'});
    }
}

export default new Http({
    baseUrl: 'https://develop.sim.api.ledgerleopard.com/api',
});
