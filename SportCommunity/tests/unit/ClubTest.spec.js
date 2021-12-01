// import { shallowMount } from '@vue/test-utils'
// import SportList from '@/components/Sport/SportList.vue'
import ClubDataService from "../../src/services/ClubDataService";
var data = {
    name: "TestClub",
    city: "Test stad",
    streetName: "Teststraat 40",
    URL: "https://testclub.dev"
};

describe('Club crud', () => {
    it('Stores, finds updates and deletes a new club to the API', () => {
        // Trying to store a record in the database with our service.
        // Make a submitted variable to make sure it worked
        var submitted = false;
        // Create a new club
        ClubDataService.create(data)
            .then((response) => {
                data.id = response.data.id;
                submitted = true;
                expect(submitted).toMatch(true);
                        
                var clubData
                // Get the newly made club

                ClubDataService.get(data.id)
                    .then((response) => {
                        clubData = response.data;
                        
                        expect(clubData.name).toMatch(data.name)
                        expect(clubData.city).toMatch(data.city)
                        expect(clubData.streetName).toMatch(data.streetName)
                        expect(clubData.URL).toMatch(data.URL)
                        
                        // Update the club
                        clubData.name = "updatedClubName"
                        clubData.city = "newCityName"
                        clubData.streetName = "newStreetName"
                        clubData.URL = "NewUrl.nl"
                        ClubDataService.update(this.currentRegistration.id, this.currentRegistration)
                            .then((response) => {
                                expect(response.message).toMatch("Club was updated successfully")
                                
                                // Check if the data got updated
                                ClubDataService.get(data.id)
                                .then((response) => {
                                    clubData = response.data;
                                    
                                    expect(clubData.name).toMatch(data.name)
                                    expect(clubData.city).toMatch(data.city)
                                    expect(clubData.streetName).toMatch(data.streetName)
                                    expect(clubData.URL).toMatch(data.URL)

                                    // Delete the club
                                    ClubDataService.delete(this.currentClub.id)
                                    .then((response) => {
                                        expect(response.message).toMatch("Registration was deleted successfully!")
                                    })
                                    .catch((e) => {
                                        fail(e);
                                    })
                                }).catch((e) => {
                                    fail(e)
                                })
                            })
                            .catch((e) => {
                                fail(e)
                            });
                    }).catch((e)=>{
                        fail(e);
                    })
            }).catch((e) =>{
                fail(e);
            })
        });
    })
    
