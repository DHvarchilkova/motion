import axios from 'axios';

const instance = axios.create({
    baseURL: `https://motion.propulsion-home.ch/backend/api/`;
});

export default instance;
