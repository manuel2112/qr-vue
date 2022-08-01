
import axios from "axios";

const menuApi = axios.create({
    baseURL: 'http://localhost:8080/qr/admin'
})

export default menuApi