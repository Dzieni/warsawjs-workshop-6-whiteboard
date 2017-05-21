import React from 'react';
import Whiteboard from './Whiteboard.jsx';

// App component - represents the whole app
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawingMode: true,
            color: '#000000'
        };
        this.handleModeChange = this.handleModeChange.bind(this);
    }
    handleModeChange(e) {
        this.setState({
            isDrawingMode: e.target.checked
        });
    }
    handleColorChange(e) {
        this.setState({
            color: e.target.value
        });
    }
    render() {
        const params = this.props.match.params;
        const boardId = params.id ? params.id : 'main';
        const { isDrawingMode } = this.state;
        return (
            <div className="container">
                <header>
                    <h1>Whiteboard</h1>
                </header>
                <div className="whiteboard-container"><Whiteboard isDrawingMode={this.state.isDrawingMode} boardId={boardId} /></div>
                <label><input type="checkbox" value={this.state.isDrawingMode} onChange={this.handleModeChange} /> Drawing on/off</label>
                <div><input type="color" value="#000000" onChange={this.handleColorChange} /></div>
            </div>
        );
    }
}