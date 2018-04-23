import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export default function QuickView(props) {
    return (
        <main className="quickView">
            <div className="quickViewContainer">
                <ul className="quickViewList">
                    <li className="quickViewOptions" id="quickViewBudget">
                        <h2 className="quickViewTitle">Set Monthly Budgets</h2>
                        <span>
                            <i className="fas fa-balance-scale quickViewIcon"></i>
                        </span>
                    </li>
                    <li className="quickViewOptions" id="quickViewTrans">
                        <h2 className="quickViewTitle">Track Transactions</h2>
                        <span>
                            <i className="far fa-credit-card quickViewIcon"></i>
                        </span>
                    </li>
                    <li className="quickViewOptions" id="quickViewGoals">
                        <h2 className="quickViewTitle">Set Financial Goals</h2>
                        <span>
                            <i className="fas fa-tasks quickViewIcon"></i>
                        </span>
                    </li>
                </ul>
            </div>
        </main>
    )
}
