import React from 'react';
import { fabric } from 'fabric';
import { findDOMNode } from 'react-dom';
import { Mongo } from 'meteor/mongo';

import FabricObjects from '../lib/fabric-objects';

export default class Whiteboard extends React.Component {
    componentDidMount() {
        this._canvas = new fabric.Canvas(findDOMNode(this), {
            isDrawingMode: true
        });
        this._canvas.on('object:added', async ({ target: fabricObject }) => {
            if (fabricObject.id) {
                return;
            }
            const pushFabricObject = fabricObject.toObject();
            pushFabricObject.boardId = this.props.boardId;
            const id = await FabricObjects.genInsert(pushFabricObject);
            fabricObject.id = id;
        });
        this._canvas.on('object:modified', async ({ target: fabricObject }) => {
            await FabricObjects.genModify(fabricObject.id, fabricObject.toObject());
        });
        this._canvas.on('object:removed', (e) => {

        });
        Meteor.subscribe('fabricObjects', this.props.boardId);
        FabricObjects.find().observeChanges({
           added: (id, doc) => {
                const objectOnCanvas = this._canvas.getObjectById(id);
                if (objectOnCanvas) {
                    return;
                }
                fabric.util.enlivenObjects([doc], ([fabricObject]) => {
                    fabricObject.id = id;
                    this._canvas.add(fabricObject);
                });
           },
           changed: (id, fields) => {
               const fabricObject = this._canvas.getObjectById(id);
               if (!fabricObject) {
                   return;
               }
               fabricObject.set(fields);
               this._canvas.deactivateAll().renderAll();
           },
           removed: (id) => {
               const fabricObject = this._canvas.getObjectById(id);
               console.log(fabricObject);
               if (!fabricObject) {
                   return;
               }
               this._canvas.remove(fabricObject);
               this._canvas.renderAll();
           },
        });
    }
    render() {
        return (
            <canvas width="500" height="500"></canvas>
        );
    }
    componentWillUpdate(options) {
        this._canvas.isDrawingMode = options.isDrawingMode;
    }
}

Whiteboard.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required

};

fabric.Canvas.prototype.getObjectById = function (id) {
    return this.getObjects().find(obj => obj.id === id);
}