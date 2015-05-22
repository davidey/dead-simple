function objectEntries(obj) {
    let index = 0;

    // In ES6, you can use strings or symbols as property keys,
    // Reflect.ownKeys() retrieves both
    let propKeys = Object.keys(obj);

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (index < propKeys.length) {
                let key = propKeys[index];
                index++;
                return { value: [key, obj[key]] };
            } else {
                return { done: true };
            }
        }
    };
}

// function overlayAnimation() {
// 	$('.overlay').velocity({
// 		width: 500
// 	}, {
// 		duration: 0,
// 		complete: function () {
// 			console.log('complete');
// 		}
// 	});

// 	$('.overlay').velocity({
// 		height: 500
// 	}, {
// 		delay: 500,
// 		duration: 1000,
// 		queue: false
// 	});
// };


// var animationProperties = {
// 	el: '.overlay',
// 	keyframes: {
// 		0: {},
// 		500: {
// 			height: 'start'
// 		},
// 		1000: {
// 			width: 500
// 		},
// 		1500: {
// 			height: 500
// 		}
// 	}
// }

// var animationProperties = {
// 	el: '.overlay',
// 	keyframes: {
// 		0: {},
// 		1000: {
// 			width: 500,
// 			height: 500
// 		}
// 	}
// }

// var animationProperties = {
// 	el: '.overlay',
// 	keyframes: {
// 		0: {},
// 		500: {
// 			width: 500,
// 			height: 'start'
// 		},
// 		1000: {
// 			height: 500			
// 		}
// 	}
// }


// var animationProperties = {
// 	el: '.overlay',
// 	keyframes: {
// 		0: {},
// 		1000: {
// 			opacity: 0,
// 			display: 'none'			
// 		}
// 	}
// }

var animationProperties = {
	el: '.overlay',
	keyframes: {
		200: {
			display: 'block'
		},
		1000: {
			opacity: 1,		
		}
	}
}

class Parser {
	constructor(props) {
		this.timeline = {};
		this.delayedProps = {};

		var $el = $(props.el);

		for (let [kf, kfProps] of objectEntries(props.keyframes)) {
			kf = parseInt(kf);

			for (let [name, value] of objectEntries(kfProps)) {
				if (value === 'start') {
					this.delayedProps[name] = kf;
				} else {
					let delay = this.getPropertyDelay(name);
					let duration = kf - delay;

					this.addTimeoutEntry(name, value, duration, delay);
				}
			}
		}

		this.render($el);
	}

	addTimeoutEntry(name, value, duration, delay) {
		let timelineKey = delay + ',' + duration;

		if (!this.timeline[timelineKey]) {
			this.timeline[timelineKey] = {
				delay: delay,
				duration: duration,
				properties: {}
			};
		}

		this.timeline[timelineKey].properties[name] = value;
	}

	getPropertyDelay(name) {
		var result = 0;

		if (this.delayedProps[name]) {
			result = this.delayedProps[name];
			delete this.delayedProps[name];
		}

		return result;
	}

	render($el) {
		for (let[key, value] of objectEntries(this.timeline)) {
			var velocityProperties = value.properties;
			velocityProperties.tween = 100;

			var velocityOptions = {
				delay: value.delay,
				duration: value.duration,
				queue: false
			}

			if (velocityProperties.display) {
				velocityOptions.complete = (function (displayValue) {
					return function () {
						$el.css('display', displayValue);
					}
				}(velocityProperties.display));

				delete velocityProperties.display;
			}

			$el.velocity(velocityProperties, velocityOptions);
		}
	}
}



$(document).ready(function () {
	$('.overlay').css({
		display: 'none',
		opacity: 0
	});

	var parser = new Parser(animationProperties);

	// overlayAnimation();
});