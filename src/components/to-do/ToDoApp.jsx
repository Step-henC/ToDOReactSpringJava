
import React, {Component} from 'react'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import withNavigation from './WithNavigation.jsx'   
import withParams from './WithParams.jsx'

class TodoApp extends Component {
    render() {
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        return (
            <div className="TodoApp">
                <Router>
                   <HeaderComponent/> 
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={<WelcomeComponentWithParams/>}/>
                        <Route path="/todos" element={<ListToDoComponent/>}/>
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                   <FooterComponent/> 
                </Router>
            </div>
        )
    }
}
class HeaderComponent extends Component{
    render(){
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://stephencsharp.net" className="navbar-brand">S.Cshap</a></div>
                    <ul className="navbar-nav">
                        <li className="nav-link"><Link className="nav-link" to="/welcome">Home</Link></li>
                        <li className="nav-link"><Link className="nav-link" to="/todos">Todos</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                    <li className="nav-link">Login</li>
                    <li className="nav-link">Logout</li>
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component{
    render(){
        return(
            <div>
                Footer <hr/>
            </div>
        )
    }
}

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    loginClicked() {
        if(this.state.username==='in28minutes' && this.state.password==='dummy'){           
            this.props.navigate(`/welcome/${this.state.username}`)
        }
        else {
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }
        console.log(this.state)
    }

    render() {
        return (
            <div className="container">
                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                <div className="TodoApp">
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

function ErrorComponent() {
    return <div>An Error Occurred. I don't know what to do! Contact support.</div>
}

class WelcomeComponent extends Component {
    render() {
        return (
            <div>
                Welcome {this.props.params.name}. Manage your todos <Link to='/todos' >here</Link> {/*link is better than a cuz a refreshes entire page */}
                
            </div>
        )        
    }
}

class ListToDoComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            todos : [
                {id: 1, description: 'Learn React', done:false, targetDate: new Date()},
                {id: 2, description: 'Practice Piano', done:false, targetDate: new Date()},
                {id: 3, description: 'Grocery Shop', done:false, targetDate: new Date()},
                {id: 4, description: 'Read', done:false, targetDate: new Date()}

            ]
        }
    }
    
    render() {
        return (
            <div>
                <h1>List ToDos</h1>
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Done</th>
                        <th>Target Date</th>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                            
                            <tr>
                            <td>{todo.id}</td>
                            <td>{todo.description}</td>
                            <td>{todo.done.toString()}</td>
                            <td>{todo.targetDate.toString()}</td>    
                        </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )        
    }
}

export default TodoApp