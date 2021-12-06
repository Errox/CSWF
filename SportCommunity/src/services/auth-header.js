export default function authHeader(){
    console.log('auth-header yeet');
    let user = JSON.parse(localStorage.getItem('user'));

    // Check if there is a user already in local storage.
    if(user && user.accessToken){
        console.log('tokeeeen')
        return { Authorization: "Bearer " + user.accessToken};
    }else{ // Else return a empty objec.t 
        console.log("no tokeeen")
        return {};
    }
}