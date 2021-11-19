import http from "../http-common";

class SportDataService {
  getAll() {
    return http.get("/sports");
  }

  get(id) {
    return http.get(`/sports/${id}`);
  }

  create(data) {
    return http.post("/sports", data);
  }

  update(id, data) {
    return http.put(`/sports/${id}`, data);
  }

  delete(id) {
    return http.delete(`/sports/${id}`);
  }

  findByTitle(title) {
    return http.get(`/sports?title=${title}`);
  }
}

export default new SportDataService();