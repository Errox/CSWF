import http from "../http-common";
import authHeader from "./auth-header";

class SportDataService {
  getAll() {
    return http.get("/sports",  { headers: authHeader() });
  }

  get(id) {
    return http.get(`/sports/${id}`,  { headers: authHeader() });
  }

  create(data) {
    return http.post("/sports", data,  { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/sports/${id}`, data,  { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/sports/${id}`,  { headers: authHeader() });
  }

  findByTitle(title) {
    return http.get(`/sports?title=${title}`,  { headers: authHeader() });
  }
}

export default new SportDataService();