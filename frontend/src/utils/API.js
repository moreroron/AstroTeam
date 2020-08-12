import axios from 'axios';

export default {

    // general
    getTwitter: () => {
        return axios.get("/utils/twitter", { cancelToken: source.token });
    }
}