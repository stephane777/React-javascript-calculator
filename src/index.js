import React from 'react'
import ReactDOM from 'react-dom'

import './style/style.css'
import Calculator from './js/Calculator';

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