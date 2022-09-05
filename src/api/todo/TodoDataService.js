import axios from 'axios'

class TodoDataService{
    retrieveAllTodos(username){

        return axios.get(`http://localhost:8080/users/${username}/todos`); //got url from browser when running springboot app on the get path
    }

    deleteTodo(username, id){

        return axios.delete(`http://localhost:8080/users/${username}/todos/${id}`); //now must create method in app
    }
}
export default new TodoDataService();