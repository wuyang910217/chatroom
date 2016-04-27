import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import injectTapEventPlugin from 'react-tap-event-plugin';
import Hello from '../imports/ui/Hello.jsx';
import { renderRoutes } from '../imports/startup/client/routes.jsx';

Meteor.startup( () => {
  injectTapEventPlugin();
  render(renderRoutes(), document.getElementById('app-container'));
});
