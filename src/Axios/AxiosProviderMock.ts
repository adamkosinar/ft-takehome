import {AxiosProvider} from "./AxiosProvider";
import {singleton} from "tsyringe";

@singleton()
export class AxiosProviderMock extends AxiosProvider {

    public static mockResponse;

    public get(): any {

        return {
            get: () => {

                return Promise.resolve(AxiosProviderMock.mockResponse);
            },

            interceptors: {
                response: {
                    use: (onSuccess: Function, onReject: Function) => {
                        onSuccess(AxiosProviderMock.mockResponse);
                        onReject({
                            response: AxiosProviderMock.mockResponse
                        });
                    }
                }
            }
        };

    }
}
