// https://docs.cypress.io/api/introduction/api.html

describe("Static page Test", () => {
	it("Visits the app root url", () => {
		cy.visit("/");
		cy.contains("h2", "Sport Community");
		cy.contains("p", " Sport Community is een platform om gemakkelijk clubs en sporten op te zoeken! Sport Community is gemaakt om iedereen op te hoogte te brengen wat er mogelijk is en waar. Hierbij kan je gemakkelijk inzicht krijgen welke clubs er zijn en waar je contact mee kan openemen als je geinttereseerd ben in de sport. Op dit platform kan je verschillende dingen doen. ")
		cy.contains("button", "Sign Up")
		cy.contains("button", "Login")
		cy.contains("button", "SportCommunity")
		cy.contains("button", "Alle clubs")
		cy.contains("button", "About")
	});
	it("Visits the about page", () => {
		cy.visit("/about")
		cy.contains("h2", "Sport Community");
		cy.contains("p", " Sport Community is een platform om gemakkelijk clubs en sporten op te zoeken! Sport Community is gemaakt om iedereen op te hoogte te brengen wat er mogelijk is en waar. Hierbij kan je gemakkelijk inzicht krijgen welke clubs er zijn en waar je contact mee kan openemen als je geinttereseerd ben in de sport. Op dit platform kan je verschillende dingen doen. ")
		cy.contains("button", "Sign Up")
		cy.contains("button", "Login")
		cy.contains("button", "SportCommunity")
		cy.contains("button", "Alle clubs")
		cy.contains("button", "About")
		cy.contains("h2", "Entiteiten");
		cy.contains("p", "De volgende entiteiten worden gebruikt binnen deze applicatie om het mogelijk te maken")
		cy.get('div[class="col-lg-8"]').find("img").should('be.visible');
	})
	it("Visits the login page when pressed the login button", () => {
		cy.visit("/")
		cy.contains('Login').click()
		cy.contains("h2", "Login")
		cy.contains("button", "Login")
		cy.contains("button", "Registreer")
	})
	it("Visits the register page when pressed the register button after going through the login screen", () => {
		cy.visit("/")
		cy.contains('Login').click()
		cy.contains("h2", "Login")
		cy.contains("button", "Login")
		cy.contains("button", "Registreer").click()
		cy.contains('h2', "Registreer je account!")
		cy.contains("button", 'Register')
	})
});
