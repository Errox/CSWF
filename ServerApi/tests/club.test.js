const express = require("express");
const request = require("supertest");
const db = require("../app/models");
const app = express();

app.use(express.json());
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

require("../app/routes/sport.routes")(app);
require("../app/routes/club.routes")(app);
require("../app/routes/registration.routes")(app);
require("../app/routes/fanProduct.routes")(app);
require("../app/routes/user.routes")(app);


var testUser = {
  name: "test",
  surName: "user",
  email: "testUser@test.nl",
  password: "testPassword123",
  dateOfBirth: "1998-12-02T15:37:41.840+00:00"
}

var testClub = {
  name: "TestClub",
  city: "Test stad",
  streetName: "Teststraat 40",
  URL: "https://testclub.dev",
};

var TestClubIDs = []


beforeAll(async () => {
  // before we do something, we must create a user to get a token we can always user in our test cases. 
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


    //Create a new club so we can use it later.
    const responseClub = await request(app)
      .post('/api/clubs')
      .send({
        name: testClub.name,
        city: testClub.city,
        streetName: testClub.streetName,
        URL: testClub.URL
      })
      .auth(testUser.accessToken, {
        type: 'bearer'
      })

    expect(typeof responseClub.body.id == 'string').toBeTruthy();
    expect(typeof responseClub.body.createdByName == 'string').toBeTruthy();
    expect(typeof responseClub.body.createdById == 'string').toBeTruthy();
    testClub.id = responseClub.body.id;
    testClub.createdByName = responseClub.body.createdByName;
    testClub.createdByid = responseClub.body.createdByid;
  };
})


describe("Testing-server-club-routes", () => {
  it("Post /api/club - fail | Create new club | No token provided", async () => {
    const {
      body
    } = await request(app)
      .get("/api/clubs");
    expect(body.message).toEqual("No token provided!");
  })

  it("Post /api/club - fail | Create new club | Wrong token provided", async () => {
    const {
      body
    } = await request(app)
      .get("/api/clubs")
      .auth("Wrong", {
        type: 'bearer'
      });

    expect(body.message).toEqual("Unauthorized!");
  })

  it("Post /api/club - success | Create new club", async () => {
    const tempClub = new db.clubs({
      name: "temp",
      city: "ClubTemp",
      streetName: "Clubstreet",
      URL: "https://testclub.nl"
    });
    const clubData1 = await request(app)
      .post("/api/clubs")
      .set("accept", "application/json")
      .send({
        name: tempClub.name,
        city: tempClub.city,
        streetName: tempClub.streetName,
        URL: tempClub.URL
      })
      .auth(testUser.accessToken, {
        type: 'bearer'
      });

    // Full Club returned
    expect(clubData1.body.name).toMatch(tempClub.name)
    expect(clubData1.body.city).toMatch(tempClub.city)
    expect(clubData1.body.streetName).toMatch(tempClub.streetName)
    expect(clubData1.body.URL).toMatch(tempClub.URL)
    expect(clubData1.body.createdById).toMatch(testUser.id)
    expect(clubData1.body.createdByName).toMatch(testUser.name + " " + testUser.surName)
  })

  it("Post /api/club - fail | Create new club | Missing parameters with the club", async () => {
    const tempClub = new db.clubs({
      name: "temp",
      city: "ClubTemp",
      streetName: "Clubstreet",
      URL: "https://testclub.nl"
    });
    const clubData1 = await request(app)
      .post("/api/clubs")
      .set("accept", "application/json")
      .send({
        name: tempClub.name,
        URL: tempClub.URL
      })
      .auth(testUser.accessToken, {
        type: 'bearer'
      });

    // Full Club returned
    expect(clubData1.body.message).toMatch("Content can not be empty!")
  })

  it("Get /api/club/id - success | Fetch specific club | Right Id", async () => {
    const clubDataFetch = await request(app)
      .get('/api/clubs/' + testClub.id)
      .set("accept", "application/json")
      .auth(testUser.accessToken, {
        type: "bearer"
      });

    expect(clubDataFetch.body.id).toMatch(testClub.id);
    expect(clubDataFetch.body.name).toMatch(testClub.name);
    expect(clubDataFetch.body.city).toMatch(testClub.city);
    expect(clubDataFetch.body.URL).toMatch(testClub.URL);
    expect(clubDataFetch.body.streetName).toMatch(testClub.streetName);
    expect(clubDataFetch.body.createdById).toMatch(testUser.id);
    expect(clubDataFetch.body.createdByName).toMatch(testUser.name + " " + testUser.surName);
  })

  it("Post /api/club/id - fail | fetches specific club | Wrong ID", async () => {
    const clubDataFetchWrong = await request(app)
      .get('/api/clubs/' + testUser.id)
      .set("accept", "application/json")
      .auth(testUser.accessToken, {
        type: "bearer"
      });

    expect(clubDataFetchWrong.body.message.includes("Error retrieving Club with") || clubDataFetchWrong.body.message.includes("Not found Club with id")).toBeTruthy();
  })

  it("put /api/club/id - success | update club | Right update data", async () => {
    testClub.name = "updatedClubName"
    testClub.city = "newCityName"
    testClub.streetName = "newStreetName"
    testClub.URL = "NewUrl.nl"


    const updateClubData = await request(app)
      .put('/api/clubs/' + testClub.id)
      .set("accept", "application/json")
      .send(testClub)
      .auth(testUser.accessToken, {
        type: "bearer"
      })

    expect(updateClubData.body.message).toMatch("Club was updated successfully")

    const clubDataFetch = await request(app)
      .get('/api/clubs/' + testClub.id)
      .set("accept", "application/json")
      .auth(testUser.accessToken, {
        type: "bearer"
      });

    expect(clubDataFetch.body.id).toMatch(testClub.id);
    expect(clubDataFetch.body.name).toMatch(testClub.name);
    expect(clubDataFetch.body.city).toMatch(testClub.city);
    expect(clubDataFetch.body.URL).toMatch(testClub.URL);
    expect(clubDataFetch.body.streetName).toMatch(testClub.streetName);
    expect(clubDataFetch.body.createdById).toMatch(testUser.id);
    expect(clubDataFetch.body.createdByName).toMatch(testUser.name + " " + testUser.surName);
  })

  it("put /api/club/id - fail | update club | Wrong update data", async () => {
    testClub.name = 14123412
    testClub.city = true
    testClub.streetName = "newStreetName"
    testClub.URL = "NewUrl.nl"

    const updateClubData = await request(app)
      .put('/api/clubs/' + "Wrong ID")
      .set("accept", "application/json")
      .send(testClub)
      .auth(testUser.accessToken, {
        type: "bearer"
      })

    expect(updateClubData.body.message.includes("Cannot update Club with") || updateClubData.body.message.includes("Error updating Club with id")).toBeTruthy();
  })

  it("Del /api/club/id - succes | Delete club | Delete club with right ID", async () => {
    const deleteClubData = await request(app)
      .delete('/api/clubs/' + testClub.id)
      .set("accept", "application/json")
      .auth(testUser.accessToken, {
        type: "bearer"
      })

      expect(deleteClubData.body.message).toMatch("Club was deleted successfully!")
  })

  it("Del /api/club/id - fail | Delete club | Delete club with wrong ID", async () => {
    const deleteClubData = await request(app)
      .delete('/api/clubs/' + "Wrong ID")
      .set("accept", "application/json")
      .auth(testUser.accessToken, {
        type: "bearer"
      })

      expect(deleteClubData.body.message.includes("Could not delete Club with id=") || deleteClubData.body.message.includes("Cannot delete Club with id")).toBeTruthy();
  })
})