import http from "../http-common";
import authHeader from "./auth-header";

class UserDataService {
	getAll() {
		return http.get("/users", {headers: authHeader()});
	}

	get(id) {
		return http.get(`/users/${id}`, {headers: authHeader()});
	}

	create(data) {
		return http.post("/users", data, {headers: authHeader()});
	}

	update(id, data) {
		return http.put(`/users/${id}`, data, {headers: authHeader()});
	}

	delete(id) {
	  return http.delete(`/users/${id}`);
	}

	findByTitle(title) {
		return http.get(`/users?title=${title}`, {headers: authHeader()});
	}

	getPublicContent() {
		return http.get("/users/all");
	}

	getUserBoard() {
		return http.get("/users", {headers: authHeader()});
	}
}

export default new UserDataService();
