import http from "../http-common";

class RegistrationDataService {
  getAll() {
    return http.get("/registrations");
  }

  get(id) {
    return http.get(`/registrations/${id}`);
  }

  create(data) {
    return http.post("/registrations", data);
  }

  update(id, data) {
    return http.put(`/registrations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/registrations/${id}`);
  }

  findByTitle(title) {
    return http.get(`/registrations?title=${title}`);
  }
}

export default new RegistrationDataService();