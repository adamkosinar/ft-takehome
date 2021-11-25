import {AxiosProvider} from "../Axios/AxiosProvider";
import {injectable} from "tsyringe";
import {AxiosResponse} from "axios";
import {URL} from "url";
import {ResponseEnvelope} from "./ResponseEnvelope";

@injectable()
export class HttpClient {

    private axios;

    constructor(axiosProvider: AxiosProvider) {

        this.axios = axiosProvider.get();

        // we are intercepting non 20x responses and resolving them so they can appear
        // among the list of successful responses, so we can avoid all or none situation
        // in case one or more of the requests fail
        this.axios.interceptors.response.use((response) => {
            return response;
        }, (reason) => {
            return Promise.resolve(reason.response);
        });
    }

    public fetchUrls(urls: Array<string>): Promise<ResponseEnvelope[]> {

        return Promise.all(urls.map((url) => {

            return this.fetchUrl(url)
                .then(this.parseResponse);

        }));

    }

    private fetchUrl(url: string): Promise<AxiosResponse> {

        if (this.isURL(url)) {
            return this.axios.get(url);
        }

        return Promise.reject("Invalid URL: " + url);
    }

    private parseResponse(response): ResponseEnvelope {

        return {
            status: response.status,
            url: response.config.url,
            body: response.data
        };

    }

    private isURL(url: string): boolean {

        try {

            new URL(url);
            return true;

        } catch {

            return false;
        }

    }
}
