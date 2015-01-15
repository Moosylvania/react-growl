# react-growl
A 'Growl' style notification ReactJS component.

### INSTALL

npm install react-growl

### USAGE

In your app's main file:

```Javascript

/** @jsx React.Dom */

var React = require("react");

var Growl = require("Growl/growl.react");

var MyApp = React.createClass({
	
	growler: null,

	componentDidMount: function() {

		// Setup your Growl Settings
		Growl.setPosition("tr"); // Bottom-Right(br) by default

		// set our internal variable to a reference to an instance of the growler
		this.growler = this.refs.growler;
	},

	// Give your whole app a method to call and trigger a notification.
	growl: function(level, msg) {
		this.growler.addNotification(level, msg);
	},

	// Somewhere in your main application view (so that it doesn't get unmounted) add an instance of Growl.
	render: function() {
		return (
			<div className="myApp">
				<Growl ref="growler" />
			</div>
		);
	}

});

module.exports = MyApp;

```

### Static Methods

- setPosition: @arg String inArray: ["tr", "tl", "tc", "br", "bl", "bc"]
  - Sets the position where all notifications will appear. Default: "br"
- setDelay: @arg Integer ms
  - The amount of time, in milliseconds, a notification will appear. Be sure to include time needed for any initial animation when the notification is added.
- getDelay: @returns Integer ms
- noAnimation: void
  - If you are not using css animations for the notification show/remove, this will need called after you mount the component. If not called, the notifications will not be removed once the delay expires.

### Copyright

Copyright (c) 2015 Moosylvania Marketing (hosting@moosylvania.com)

### Maintainer

Mitch Viner (mitch.viner@moosylvania.com)

http://github.com/Mviner04

### License

Licensed under the MIT License.

