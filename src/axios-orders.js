import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://burgerbuildeer.firebaseio.com/'
});

export default instance;