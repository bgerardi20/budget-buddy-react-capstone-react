import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export default function Intro(props) {
    return (
        <main className="introScreen">
            <div className="welcomeContainer">
                <img className="loginLogo" src="assets/website-images/finance-background.jpg" alt="budget_background" />
                <div className="welcomeMessage">
                    <h1 className="firstWelcomeMessage">Trouble Sticking To a Budget?</h1>
                    <h2 className="secondWelcomeMessage">Meet your New Buddy..</h2>
                    <div className="welcomeButtonContainer">
                        <button className="loginButton jsLoginButton" type="submit">Login</button>
                        <button className="loginButton jsRegisterButton" type="submit">Register</button>
                    </div>
                </div>
            </div>
        </main>
    )
}
