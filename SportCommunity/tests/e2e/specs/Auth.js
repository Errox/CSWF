let email = "ryangroenewold@hotmail.com";
let password = "ryan@123A";

let TEST_email = "ryangroenewoldt@hotmail.com"
let TEST_name = "RyanT"
let TEST_surName = "GroenewoldT"
let TEST_password = "passwordT"
let TEST_dateOfBirth = "01-09-1998"

var idCreatedUser = "";

import UserDataService from "../../../src/services/UserDataService";

describe("Auth test suite", () => {
    it("Can login with given credentials", () => {
        cy.visit("/login");
        cy.get("[data-cy=email-input]")
            .type(email)
        cy.get("[data-cy=password-input]")
            .type(password)
            .type("{enter}");
        cy.contains("h3", email);
        cy.contains("h2", "Crud")
        cy.contains("button", "Alle sporten")
    });
    it("Can Logout when logged in", () => {
        cy.visit("/login");
        cy.get("[data-cy=email-input]")
            .type(email)
        cy.get("[data-cy=password-input]")
            .type(password)
            .type("{enter}");
        cy.contains("h3", email);
        cy.contains("h2", "Crud")
        cy.contains("button", "Alle sporten")
        cy.contains("button", "LogOut").click()
        cy.contains("h2", "Login")
        cy.contains("button", "Login")
    })
    it("Can't login with the wrong credentials", () => {
        cy.visit("/login");
        cy.get("[data-cy=email-input]")
            .type("Wrong")
        cy.get("[data-cy=password-input]")
            .type("wrong")
            .type("{enter}");
        cy.get('[data-cy="error-message-login"]').contains('"User Not found.');
    })
    // it.only("Register a new account", () => {
    //     cy.visit("/register");
    //     cy.get("[data-cy=name-input]")
    //         .type(TEST_name)
    //     cy.get("[data-cy=surname-input]")
    //         .type(TEST_surName)
    //     cy.get("[data-cy=email-input]")
    //         .type(TEST_email)
    //     cy.get("[data-cy=password-input]")
    //         .type(TEST_password)
    //     cy.get("#input-22")
    //         .type(TEST_dateOfBirth)  
    //         .type("{enter}")
    //     if(cy.get('[data-cy=notification-register]').contains(TEST_email)){
    //         cy.get('[data-cy=notification-register]').contains(TEST_email)
    //     }else{
    //         cy.get('[data-cy=notification-register]')
    //     }
    // })
    
    // after(done => {
    //     // Remove created user from DB.
    //     cy.visit("/login");
    //     cy.get("[data-cy=email-input]")
    //         .type("Wrong")
    //     cy.get("[data-cy=password-input]")
    //         .type("wrong")
    //         .type("{enter}");
    //     var idUser = cy.get('.row > :nth-child(1) > :nth-child(3)')
    //     // split idUser to the id. 
    //     console.log(idUser);
    //     idCreatedUser = idUser.split(" ");
    //     idCreatedUser = idCreatedUser[-1];

    //     UserDataService.delete(idCreatedUser)
    //         .then((response) => {
    //             console.log(response.data);
    //         })
    //     done()
    // })
})

