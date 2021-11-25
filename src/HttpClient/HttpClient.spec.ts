import "reflect-metadata";
import {container} from "tsyringe";
import {HttpClient} from "./HttpClient";
import {AxiosProvider} from "../Axios/AxiosProvider";
import {AxiosProviderMock} from "../Axios/AxiosProviderMock";

container.register(AxiosProvider, {useClass: AxiosProviderMock});

describe("HttpClient", () => {

    describe("when asked to fetch from a list of URLs", () => {

        const httpClient = container.resolve(HttpClient);

        it("should return an array of url contents", () => {

            AxiosProviderMock.mockResponse = {
                status: 200,
                data: "I am a mock",
                config: {
                    url: "I am a mock URL"
                }
            };

            return httpClient.fetchUrls([
                "https://www.mock1.com",
                "https://www.mock2.com",
                "https://www.mock3.com"
            ]).then((results) => {

                expect(results.length).toBe(3);

                expect(results[0].status).toBe(200);
                expect(results[1].status).toBe(200);
                expect(results[2].status).toBe(200);

                expect(results[0].body).toBeDefined();
                expect(results[1].body).toBeDefined();
                expect(results[2].body).toBeDefined();

                expect(results[0].url).toBeDefined();
                expect(results[1].url).toBeDefined();
                expect(results[2].url).toBeDefined();

            });
        });

        it("should spot invalid URLs", () => {

            return expect(httpClient.fetchUrls(["I am an invalid URL"]))
                .rejects.toBeDefined();

        });

    });

});
