
import React, {Component} from 'react'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import withNavigation from './WithNavigation.jsx'   
import withParams from './WithParams.jsx'
import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import HelloWorldService from '../../api/todo/HelloWorldService.js'
import TodoDataService from '../../api/todo/TodoDataService.js'
import WelcomeComponent from './WelcomeComponent.jsx'
import LoginComponent from './LoginComponent.jsx'

class TodoApp extends Component {
    render() {
        const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent));
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const ListTodosComponentWithNavigation = withNavigation(ListToDoComponent);
        
        return (
            <div className="TodoApp">
                <Router>
                   <HeaderComponentWithNavigation/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeComponentWithParams/></AuthenticatedRoute>}/>
                        <Route path="/todos" element={<AuthenticatedRoute><ListToDoComponent/></AuthenticatedRoute>}/>
                        <Route path="/todos" element={<AuthenticatedRoute><ListTodosComponentWithNavigation/></AuthenticatedRoute>}/>
                        <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent/></AuthenticatedRoute>}/>
                        <Route path="*" element={<ErrorComponent />} />
                        <Route path="/todos/:id" element={ <AuthenticatedRoute><TodoComponentWithParamsAndNavigation /></AuthenticatedRoute>} />
                    
                    </Routes>
                   <FooterComponent/> 
                </Router>
            </div>
        )
    }
}
class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://stephencsharp.net" className="navbar-brand" target="_blank" >S.Cshap</a></div>
                    <ul className="navbar-nav">
                    <li className="nav-link"><Link className="nav-link" to="/">Home</Link></li>
                    
                       { isUserLoggedIn && <li className="nav-link"><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                  {  !isUserLoggedIn && <li className="nav-link"><Link className="nav-link" to="/login">Login</Link></li>}
                  {  isUserLoggedIn && <li className="nav-link"><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component{
    render(){
        return(
            <footer className="footer">
                <span className="text-muted">All rights reserved @2022</span>
            </footer>
        )
    }
}


class LogoutComponent extends Component{
    render(){
        return(
            <div>
                <h1>You have sucessfully logged out.</h1>
                <div className="container">Thank you for using our application!</div>
            </div>
        )
    }
}

function ErrorComponent() {
    return <div>An Error Occurred. I don't know what to do! Contact support.</div>
}



class ListToDoComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            todos : 
            [
            //     {id: 1, description: 'Learn React', done:false, targetDate: new Date()},
            //     {id: 2, description: 'Practice Piano', done:false, targetDate: new Date()},
            //     {id: 3, description: 'Grocery Shop', done:false, targetDate: new Date()},
            //     {id: 4, description: 'Read', done:false, targetDate: new Date()}

                    //leave list empty. do not want to mount api call in contructor or state will not be initialize until api call is finished

             ],
             message: null //added to handle what to do after clicking delete
        }
        this.deleteTodClicker = this.deleteTodClicker.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
    }
    componentDidMount(){
       this.refreshTodos();
    }

    refreshTodos(){ //created so list is refreshed after todo is deleted. same logic as componentDidMount so putting in here instead
        let username = AuthenticationService.getUserName();
        TodoDataService.retrieveAllTodos(username).then(response=> this.setState({todos: response.data}));
    }

    deleteTodoClicker(id){
            let username = AuthenticationService.getUserName();
            TodoDataService.deleteTodo(username, id).then(reponse => {
                this.setState({message:`Deletion of todo item ${id} successful`});

                            this.refreshTodos()});
    }
 

    addTodoClicked() {
        this.props.navigate(`/todos/-1`)//REACT-6
        //this.props.history.push(`/todos/-1`)
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        
        this.props.navigate(`/todos/${id}`)//REACT-6
        //this.props.history.push(`/todos/${id}`)
        
        // /todos/${id}
        // let username = AuthenticationService.getLoggedInUserName()
        // //console.log(id + " " + username);
        // TodoDataService.deleteTodo(username, id)
        //  .then (
        //      response => {
        //         this.setState({message : `Delete of todo ${id} Successful`})
        //         this.refreshTodos()
        //      }
        //  )

    }

    render() {
        return (
            
            <div>
                <h1>List ToDos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>} 
                <div className="container">
                <table className="table">
                    <thead>
                        <tr>
            
                        <th>Description</th>
                        <th>Done</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                            
                        <tr key={todo.id}>
                          
                            <td>{todo.description}</td>
                            <td>{todo.done.toString()}</td>
                            <td>{todo.targetDate.toString()}</td>
                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>   
                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicker(todo.id)}>Delete</button></td> 
                        </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )        
    }

}

export default TodoApp