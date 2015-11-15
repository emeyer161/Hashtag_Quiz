// var React = require('react');
import React from 'react';
import ReactDOM from 'react-dom';

// import QuizApp from './components/QuizApp';
import QuizApp from './QuizApp';



ReactDOM.render(
    <QuizApp />,                                // What does this line do?
    // Input (JS):
    // React.createElement(QuizApp),
    document.getElementById('application')      // Specifies location for Quiz
);