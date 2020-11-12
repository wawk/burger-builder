import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-my-burger-64ff0.firebaseio.com/'

});

export default axiosInstance;