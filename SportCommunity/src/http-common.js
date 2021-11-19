import axios from "axios";

export default axios.create({
  baseURL: "https://apicswf.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});