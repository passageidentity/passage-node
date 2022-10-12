import axios from "axios";
import config from "./config.json";

const instance = axios.create({
    headers: { "Passage-Version": config.version },
});

export default instance;
