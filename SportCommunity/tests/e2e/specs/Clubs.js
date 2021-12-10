let TEST_email = "ryangroenewold1@hotmail.com"
let TEST_password = "ryan@123A"

let TEST_club_name = "Club de Test"
let TEST_city = "Papentest"
let TEST_streetName = "TestStraat 69"
let TEST_URL = "http://TestDeClub.nl"


describe("Club test suite", () => {
    it("Can create new club", () => {
        cy.visit("/login");
        cy.get("[data-cy=email-input]")
            .type(TEST_email)
        cy.get("[data-cy=password-input]")
            .type(TEST_password)
            .type("{enter}");

        cy.contains("h3", TEST_email);
        cy.contains("h2", "Crud")
        cy.contains("button", "Alle sporten")
        cy.contains("button", "Alle clubs").click()
        cy.contains("button", "Nieuwe club toevoegen").click()

        cy.get("[data-cy=nameClub-input]")
            .type(TEST_club_name)
        cy.get("[data-cy=city-input]")
            .type(TEST_city)
        cy.get("[data-cy=streetname-input]")
            .type(TEST_streetName)
        cy.get("[data-cy=URL-input]")
            .type(TEST_URL)
        cy.contains("button", "Submit").click()

        cy.get(".v-card__title").contains("Submitted successfully!")
    });

    it("Can visit the just created new Club", () => {
        cy.visit("/login");
        cy.get("[data-cy=email-input]")
            .type(TEST_email)
        cy.get("[data-cy=password-input]")
            .type(TEST_password)
            .type("{enter}");

        cy.contains("h3", TEST_email);
        cy.contains("h2", "Crud")
        cy.contains("button", "Alle sporten")
        cy.contains("button", "Alle clubs").click()
        cy.contains("button", "Nieuwe club toevoegen").click()
        cy.visit("/clubs")

        cy.wait(200);
        cy.get('tbody > :nth-child(2) ').each(($el,
            index, $list) => {
            // grabbing all text from second column
            const txt = $el.text();
            // checking the matching condition
            if (txt.includes(TEST_club_name)) {

                cy.get($el);
                // capturing the next sibling with the help of next() method
                cy.get(':nth-child(2) > :nth-child(5) > .v-icon')
                    .eq(index).click()
                cy.get('.headline').contains('Club ' + TEST_club_name)
            }
        })
    })
    it("Can update Club visiting", () => {
        cy.visit("/login");
        cy.get("[data-cy=email-input]")
            .type(TEST_email)
        cy.get("[data-cy=password-input]")
            .type(TEST_password)
            .type("{enter}");

        cy.contains("h3", TEST_email);
        cy.contains("h2", "Crud")
        cy.contains("button", "Alle sporten")
        cy.contains("button", "Alle clubs").click()
        cy.contains("button", "Nieuwe club toevoegen").click()
        cy.visit("/clubs")

        cy.wait(200);
        cy.get('tbody > :nth-child(2) ').each(($el,
            index, $list) => {
            // grabbing all text from second column
            const txt = $el.text();
            const list = $list;
            // checking the matching condition
            if (txt.includes(TEST_club_name)) {

                cy.get($el);
                // capturing the next sibling with the help of next() method
                cy.get(':nth-child(2) > :nth-child(5) > .v-icon')
                    .eq(index).click()
                cy.get('.headline').contains('Club ' + TEST_club_name)
                cy.get('.v-form > p').contains('This club is created by you!')

                cy.get("[data-cy=nameClub-input]")
                    .clear()
                    .type("Updated Name")
                cy.get("[data-cy=city-input]")
                    .clear()
                    .type("Updated city")
                cy.get("[data-cy=streetname-input]")
                    .clear()
                    .type("Updated Streetname")
                cy.get("[data-cy=URL-input]")
                    .clear()
                    .type("Updatedurl.nl")
                cy.contains("button", "Update").click()
                cy.get('.mt-3').contains('The club was updated successfully!')

            }
        })

    })

    it("Can delete Club", () => {
        cy.visit("/login");
        cy.get("[data-cy=email-input]")
            .type(TEST_email)
        cy.get("[data-cy=password-input]")
            .type(TEST_password)
            .type("{enter}");

        cy.contains("h3", TEST_email);
        cy.contains("h2", "Crud")
        cy.contains("button", "Alle sporten")
        cy.contains("button", "Alle clubs").click()
        cy.contains("button", "Nieuwe club toevoegen").click()
        cy.visit("/clubs")

        cy.wait(200);
        cy.get('tbody > :nth-child(2) ').each(($el,
            index, $list) => {
            // grabbing all text from second column
            const txt = $el.text();
            // checking the matching condition
            if (txt.includes("Updated Name")) {

                cy.get($el);
                // capturing the next sibling with the help of next() method
                cy.get(':nth-child(2) > :nth-child(5) > .v-icon')
                    .eq(index).click()
                cy.get('.headline').contains('Club ' + "Updated Name")
                cy.get('.v-form > p').contains('This club is created by you!')

                cy.contains("button", "Delete").click()

                cy.get('.v-card__title').contains("Clubs")

            }
        })

    })
})