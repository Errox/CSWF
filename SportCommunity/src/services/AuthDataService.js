import http from "../http-common";

class AuthDataService {
	signIn(user) {
		console.log("authdataservice");
		return http.post("/users/signin",
			{
				email: user.email,
				password: user.password,
			})
			.then((response) =>{
				if (response.data.accessToken) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}

				return response.data;
			});
	}

	signOut() {
		console.log("authdataservice");
		localStorage.removeItem("user");
	}

	register(user) {
		console.log("authdataservice");
		return http.post("/users/signup", {
			name: user.name,
			surName: user.surName,
			email: user.email,
			password: user.password,
			dateOfBirth: user.dateOfBirth,
		});
	}
}

export default new AuthDataService();
