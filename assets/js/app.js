// var React = require('react');
import React from 'react';
import ReactDOM from 'react-dom';

import QuizApp from './QuizApp';

ReactDOM.render(
    <QuizApp />,                            // React.createElement(QuizApp),
    document.getElementById('application')  // Specifies location for Quiz
);