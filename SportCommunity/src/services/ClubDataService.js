import http from "../http-common";
import authHeader from "./auth-header";


class ClubDataService {
	getAll() {
		return http.get("/clubs", {headers: authHeader()});
	}

	get(id) {
		return http.get(`/clubs/${id}`, {headers: authHeader()});
	}

	create(data) {
		return http.post("/clubs", data, {headers: authHeader()});
	}

	update(id, data) {
		return http.put(`/clubs/${id}`, data, {headers: authHeader()});
	}

	delete(id) {
		return http.delete(`/clubs/${id}`, {headers: authHeader()});
	}

	findByTitle(title) {
		return http.get(`/clubs?title=${title}`, {headers: authHeader()});
	}

	addSportToClub(data) {
		return http.post(`/clubs/sport/add/${data.clubId}`, data, {headers: authHeader()})
	}

	removeSportToClub(data) {
		console.log(authHeader());
		return http.delete(`/clubs/sport/remove/${data.clubId}`, {data: data, headers: authHeader()})
	}
}

export default new ClubDataService();
