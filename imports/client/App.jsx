import React from 'react';

import Whiteboard from './Whiteboard.jsx';

// App component - represents the whole app
export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <header>
                    <h1>Whiteboard</h1>
                </header>

                <div className="whiteboard-container"> <Whiteboard /></div>
            </div>
        );
    }
}