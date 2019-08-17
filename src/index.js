import React from 'react'
import ReactDOM from 'react-dom'
import './Calculator'
import './style.css'
import Calculator from './Calculator';

class App extends React.Component {
    render(){
        return (
            <div id="main-container">
               <Calculator />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))