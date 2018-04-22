import React from 'react';
import ReactDOM from 'react-dom';
const render = ReactDOM.render;
import {
    Provider
} from 'react-redux';

// import '../assets/css/main.css';

import Footer from '../js/components/footer';


document.addEventListener('DOMContentLoaded', () => {
    return ReactDOM.render( <Footer /> ,
        document.getElementById('reactFooter'));
});
