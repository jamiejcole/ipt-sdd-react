import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GA4React, { useGA4React } from "ga-4-react";

const ga4react = new GA4React("G-7B5ZMR2Z0Q");

const root = ReactDOM.createRoot(document.getElementById('root'));

(async () => {
    await ga4react.initialize();
    root.render(
        <App>

        </App>
    )
})();
