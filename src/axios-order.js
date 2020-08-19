import Axios from 'axios';
const instance = Axios.create({
    baseURL: 'https://burger-p21.firebaseio.com/',
});

export default instance;
