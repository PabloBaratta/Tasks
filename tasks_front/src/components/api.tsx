import axios from 'axios';
import {useNavigate} from "react-router-dom";

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export default api;