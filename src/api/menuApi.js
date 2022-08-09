
import axios from "axios";

const connect = {};
if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    connect.api = "http://localhost:8080/qr/admin/"
}else{
    connect.api = "https://www.facilbak.cl/admin/"
} 

const menuApi = axios.create({
    baseURL: connect.api
})

export default menuApi