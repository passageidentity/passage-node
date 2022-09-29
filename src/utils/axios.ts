import axios from "axios";

const instance = axios.create({
    headers: { "X-Custom-Header": "foobar" },
});

export default instance;
