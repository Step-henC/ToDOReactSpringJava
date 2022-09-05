class AuthenticationService{

    registerSuccesfulLogin(username, password){
        sessionStorage.setItem('authenticatedUser', username);
    }

    logout(){

        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser');
        if(user==null){return false;}
        return true;
    }

    getUserName(){ //created to use the username to retrieve all todos in componentdidmountMethod for tododataservice method
        let user = sessionStorage.getItem('authenticatedUser');
        if(user==null){return '';}
        return user;
    }

}

export default new AuthenticationService();