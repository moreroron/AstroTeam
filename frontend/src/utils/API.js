import axios from 'axios';

export default {

    // general
    getTwitter: (source) => {
        return axios.get("/utils/twitter", { cancelToken: source.token });
    }
}