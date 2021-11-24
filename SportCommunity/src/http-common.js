import axios from "axios";

export default axios.create({
  baseURL: "https://apicswf.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});