let connect = '';
if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    connect = "http://localhost:8080/qr/admin/"
}else{
    connect = "https://www.facilbak.cl/admin/"
} 

const URLBACK = connect;
    
export default {
    URLBACK
}