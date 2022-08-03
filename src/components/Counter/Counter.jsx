import React, {Component} from 'react';
import './Counter.css'
import PropTypes  from 'prop-types';


//change counter from function to class component to provide 'state' to the value being counted
//take increment method and put inside of the counter class
//must use 'this' keyword when calling method locally in the button tag 



class Counter extends Component{
   //define initial state in constructor
    // state => counter=0;
    constructor(){
        super(); //must call super to use 'this' key word in constructor
        this.state = {
            counter:0
        }
            this.increment = this.increment.bind(this); //must bind increment to class in the constructor
            this.decrement = this.decrement.bind(this);
            
    
    }
    
    render() {
        return (
            <div className="Counter">
             
                <CounterButton by={1} incrementMethod={this.increment}  decrementMethod={this.decrement}/>
                <CounterButton by={5} incrementMethod={this.increment}  decrementMethod={this.decrement}/>
                <CounterButton by={10} incrementMethod={this.increment}  decrementMethod={this.decrement}/>
                <span className="count">{this.state.counter}</span>
                <div className="reset">
                    <button style={{backgroundColor:"red"}} onClick={this.reset}>Reset</button>
                    </div>
            </div>
        );
    }
    increment(by){ //update the state of the component counter++;

        //console.log('increment');
        //this.state.counter++  //cannot mutate state directly must use set state

        this.setState( //use prevstate arrow function instead of this.state.counter for readability
         {
            counter : this.state.counter + by  //creating state object
            });
    
    }
    decrement(by){
        this.setState({
            counter: this.state.counter - by
        });
    }
    reset = () =>{
        this.setState({
            counter: 0
        });


    }
}
class CounterButton extends Component{

    //define initial state in constructor
    // state => counter=0;
    constructor(){
        super(); //must call super to use 'this' key word in constructor
        this.state = {
            counter:0
        }
            this.increment = this.increment.bind(this); //must bind increment to class in the constructor
            this.decrement = this.decrement.bind(this);
    }
        //arrow function removes need for binding in line 17 render = () =>
    render() {

        return(//by keyword in props defined in app file
            <div className="CounterButton">            
                <button onClick={this.increment}>+{this.props.by}</button> 
                <button onClick={this.decrement}>-{this.props.by}</button>
            
              
            </div>

            );

        };

      //arrow function removes need for binding in line 17 increment =() =>
        increment(){ //update the state of the component counter++;

            //console.log('increment');
            //this.state.counter++  //cannot mutate state directly must use set state

            this.setState({
                counter : this.state.counter + this.props.by  //creating state object
                });
                
            this.props.incrementMethod(this.props.by);
        }
        decrement(){
            this.setState({
                counter: this.state.counter - this.props.by
            });

            this.props.decrementMethod(this.props.by);
        }
        reset = () =>{
            this.setState({
                counter: 0
            });


        }
    
}
//check proptype always a number
CounterButton.propTypes = {
    by : PropTypes.number
}









export default Counter;