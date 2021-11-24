import http from "../http-common";

class ClubDataService {
  getAll() {
    return http.get("/clubs");
  }

  get(id) {
    return http.get(`/clubs/${id}`);
  }

  create(data) {
    return http.post("/clubs", data);
  }

  update(id, data) {
    return http.put(`/clubs/${id}`, data);
  }

  delete(id) {
    return http.delete(`/clubs/${id}`);
  }

  findByTitle(title) {
    return http.get(`/clubs?title=${title}`);
  }
}

export default new ClubDataService();