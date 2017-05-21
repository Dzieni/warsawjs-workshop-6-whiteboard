import React from 'react';
import { fabric } from 'fabric';
import { findDOMNode } from 'react-dom';

export default class Whiteboard extends React.Component {
    componentDidMount() {
        this._canvas = new fabric.Canvas(findDOMNode(this), {
            isDrawingMode: true,
            selection: false
        });
    }
    render() {
        return (
            <canvas width="500" height="500"></canvas>
        );
    }
}

Whiteboard.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required

};