var React = require('react');
var SingleGrowl = require('./single-growl.react.js');

// Private vars
var holder = null;
var position = "br";
var valid_positions = ["tl", "tr", "bl", "br", "tc", "bc"];
var delay = 3000;
var animations = true;
var maxShown = 8;

var movePosition = function() {
	var y = position.slice(0, 1);
	if(y == "t") {
		holder.style.top = "0px";
		holder.style.bottom = "auto";
	} else {
		holder.style.top = "auto";
		holder.style.bottom = "0px";
	}

	var x = position.slice(1, 2);
	if(x == "l") {
		holder.style.left = "0px";
		holder.style.right = "auto";
	} else if(x == "r") {
		holder.style.left = "auto";
		holder.style.right = "0px";
	} else {
		var neg = holder.clientWidth / 2;
		var left = (window.innerWidth / 2) - neg;
		holder.style.left = left + "px";
		holder.style.right = "auto";
	}
}

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

			if(holder !== null) {
				movePosition();
			}
		},
		setMaxToShow: function(ct) {
			maxShown = ct;
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
		return {};
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
		movePosition();
	},

	render: function() {
		var that = this;

		if(this.state.notifications.length == 0 ) {
			return <div className="growl-wrapper empty"></div>;
		}
		var isMore = "";
		var count = 0;
		if(this.state.notifications.length > maxShown) {
			var amt = this.state.notifications.length - maxShown;
			isMore = <li key="more-still"><span>{amt} more</span></li>
		}

		return (
			<div className="growl-wrapper">
			  <ul>
				{this.state.notifications.map(function(n) {					
					count += 1;
					if(count >= maxShown) {
						return "";
					} else {
						return <SingleGrowl key={n.uid} ref={n.ref} notification={n} onDidRemove={that.handleRemovedNotification} />
					}
				})}
				{isMore}
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