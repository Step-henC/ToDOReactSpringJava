import axios from "axios";
//import via cmd npm install axios
class HelloWorldService{

    executeHelloWorldService(){
        return axios.get("http://localhost:8080/hello-world"); //retrieves a promise back. must define what to do once response received
    }

    executeHelloWorldServiceBean(){
        return axios.get("http://localhost:8080/hello-world-bean"); //this promise returns in json. gets object from springboot. have to specify the name of the key to get the value from JSON format
    }
    executeHelloWorldPathVariableService(name){
        return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`); //must use tick notations to get name value replaced
    }

}

export default new HelloWorldService();