import { Meteor } from 'meteor/meteor';

import FabricObjects from '../imports/lib/fabric-objects';

Meteor.publish({
    fabricObjects(boardId) {
        return FabricObjects.find({
            boardId
        });
    }
});

Meteor.startup(() => {
  // code to run on server at startup
});
