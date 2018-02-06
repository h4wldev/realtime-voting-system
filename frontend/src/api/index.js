/**
 * @Project vote-frontend
 * @author  junho.kim
 *
 * Created by Junho Kim (junho.kim@loplat.com) on 2017. 12. 27..
 */

import axios from 'axios';
import Cookies from 'js-cookie';

import jwt_decode from 'jwt-decode';

import config from '@/config';


const API = axios.create({
    baseURL: config.api_server,
    headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
        'Content-type': 'application/json'
    }
});

API.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        API.deleteAccessToken();
        location.replace('/#/login');
    }
});

API.setAccessToken = (token) => {
    Cookies.set('vote-jwt-token', token, { expires: 30 });
    API.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
};

API.getAccessToken = () => {
    return Cookies.getJSON('vote-jwt-token');
};

API.deleteAccessToken = () => {
    Cookies.remove('vote-jwt-token');

    API.defaults.headers.common['Authorization'] = '';
};

API.initialize = () => {
    const token = API.getAccessToken();

    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
    }
};

API.user = () => {
    if (API.getAccessToken()) {
        return jwt_decode(API.getAccessToken()['access_token']);
    }

    return {};
};


API.initialize();
export default API;
