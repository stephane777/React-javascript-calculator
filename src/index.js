import React from 'react';
import ReactDOM from 'react-dom';
import { DiReact, DiGithubBadge } from 'react-icons/di';

import './style/style.css';
import Calculator from './js/Calculator';

class App extends React.Component {
     render() {
          return (
               <div id="main-container">
                    <DiReact id="react_icon" />
                    <Calculator />
                    <div id="footer">
                         <div>Created by Stephane Candelas</div>
                         <a
                              href="https://github.com/stephane777"
                              target="_blank"
                         >
                              <DiGithubBadge id="github_icon" />
                         </a>
                    </div>
               </div>
          );
     }
}

ReactDOM.render(<App />, document.getElementById('root'));
