import http from "../http-common";

class FanProductDataService {
  getAll() {
    return http.get("/fanProducts");
  }

  get(id) {
    return http.get(`/fanProducts/${id}`);
  }

  create(data) {
    return http.post("/fanProducts", data);
  }

  update(id, data) {
    return http.put(`/fanProducts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/fanProducts/${id}`);
  }

  findByTitle(title) {
    return http.get(`/fanProducts?title=${title}`);
  }
}

export default new FanProductDataService();