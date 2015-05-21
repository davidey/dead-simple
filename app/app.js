// function overlayAnimation() {
// 	$('.overlay').velocity({
// 		width: 500
// 	}, {
// 		duration: 1000
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

var animationProperties = {
	el: '.overlay',
	keyframes: {
		0: {},
		500: {
			width: 500,
			height: 'start'
		},
		1000: {
			height: 500			
		}
	}
}

class Parser {
	constructor(props) {
		console.log('Object Parser instanciated');

		var $el = $(props.el);

		for (var keyframe of Object.keys(props.keyframes)) {
			var keyframeProperties = props.keyframes[keyframe];

			if (Object.keys(keyframeProperties).length) {
				var velocityProperties = this.parseKeyframeProperties(keyframeProperties);
				var velocityOptions = {
					delay: 0,
					duration: keyframe,
					queue: false
				};

				$el.velocity(velocityProperties, velocityOptions);
			}
		}
	}

	parseKeyframeProperties(props, keyframe) {
		var result = {};

		for (var property of Object.keys(props)) {
			var value = props[property];

			if (value === 'start') {
				continue;
			}

			result[property] = value;
		}

		return result;
	}
}



$(document).ready(function () {
	var parser = new Parser(animationProperties);
});