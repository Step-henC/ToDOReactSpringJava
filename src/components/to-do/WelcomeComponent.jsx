import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'


class WelcomeComponent extends Component {
    constructor(props){
        super(props);
this.state ={
    welcomeMessage: ''
}

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccesfulResponse = this.handleSuccesfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);
    }
    retrieveWelcomeMessage(){   
       
        //HelloWorldService.executeHelloWorldService().then(response => this.handleSuccesfulResponse(response)) //must tell springboot to accept req from 4200 by @CrossOrigin()
        //HelloWorldService.executeHelloWorldServiceBean().then(response => this.handleSuccesfulResponse(response)); add.message in hadleSuc..function
        HelloWorldService.executeHelloWorldPathVariableService(this.props.params.name)
        .then(response => this.handleSuccesfulResponse(response))
        .catch(error => this.handleError(error));
    } //method is good for console printing. but now want to print springboot message to webpage UI


    handleSuccesfulResponse(response){
        this.setState({
            welcomeMessage: response.data.message // show message to ui
                                        // add .message to get value from "message" json object from the springboot stack
        })
    }
    handleError(error){
        this.setState({
            welcomeMessage: error.response.data.message // show message to ui //clearly message object in console
                                        // add .message to get value from "message" json object from the springboot stack
        })
        
    }
    render() {
        return (
            <>
                <h1>Welcome!</h1>
            <div className="container">
            Welcome {this.props.params.name}. Manage your todos <Link to='/todos' >here</Link> {/*link is better than a cuz a refreshes entire page */}
            </div>
            <div className="container">
            Click here to get a customized welcome message.
            <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}>Welcome</button>
            </div>
            <div className="container">
                {this.state.welcomeMessage}
            </div>
            
            </>
          
        )        
    }
 
}
export default WelcomeComponent;