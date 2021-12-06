import http from "../http-common";
import authHeader from "./auth-header";


class RegistrationDataService {
	getAll() {
		return http.get("/registrations", {headers: authHeader()});
	}

	get(id) {
		return http.get(`/registrations/${id}`, {headers: authHeader()});
	}

	create(data) {
		return http.post("/registrations", data, {headers: authHeader()});
	}

	update(id, data) {
		return http.put(`/registrations/${id}`, data, {headers: authHeader()});
	}

	delete(id) {
		return http.delete(`/registrations/${id}`, {headers: authHeader()});
	}

	findByTitle(title) {
		return http.get(`/registrations?title=${title}`, {headers: authHeader()});
	}
}

export default new RegistrationDataService();
