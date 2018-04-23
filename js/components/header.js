import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export default function Header(props) {
    return (
        <header className="headerContainer">
            <nav className="navContainer">
                <div className="logoHolder">
                    <h2 className="resultTitle"><span>Budget</span> Buddy</h2>
                </div>
                <div className="navList">
                    <a href="" className="navOptions jsHomeNav">
                        <h4>
                            <i className="fas fa-home logos"></i> Home
                        </h4>
                    </a>
                    <a href="" className="navOptions jsBudgetNav">
                        <h4>
                            <i className="fas fa-balance-scale logos"></i> Budget
                        </h4>
                    </a>
                    <a href="" className="navOptions jsGoalNav">
                        <h4>
                            <i className="fas fa-tasks logos"></i> Goal
                        </h4>
                    </a>
                    <a href="" className="navOptions jsLogoutNav">
                        <h4>
                            <i className="fas fa-sign-out-alt logos"></i> Logout
                        </h4>
                    </a>
                </div>
            </nav>
        </header>
    )
}
