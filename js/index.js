import React from 'react';
import ReactDOM from 'react-dom';
const render = ReactDOM.render;
import {
    Provider
} from 'react-redux';

// import '../assets/css/main.css';

import Footer from '../js/components/footer';
import Intro from '../js/components/intro';
import QuickView from '../js/components/quick-view';
import Header from '../js/components/header';


document.addEventListener('DOMContentLoaded', () => {
    return ReactDOM.render( <Footer /> ,
        document.getElementById('reactFooter'));
});
document.addEventListener('DOMContentLoaded', () => {
    return ReactDOM.render( <Intro /> ,
        document.getElementById('reactIntro'));
});
document.addEventListener('DOMContentLoaded', () => {
    return ReactDOM.render( <QuickView /> ,
        document.getElementById('reactQuickView'));
});
document.addEventListener('DOMContentLoaded', () => {
    return ReactDOM.render( <Header /> ,
        document.getElementById('reactHeader'));
});
