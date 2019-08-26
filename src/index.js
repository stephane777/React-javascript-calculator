import React from 'react';
import ReactDOM from 'react-dom';
import { DiReact } from 'react-icons/di';

import './style/style.css';
import Calculator from './js/Calculator';

class App extends React.Component {
     render() {
          return (
               <div id="main-container">
                    <DiReact id="react_icon" />
                    <Calculator />
               </div>
          );
     }
}

ReactDOM.render(<App />, document.getElementById('root'));
