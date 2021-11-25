import "reflect-metadata";
import {container} from "tsyringe";
import {HttpClient} from "./src/HttpClient/HttpClient";

const urls = [
    "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json",
    "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json",
    "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json",
    "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/nope"
];

const client = container.resolve(HttpClient);

client.fetchUrls(urls)
    .then(console.log)
    .catch(console.log);
