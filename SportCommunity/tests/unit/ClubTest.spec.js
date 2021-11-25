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
    it('Stores, finds and deletes a new club to the API', () => {
        // Trying to store a record in the database with our service.
        // Make a submitted variable to make sure it worked
        var submitted = false;
        ClubDataService.create(data)
            .then((response) => {
                data.id = response.data.id;
                submitted = true;
                expect(submitted).toMatch(true);
                        
                var clubData
                ClubDataService.get(data.id)
                    .then((response) => {
                        clubData = response.data;
                        
                        expect(clubData.name).toMatch(data.name)
                        expect(clubData.city).toMatch(data.city)
                        expect(clubData.streetName).toMatch(data.streetName)
                        expect(clubData.URL).toMatch(data.URL)

                        ClubDataService.delete(this.currentClub.id)
                            .then((response) => {
                                expect(response.message).toMatch("Registration was deleted successfully!")
                            })
                            .catch((e) => {
                                fail(e);
                            })
                    }).catch((e)=>{
                        fail(e);
                    })
            }).catch((e) =>{
                fail(e);
            })
        });
    })
    
