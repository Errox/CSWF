import http from "../http-common";
import authHeader from "./auth-header";


class FanProductDataService {
	getAll() {
		return http.get("/fanProducts", {headers: authHeader()});
	}

	get(id) {
		return http.get(`/fanProducts/${id}`, {headers: authHeader()});
	}

	create(data) {
		return http.post("/fanProducts", data, {headers: authHeader()});
	}

	update(id, data) {
		return http.put(`/fanProducts/${id}`, data, {headers: authHeader()});
	}

	delete(id, data) {
		console.log(authHeader())
		return http.delete(`/fanProducts/${id}`, {data: data, headers: authHeader()});
	}

	findByTitle(title) {
		return http.get(`/fanProducts?title=${title}`, {headers: authHeader()});
	}
}

export default new FanProductDataService();
