# react-growl
A 'Growl' style notification ReactJS component.

### INSTALL

npm install react-growl

Note on Requirements: Many in package.json are listed in order to run the demo. The only requirement to install this into your application is React.

### EXAMPLE

Use npm to install. After installation, from the directory you installed into run:

bower install
gulp serve

Will launch a browser with 

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
		Growl.setMaxToShow(1); // Default is 8

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
- setMaxToShow: @arg Integer
  - The number of notifications to show before just showing "x more"
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

