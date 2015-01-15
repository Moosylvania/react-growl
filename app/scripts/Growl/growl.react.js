var React = require('react');
var SingleGrowl = require('./single-growl.react.js');

// Private vars
var holder = null;
var position = "br";
var valid_positions = ["tl", "tr", "bl", "br", "tc", "bc"];
var delay = 3000;
var animations = true;

var Growl = React.createClass({

	// This is just a counter, don't modify directly
	uid: 5200,

	levels: ['info', 'warn', 'error', 'success'],

	// Convenience constans for setting notification level
	WARN: 'warn',
	INFO: 'info',
	ERROR: 'error',
	SUCCESS: 'success',

	// Use these statics to configure all Growls from anywhere in your application
	statics: {
		setPosition: function(pos) {
			if(inArray(pos, valid_positions)) {
				position = pos;
			} else {
				console.log('Unknown position supplied.');
			}
		},
		setDelay: function(del) {
			delay = parseInt(del);
			SingleGrowl.setDelay(del);
		},
		getDelay: function() {
			return delay;
		},
		noAnimations: function() {
			animations = false;
			SingleGrowl.noAnimations();
		}
	},


	getInitialState: function() {
		return {
			notifications: []
		}
	},

	getDefaultProps: function() {		
		return {
			level: "info"
		};

	},	

	handleRemovedNotification: function(uid) {
		var notifications = this.state.notifications;
		var n = notifications.filter(function(ele) {
			return ele.uid !== uid;
		});
		this.setState( { notifications: n} );
	},

	addNotification: function(note) {
		var n = this.state.notifications;
		var self = this;
		try {
			if(note.level) {
				if(!inArray(note.level, this.levels)) {
					throw "Invalid level supplied";
				} else {
					note.uid = this.uid;
					note.ref = "notification-"+this.uid;
					this.uid += 1;
					note.timeout = false;

					n.push(note);
					
					this.setState({ notifications: n });
				}
			}
		} catch (ex) {
			console.log('Error adding notification: '+ex);
		}
	},

	componentDidMount: function() {
		if(holder === null) {
			holder = this.getDOMNode();
		}
	},

	render: function() {
		var that = this;

		return (
			<div className="growl-wrapper">
			  <ul>
				{this.state.notifications.map(function(n) {					
					return <SingleGrowl key={n.uid} ref={n.ref} notification={n} onDidRemove={that.handleRemovedNotification} />
				})}
			  </ul>
			</div>
		);
	
	}
});

function inArray(needle, haystack) {
	var length = haystack.length;
	for(var i=0; i < length; i++) {
		if(haystack[i] == needle) return true;
	}
	return false;
}

module.exports = Growl;