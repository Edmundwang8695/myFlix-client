import React from 'react';
import ReactDom from 'react-dom';

//import statment to indicate the need to bundle './index.scss'

import './index.scss';

//main component (will eventually use all others)
class myFlixApplication extends React.Component{
    render(){
        return (
            <div className= "my-flix">
                <div>Good Morning</div>
            </div>
        );  
    }
}

//finds the root of the app
const container = document.getElementsByClassName("app-container")
[0];

//tells React to render app in the root DOM element
ReactDom.render(React.createElement(myFlixApplication),container);