import React, { Component } from 'react';
import logo from './logo.svg';

import './bootstrap.css';
import FirstComponent from './components/learning-examples/FirstComponent.jsx';
import SecondComponent from './components/learning-examples/SecondComponent.jsx';
import ThirdComponent from './components/learning-examples/ThirdComponent.jsx';
import CounterButton from './components/Counter/Counter.jsx';
import Counter from './components/Counter/Counter';

import ToDoApp from './components/to-do/ToDoApp';

class App extends Component {
    render() {
        return (
            <div className="App">
                     {/*<Counter/>*/}
                     <ToDoApp/>
            </div>
           
                
                    
         
        );
    }
}
class LearningComponent extends Component{

    render() {
        return (
            <div className="LearningComponent">
                Hello World
                
                    
            </div>
        );
    }
}




export default App;