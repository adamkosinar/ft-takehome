import {injectable} from "tsyringe";
import axios from "axios";

@injectable()
export class AxiosProvider {

    public get() {

        return axios;
    }
}
