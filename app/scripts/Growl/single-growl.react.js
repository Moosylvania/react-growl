var React = require('react');

var animations = true;
var delay = 3000;

var SingleGrowl = React.createClass({

	getInitialState: function() {
		return {
			remove: false
		};
	},

	setRemove: function() {

		// Just in case this was triggered some other way than the timeout itself.
		clearTimeout(this.props.notification.timeout);

		if(!animations) {
			this.props.onDidRemove(this.props.notification.uid);
		} else {
			this.setState({ remove: true });
		}
	},

	statics: {
		noAnimations: function() {
			animations = false;
		},
		setDelay: function(ms) {
			delay = ms;
		},
		getDelay: function() {
			return delay;
		}
	},
	
	getDefaultProps: function() {
		return {
			notification: null,
			onDidRemove: function(uid) {}
		};
	},

	startTimer: function() {
		var note = this.props.notification;
		var self = this;
		note.timeout = setTimeout(function() {
						self.setRemove();
					}, delay);
	},

	componentDidMount: function() {
		// This should always evaluate to true, but just in case...
		if(this.props.notification.timeout === false) {
			this.startTimer();
		}

		if(animations) {
			var self = this;
			var ele = this.getDOMNode();
			var transitionEvent = whichTransitionEvent();
			if(transitionEvent) {
				ele.addEventListener(transitionEvent, function() {
					if(self.state.remove) {
						self.props.onDidRemove(self.props.notification.uid);
					}
				});
			} else {
				// Force animations to false bc this browser doesn't support them... 
				console.log('Animations disabled. Browser does not support.');
				animations = false;
			}
		}
	},

	render: function() {
		var cname = "growl " + this.props.notification.level;
		if(this.state.remove) {
			cname = cname + " removing";
		}
		return (<li className={cname}><span>[{this.props.notification.level}] {this.props.notification.msg}</span></li>);
	}

});

/* From Modernizr */
function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

module.exports = SingleGrowl;