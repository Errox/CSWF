const express = require("express");
const request = require("supertest");
const db = require("../app/models");
const app = express();

//Setup the API to use parse JSON.
app.use(express.json());

// Connect with the mongoDB
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


require("../app/routes/user.routes")(app);


var testUser = {
    name: "test",
    surName: "user",
    email: "testuser@test.nl",
    password: "testPassword123",
    dateOfBirth: "1998-12-02T15:37:41.840+00:00"
}


beforeAll(async () => {
    // before we do something, we must create a user to get a token we can always user in our test cases. 
    var testUserJson = JSON.stringify(testUser);
    const response = await request(app)
        .post("/api/users/signup")
        .set("accept", "application/json")
        .send({
            name: testUser.name,
            surName: testUser.surName,
            email: testUser.email,
            password: testUser.password,
            dateOfBirth: testUser.dateOfBirth
        })
    if (response.body.message.includes("user was registered successfully") || response.body.message.includes("is already registered. Please use another one.")) {
        // This means the user is already created or succesfully created. now login
        const responsetoken = await request(app)
            .post('/api/users/signin')
            .send({
                email: testUser.email,
                password: testUser.password
            })
        expect(responsetoken.body.accessToken === null || typeof responsetoken.body.accessToken === 'string').toBeTruthy();
        expect(responsetoken.body.id === null || typeof responsetoken.body.id === 'string').toBeTruthy();
        testUser.accessToken = responsetoken.body.accessToken;
        testUser.id = responsetoken.body.id   
    }
})



describe("Testing-server-auth-routes", () => {
    it("GET /AuthCheck - fail | No jwt token", async () => {
        const {
            body
        } = await request(app).get("/api/users/AuthCheck");
        expect(body.message).toEqual("No token provided!");
    })

    it("GET /AuthCheck - fail | Wrong JWT token provided", async () => {
        const {
            body
        } = await request(app)
            .get("/api/users/AuthCheck")
            .auth("Wrong", {type : 'bearer'});

        expect(body.message).toEqual("Unauthorized!");
    })

    it("GET /AuthCheck - succes | JWT token provided", async () => {
        const {
            body
        } = await request(app)
            .get("/api/users/AuthCheck")
            .auth(testUser.accessToken, {type : 'bearer'});

        expect(body.message).toEqual("Auhtorized content");
        expect(body.id).toEqual(testUser.id)
    })


})


afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    db.mongoose.connection.close()
    done()
  })