export default function authHeader() {
	const user = JSON.parse(localStorage.getItem("user"));

	// Check if there is a user already in local storage.
	if (user && user.accessToken) {
		return {Authorization: "Bearer " + user.accessToken};
	} else { // Else return a empty objec.t
		return {};
	}
}
