import axios from "axios";

let URL;
switch (process.env.REACT_APP_ENVIRONMENT) {
    case "DEVELOPMENT":
        URL = "https://moon-tech-server-amber.vercel.app/";
        break
    case "PRODUCTION":
        URL = "https://moon-tech-server-amber.vercel.app/"
        break
    default:
        URL = "http://localhost:5000/";
}
const instance = axios.create({
    baseURL: URL
})

export default instance;
