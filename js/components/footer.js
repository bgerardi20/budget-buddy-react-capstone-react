import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export default function Footer(props) {
    return (
        <footer>
            <a className="footer" href="https://www.linkedin.com/in/brendan-gerardi-45b11111b/" target="_blank">
                <i className="fab fa-linkedin footerIcon"></i>LinkedIn
            </a>
            <a className="footer" href="mailto:brendan.gerardi@gmail.com" target="_blank">
                <i className="fas fa-envelope footerIcon"></i>Email
            </a>
            <a className="footer" href="https://github.com/bgerardi20" target="_blank">
                <i className="fab fa-github-square footerIcon"></i>Github
            </a>
        </footer>
    )
}
