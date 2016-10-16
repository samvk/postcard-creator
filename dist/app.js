/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1);

	__webpack_require__(4);

	__webpack_require__(5);

	__webpack_require__(9);

	__webpack_require__(10);

	__webpack_require__(11);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(2);

	var _pubsub = __webpack_require__(3);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*************** </> Imports ******************/

	$(".gcard-3d").flip({ trigger: "manual" }); //bind flip

	_pubsub2.default.on("gcardSet", function () {
		$(".gcard-3d").addClass("fade-in");
	}).on("gcardSet", function () {
		$(".gcard-3d").flip(false); //flip to front
	}).on("gcardSave", function () {
		$(".gcard-3d").flip(true); //flip to back
	}).on("reset", function () {
		$(".gcard-3d").removeClass("fade-in");
	});

	/*************** Postcard icon listeners *****************/

	$(".gcard__button").click(function () {
		_pubsub2.default.trigger("gcardSave");
	});

	$(".edit__button").click(function () {
		_pubsub2.default.trigger("gcardSet");
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	/*! flip - v1.1.1 - 2016-05-25
	* https://github.com/nnattawat/flip
	* Copyright (c) 2016 Nattawat Nonsung; Licensed MIT */
	(function ($) {
	  /*
	   * Private attributes and method
	   */

	  // Function from David Walsh: http://davidwalsh.name/css-animation-callback licensed with http://opensource.org/licenses/MIT
	  var whichTransitionEvent = function whichTransitionEvent() {
	    var t,
	        el = document.createElement("fakeelement"),
	        transitions = {
	      "transition": "transitionend",
	      "OTransition": "oTransitionEnd",
	      "MozTransition": "transitionend",
	      "WebkitTransition": "webkitTransitionEnd"
	    };

	    for (t in transitions) {
	      if (el.style[t] !== undefined) {
	        return transitions[t];
	      }
	    }
	  };

	  /*
	   * Model declaration
	   */
	  var Flip = function Flip($el, options, callback) {
	    // Define default setting
	    this.setting = {
	      axis: "y",
	      reverse: false,
	      trigger: "click",
	      speed: 500,
	      forceHeight: false,
	      forceWidth: false,
	      autoSize: true,
	      front: '.front',
	      back: '.back'
	    };

	    this.setting = $.extend(this.setting, options);

	    if (typeof options.axis === 'string' && (options.axis.toLowerCase() === 'x' || options.axis.toLowerCase() === 'y')) {
	      this.setting.axis = options.axis.toLowerCase();
	    }

	    if (typeof options.reverse === "boolean") {
	      this.setting.reverse = options.reverse;
	    }

	    if (typeof options.trigger === 'string') {
	      this.setting.trigger = options.trigger.toLowerCase();
	    }

	    var speed = parseInt(options.speed);
	    if (!isNaN(speed)) {
	      this.setting.speed = speed;
	    }

	    if (typeof options.forceHeight === "boolean") {
	      this.setting.forceHeight = options.forceHeight;
	    }

	    if (typeof options.forceWidth === "boolean") {
	      this.setting.forceWidth = options.forceWidth;
	    }

	    if (typeof options.autoSize === "boolean") {
	      this.setting.autoSize = options.autoSize;
	    }

	    if (typeof options.front === 'string' || options.front instanceof $) {
	      this.setting.front = options.front;
	    }

	    if (typeof options.back === 'string' || options.back instanceof $) {
	      this.setting.back = options.back;
	    }

	    // Other attributes
	    this.element = $el;
	    this.frontElement = this.getFrontElement();
	    this.backElement = this.getBackElement();
	    this.isFlipped = false;

	    this.init(callback);
	  };

	  /*
	   * Public methods
	   */
	  $.extend(Flip.prototype, {

	    flipDone: function flipDone(callback) {
	      var self = this;
	      // Providing a nicely wrapped up callback because transform is essentially async
	      self.element.one(whichTransitionEvent(), function () {
	        self.element.trigger('flip:done');
	        if (typeof callback === 'function') {
	          callback.call(self.element);
	        }
	      });
	    },

	    flip: function flip(callback) {
	      if (this.isFlipped) {
	        return;
	      }

	      this.isFlipped = true;

	      var rotateAxis = "rotate" + this.setting.axis;
	      this.frontElement.css({
	        transform: rotateAxis + (this.setting.reverse ? "(-180deg)" : "(180deg)"),
	        "z-index": "0"
	      });

	      this.backElement.css({
	        transform: rotateAxis + "(0deg)",
	        "z-index": "1"
	      });
	      this.flipDone(callback);
	    },

	    unflip: function unflip(callback) {
	      if (!this.isFlipped) {
	        return;
	      }

	      this.isFlipped = false;

	      var rotateAxis = "rotate" + this.setting.axis;
	      this.frontElement.css({
	        transform: rotateAxis + "(0deg)",
	        "z-index": "1"
	      });

	      this.backElement.css({
	        transform: rotateAxis + (this.setting.reverse ? "(180deg)" : "(-180deg)"),
	        "z-index": "0"
	      });
	      this.flipDone(callback);
	    },

	    getFrontElement: function getFrontElement() {
	      if (this.setting.front instanceof $) {
	        return this.setting.front;
	      } else {
	        return this.element.find(this.setting.front);
	      }
	    },

	    getBackElement: function getBackElement() {
	      if (this.setting.back instanceof $) {
	        return this.setting.back;
	      } else {
	        return this.element.find(this.setting.back);
	      }
	    },

	    init: function init(callback) {
	      var self = this;

	      var faces = self.frontElement.add(self.backElement);
	      var rotateAxis = "rotate" + self.setting.axis;
	      var perspective = self.element["outer" + (rotateAxis === "rotatex" ? "Height" : "Width")]() * 2;
	      var elementCss = {
	        'perspective': perspective,
	        'position': 'relative'
	      };
	      var backElementCss = {
	        "transform": rotateAxis + "(" + (self.setting.reverse ? "180deg" : "-180deg") + ")",
	        "z-index": "0"
	      };
	      var faceElementCss = {
	        "backface-visibility": "hidden",
	        "transform-style": "preserve-3d",
	        "position": "absolute",
	        "z-index": "1"
	      };

	      if (self.setting.forceHeight) {
	        faces.outerHeight(self.element.height());
	      } else if (self.setting.autoSize) {
	        faceElementCss.height = '100%';
	      }

	      if (self.setting.forceWidth) {
	        faces.outerWidth(self.element.width());
	      } else if (self.setting.autoSize) {
	        faceElementCss.width = '100%';
	      }

	      // Back face always visible on Chrome #39
	      if ((window.chrome || window.Intl && Intl.v8BreakIterator) && 'CSS' in window) {
	        //Blink Engine, add preserve-3d to self.element
	        elementCss["-webkit-transform-style"] = "preserve-3d";
	      }

	      self.element.css(elementCss);
	      self.backElement.css(backElementCss);
	      faces.css(faceElementCss).find('*').css({
	        "backface-visibility": "hidden"
	      });

	      // #39
	      // not forcing width/height may cause an initial flip to show up on
	      // page load when we apply the style to reverse the backface...
	      // To prevent self we first apply the basic styles and then give the
	      // browser a moment to apply them. Only afterwards do we add the transition.
	      setTimeout(function () {
	        // By now the browser should have applied the styles, so the transition
	        // will only affect subsequent flips.
	        var speedInSec = self.setting.speed / 1000 || 0.5;
	        faces.css({
	          "transition": "all " + speedInSec + "s ease-out"
	        });

	        // This allows flip to be called for setup with only a callback (default settings)
	        if (typeof callback === 'function') {
	          callback.call(self.element);
	        }

	        // While this used to work with a setTimeout of zero, at some point that became
	        // unstable and the initial flip returned. The reason for this is unknown but we
	        // will temporarily use a short delay of 20 to mitigate this issue. 
	      }, 20);

	      self.attachEvents();
	    },

	    clickHandler: function clickHandler(event) {
	      if (!event) {
	        event = window.event;
	      }
	      if (this.element.find($(event.target).closest('button, a, input[type="submit"]')).length) {
	        return;
	      }

	      if (this.isFlipped) {
	        this.unflip();
	      } else {
	        this.flip();
	      }
	    },

	    hoverHandler: function hoverHandler() {
	      var self = this;
	      self.element.off('mouseleave.flip');

	      self.flip();

	      setTimeout(function () {
	        self.element.on('mouseleave.flip', $.proxy(self.unflip, self));
	        if (!self.element.is(":hover")) {
	          self.unflip();
	        }
	      }, self.setting.speed + 150);
	    },

	    attachEvents: function attachEvents() {
	      var self = this;
	      if (self.setting.trigger === "click") {
	        self.element.on($.fn.tap ? "tap.flip" : "click.flip", $.proxy(self.clickHandler, self));
	      } else if (self.setting.trigger === "hover") {
	        self.element.on('mouseenter.flip', $.proxy(self.hoverHandler, self));
	        self.element.on('mouseleave.flip', $.proxy(self.unflip, self));
	      }
	    },

	    flipChanged: function flipChanged(callback) {
	      this.element.trigger('flip:change');
	      if (typeof callback === 'function') {
	        callback.call(this.element);
	      }
	    },

	    changeSettings: function changeSettings(options, callback) {
	      var self = this;
	      var changeNeeded = false;

	      if (options.axis !== undefined && self.setting.axis !== options.axis.toLowerCase()) {
	        self.setting.axis = options.axis.toLowerCase();
	        changeNeeded = true;
	      }

	      if (options.reverse !== undefined && self.setting.reverse !== options.reverse) {
	        self.setting.reverse = options.reverse;
	        changeNeeded = true;
	      }

	      if (changeNeeded) {
	        var faces = self.frontElement.add(self.backElement);
	        var savedTrans = faces.css(["transition-property", "transition-timing-function", "transition-duration", "transition-delay"]);

	        faces.css({
	          transition: "none"
	        });

	        // This sets up the first flip in the new direction automatically
	        var rotateAxis = "rotate" + self.setting.axis;

	        if (self.isFlipped) {
	          self.frontElement.css({
	            transform: rotateAxis + (self.setting.reverse ? "(-180deg)" : "(180deg)"),
	            "z-index": "0"
	          });
	        } else {
	          self.backElement.css({
	            transform: rotateAxis + (self.setting.reverse ? "(180deg)" : "(-180deg)"),
	            "z-index": "0"
	          });
	        }
	        // Providing a nicely wrapped up callback because transform is essentially async
	        setTimeout(function () {
	          faces.css(savedTrans);
	          self.flipChanged(callback);
	        }, 0);
	      } else {
	        // If we didnt have to set the axis we can just call back.
	        self.flipChanged(callback);
	      }
	    }

	  });

	  /*
	   * jQuery collection methods
	   */
	  $.fn.flip = function (options, callback) {
	    if (typeof options === 'function') {
	      callback = options;
	    }

	    if (typeof options === "string" || typeof options === "boolean") {
	      this.each(function () {
	        var flip = $(this).data('flip-model');

	        if (options === "toggle") {
	          options = !flip.isFlipped;
	        }

	        if (options) {
	          flip.flip(callback);
	        } else {
	          flip.unflip(callback);
	        }
	      });
	    } else {
	      this.each(function () {
	        if ($(this).data('flip-model')) {
	          // The element has been initiated, all we have to do is change applicable settings
	          var flip = $(this).data('flip-model');

	          if (options && (options.axis !== undefined || options.reverse !== undefined)) {
	            flip.changeSettings(options, callback);
	          }
	        } else {
	          // Init
	          $(this).data('flip-model', new Flip($(this), options || {}, callback));
	        }
	      });
	    }

	    return this;
	  };
	})(jQuery);

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var eventStore = {};

	var Events = function () {
	    function Events() {
	        _classCallCheck(this, Events);
	    }

	    _createClass(Events, null, [{
	        key: "on",
	        value: function on(eventName, handler) {
	            eventStore[eventName] = eventStore[eventName] || [];
	            eventStore[eventName].push(handler);

	            return this;
	        }
	    }, {
	        key: "trigger",
	        value: function trigger(eventName, data) {
	            if (eventStore[eventName]) {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = eventStore[eventName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var handler = _step.value;

	                        handler(data);
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }
	        }
	    }]);

	    return Events;
	}();

	exports.default = Events;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _pubsub = __webpack_require__(3);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*************** </> Imports ******************/

	function setStep(name) {
		$("[data-step]").removeClass("is-active");
		$("[data-step=\"" + name + "\"]").addClass("is-active");
	}

	_pubsub2.default.on("gcardSet", function () {
		setStep("personalize");
	}).on("gcardSave", function () {
		setStep("send");
	}).on("resetOver", function () {
		setStep("upload");
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _webcam = __webpack_require__(6);

	var _webcam2 = _interopRequireDefault(_webcam);

	var _pubsub = __webpack_require__(3);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _data = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*************** </> Imports ******************/

	function closeWebcam() {
		$(".webcam-wrapper").removeClass("fade-in");
		_webcam2.default.reset();
	}

	function openWebcam(e) {
		e.stopPropagation();

		_webcam2.default.set({
			width: _data.POSTCARD.long,
			height: _data.POSTCARD.short
		});

		_webcam2.default.attach("#webcam");

		$(".webcam-wrapper").addClass("fade-in");

		function takeSnapshot() {
			_webcam2.default.snap(function (dataUri) {
				var $gcardImage = $(".gcard-image");

				$gcardImage.attr("src", dataUri); //set giftcard image
				$gcardImage.on("load", function () {
					//wait till image is loaded
					_pubsub2.default.trigger("gcardSet", $gcardImage[0]);
				});
			});
			closeWebcam();
		}

		$(".webcam__snap").click(takeSnapshot);
	}

	$(".dropzone__camera").click(openWebcam);

	//toggle display on snap & unfocused click
	$(".webcam__close").click(closeWebcam);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // WebcamJS v1.0.16
	// Webcam library for capturing JPEG/PNG images in JavaScript
	// Attempts getUserMedia, falls back to Flash
	// Author: Joseph Huckaby: http://github.com/jhuckaby
	// Based on JPEGCam: http://code.google.com/p/jpegcam/
	// Copyright (c) 2012 - 2016 Joseph Huckaby
	// Licensed under the MIT License

	var _dropzoneUi = __webpack_require__(7);

	var _dropzoneUi2 = _interopRequireDefault(_dropzoneUi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function (window) {
		var _userMedia;

		// declare error types

		// inheritance pattern here:
		// https://stackoverflow.com/questions/783818/how-do-i-create-a-custom-error-in-javascript
		function FlashError() {
			var temp = Error.apply(this, arguments);
			temp.name = this.name = "FlashError";
			this.stack = temp.stack;
			this.message = temp.message;
		}

		function WebcamError() {
			var temp = Error.apply(this, arguments);
			temp.name = this.name = "WebcamError";
			this.stack = temp.stack;
			this.message = temp.message;
		}

		IntermediateInheritor = function IntermediateInheritor() {};
		IntermediateInheritor.prototype = Error.prototype;

		FlashError.prototype = new IntermediateInheritor();
		WebcamError.prototype = new IntermediateInheritor();

		var Webcam = {
			version: '1.0.16',

			// globals
			protocol: location.protocol.match(/https/i) ? 'https' : 'http',
			loaded: false, // true when webcam movie finishes loading
			live: false, // true when webcam is initialized and ready to snap
			userMedia: true, // true when getUserMedia is supported natively

			params: {
				width: 0,
				height: 0,
				dest_width: 0, // size of captured image
				dest_height: 0, // these default to width/height
				image_format: 'jpeg', // image format (may be jpeg or png)
				jpeg_quality: 90, // jpeg image quality from 0 (worst) to 100 (best)
				enable_flash: true, // enable flash fallback,
				force_flash: false, // force flash mode,
				flip_horiz: false, // flip image horiz (mirror mode)
				fps: 30, // camera frames per second
				upload_name: 'webcam', // name of file in upload post data
				constraints: null, // custom user media constraints,
				swfURL: '', // URI to webcam.swf movie (defaults to the js location)
				flashNotDetectedText: 'ERROR: No Adobe Flash Player detected.  "Greetings, World!" relies on Flash for browsers that do not support getUserMedia (like yours)."Greetings, World!" relies on Flash for browsers that do not support getUserMedia (like yours)."Greetings, World!" relies on Flash for browsers that do not support getUserMedia (like yours).',
				noInterfaceFoundText: 'No supported webcam interface found.',
				unfreeze_snap: true // Whether to unfreeze the camera after snap (defaults to true)
			},

			errors: {
				FlashError: FlashError,
				WebcamError: WebcamError
			},

			hooks: {}, // callback hook functions

			init: function init() {
				// initialize, check for getUserMedia support
				var self = this;

				// Setup getUserMedia, with polyfill for older browsers
				// Adapted from: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
				this.mediaDevices = navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? navigator.mediaDevices : navigator.mozGetUserMedia || navigator.webkitGetUserMedia ? {
					getUserMedia: function getUserMedia(c) {
						return new Promise(function (y, n) {
							(navigator.mozGetUserMedia || navigator.webkitGetUserMedia).call(navigator, c, y, n);
						});
					}
				} : null;

				window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
				this.userMedia = this.userMedia && !!this.mediaDevices && !!window.URL;

				// Older versions of firefox (< 21) apparently claim support but user media does not actually work
				if (navigator.userAgent.match(/Firefox\D+(\d+)/)) {
					if (parseInt(RegExp.$1, 10) < 21) this.userMedia = null;
				}

				// Make sure media stream is closed when navigating away from page
				if (this.userMedia) {
					window.addEventListener('beforeunload', function (event) {
						self.reset();
					});
				}
			},

			attach: function attach(elem) {
				// create webcam preview and attach to DOM element
				// pass in actual DOM reference, ID, or CSS selector
				if (typeof elem == 'string') {
					elem = document.getElementById(elem) || document.querySelector(elem);
				}
				if (!elem) {
					return this.dispatch('error', new WebcamError("Could not locate DOM element to attach to."));
				}
				this.container = elem;
				elem.innerHTML = ''; // start with empty element

				// insert "peg" so we can insert our preview canvas adjacent to it later on
				var peg = document.createElement('div');
				elem.appendChild(peg);
				this.peg = peg;

				// set width/height if not already set
				if (!this.params.width) this.params.width = elem.offsetWidth;
				if (!this.params.height) this.params.height = elem.offsetHeight;

				// make sure we have a nonzero width and height at this point
				if (!this.params.width || !this.params.height) {
					return this.dispatch('error', new WebcamError("No width and/or height for webcam.  Please call set() first, or attach to a visible element."));
				}

				// set defaults for dest_width / dest_height if not set
				if (!this.params.dest_width) this.params.dest_width = this.params.width;
				if (!this.params.dest_height) this.params.dest_height = this.params.height;

				this.userMedia = _userMedia === undefined ? this.userMedia : _userMedia;
				// if force_flash is set, disable userMedia
				if (this.params.force_flash) {
					_userMedia = this.userMedia;
					this.userMedia = null;
				}

				// check for default fps
				if (typeof this.params.fps !== "number") this.params.fps = 30;

				// adjust scale if dest_width or dest_height is different
				var scaleX = this.params.width / this.params.dest_width;
				var scaleY = this.params.height / this.params.dest_height;

				if (this.userMedia) {
					// setup webcam video container
					var video = document.createElement('video');
					video.setAttribute('autoplay', 'autoplay');
					video.style.width = '' + this.params.dest_width + 'px';
					video.style.height = '' + this.params.dest_height + 'px';

					if (scaleX != 1.0 || scaleY != 1.0) {
						elem.style.overflow = 'hidden';
						video.style.webkitTransformOrigin = '0px 0px';
						video.style.mozTransformOrigin = '0px 0px';
						video.style.msTransformOrigin = '0px 0px';
						video.style.oTransformOrigin = '0px 0px';
						video.style.transformOrigin = '0px 0px';
						video.style.webkitTransform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')';
						video.style.mozTransform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')';
						video.style.msTransform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')';
						video.style.oTransform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')';
						video.style.transform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')';
					}

					// add video element to dom
					elem.appendChild(video);
					this.video = video;

					// ask user for access to their camera
					var self = this;
					this.mediaDevices.getUserMedia({
						"audio": false,
						"video": this.params.constraints || {
							mandatory: {
								minWidth: this.params.dest_width,
								minHeight: this.params.dest_height
							}
						}
					}).then(function (stream) {
						// got access, attach stream to video
						video.onloadedmetadata = function (e) {
							self.stream = stream;
							self.loaded = true;
							self.live = true;
							self.dispatch('load');
							self.dispatch('live');
							self.flip();
						};
						video.src = window.URL.createObjectURL(stream) || stream;
					}).catch(function (err) {
						// JH 2016-07-31 Instead of dispatching error, now falling back to Flash if userMedia fails (thx @john2014)
						// JH 2016-08-07 But only if flash is actually installed -- if not, dispatch error here and now.
						if (self.params.enable_flash && self.detectFlash()) {
							setTimeout(function () {
								self.params.force_flash = 1;self.attach(elem);
							}, 1);
						} else {
							self.dispatch('error', err);
						}
					});
				} else if (this.params.enable_flash && this.detectFlash()) {
					// flash fallback
					window.Webcam = Webcam; // needed for flash-to-js interface
					var div = document.createElement('div');
					div.innerHTML = this.getSWFHTML();
					elem.appendChild(div);
				} else {
					this.dispatch('error', new WebcamError(this.params.noInterfaceFoundText));
				}

				// setup final crop for live preview
				if (this.params.crop_width && this.params.crop_height) {
					var scaled_crop_width = Math.floor(this.params.crop_width * scaleX);
					var scaled_crop_height = Math.floor(this.params.crop_height * scaleY);

					elem.style.width = '' + scaled_crop_width + 'px';
					elem.style.height = '' + scaled_crop_height + 'px';
					elem.style.overflow = 'hidden';

					elem.scrollLeft = Math.floor(this.params.width / 2 - scaled_crop_width / 2);
					elem.scrollTop = Math.floor(this.params.height / 2 - scaled_crop_height / 2);
				} else {
					// no crop, set size to desired
					elem.style.width = '' + this.params.width + 'px';
					elem.style.height = '' + this.params.height + 'px';
				}
			},

			reset: function reset() {
				// shutdown camera, reset to potentially attach again
				if (this.preview_active) this.unfreeze();

				// attempt to fix issue #64
				this.unflip();

				if (this.userMedia) {
					if (this.stream) {
						if (this.stream.getVideoTracks) {
							// get video track to call stop on it
							var tracks = this.stream.getVideoTracks();
							if (tracks && tracks[0] && tracks[0].stop) tracks[0].stop();
						} else if (this.stream.stop) {
							// deprecated, may be removed in future
							this.stream.stop();
						}
					}
					delete this.stream;
					delete this.video;
				}

				if (this.userMedia !== true) {
					// call for turn off camera in flash
					var movie = this.getMovie();
					if (movie && movie._releaseCamera) movie._releaseCamera();
				}

				if (this.container) {
					this.container.innerHTML = '';
					delete this.container;
				}

				this.loaded = false;
				this.live = false;
			},

			set: function set() {
				// set one or more params
				// variable argument list: 1 param = hash, 2 params = key, value
				if (arguments.length == 1) {
					for (var key in arguments[0]) {
						this.params[key] = arguments[0][key];
					}
				} else {
					this.params[arguments[0]] = arguments[1];
				}
			},

			on: function on(name, callback) {
				// set callback hook
				name = name.replace(/^on/i, '').toLowerCase();
				if (!this.hooks[name]) this.hooks[name] = [];
				this.hooks[name].push(callback);
			},

			off: function off(name, callback) {
				// remove callback hook
				name = name.replace(/^on/i, '').toLowerCase();
				if (this.hooks[name]) {
					if (callback) {
						// remove one selected callback from list
						var idx = this.hooks[name].indexOf(callback);
						if (idx > -1) this.hooks[name].splice(idx, 1);
					} else {
						// no callback specified, so clear all
						this.hooks[name] = [];
					}
				}
			},

			dispatch: function dispatch() {
				// fire hook callback, passing optional value to it
				var name = arguments[0].replace(/^on/i, '').toLowerCase();
				var args = Array.prototype.slice.call(arguments, 1);

				if (this.hooks[name] && this.hooks[name].length) {
					for (var idx = 0, len = this.hooks[name].length; idx < len; idx++) {
						var hook = this.hooks[name][idx];

						if (typeof hook == 'function') {
							// callback is function reference, call directly
							hook.apply(this, args);
						} else if ((typeof hook === "undefined" ? "undefined" : _typeof(hook)) == 'object' && hook.length == 2) {
							// callback is PHP-style object instance method
							hook[0][hook[1]].apply(hook[0], args);
						} else if (window[hook]) {
							// callback is global function name
							window[hook].apply(window, args);
						}
					} // loop
					return true;
				} else if (name == 'error') {
					if (args[0] instanceof FlashError || args[0] instanceof WebcamError) {
						message = args[0].message;
					} else {
						message = "Could not access webcam. If error, persists, refreh app.";
					}

					// default error handler if no custom one specified
					(0, _dropzoneUi2.default)("Error: " + message);
				}

				return false; // no hook defined
			},

			setSWFLocation: function setSWFLocation(value) {
				// for backward compatibility.
				this.set('swfURL', value);
			},

			detectFlash: function detectFlash() {
				// return true if browser supports flash, false otherwise
				// Code snippet borrowed from: https://github.com/swfobject/swfobject
				var SHOCKWAVE_FLASH = "Shockwave Flash",
				    SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
				    FLASH_MIME_TYPE = "application/x-shockwave-flash",
				    win = window,
				    nav = navigator,
				    hasFlash = false;

				if (typeof nav.plugins !== "undefined" && _typeof(nav.plugins[SHOCKWAVE_FLASH]) === "object") {
					var desc = nav.plugins[SHOCKWAVE_FLASH].description;
					if (desc && typeof nav.mimeTypes !== "undefined" && nav.mimeTypes[FLASH_MIME_TYPE] && nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin) {
						hasFlash = true;
					}
				} else if (typeof win.ActiveXObject !== "undefined") {
					try {
						var ax = new ActiveXObject(SHOCKWAVE_FLASH_AX);
						if (ax) {
							var ver = ax.GetVariable("$version");
							if (ver) hasFlash = true;
						}
					} catch (e) {
						;
					}
				}

				return hasFlash;
			},

			getSWFHTML: function getSWFHTML() {
				// Return HTML for embedding flash based webcam capture movie		
				var html = '',
				    swfURL = this.params.swfURL;

				// make sure we aren't running locally (flash doesn't work)
				if (location.protocol.match(/file/)) {
					this.dispatch('error', new FlashError("Flash does not work from local disk.  Please run from a web server."));
					return '<h3 style="color:red">ERROR: Flash fallback does not work from local disk.  Please run it from a web server.</h3>';
				}

				// make sure we have flash
				if (!this.detectFlash()) {
					this.dispatch('error', new FlashError("Adobe Flash Player not found.  Please install from get.adobe.com/flashplayer and try again."));
					return '<h3 style="color:red">' + this.params.flashNotDetectedText + '</h3>';
				}

				// set default swfURL if not explicitly set
				if (!swfURL) {
					// find our script tag, and use that base URL
					var base_url = '';
					var scpts = document.getElementsByTagName('script');
					for (var idx = 0, len = scpts.length; idx < len; idx++) {
						var src = scpts[idx].getAttribute('src');
						if (src && src.match(/\/webcam(\.min)?\.js/)) {
							base_url = src.replace(/\/webcam(\.min)?\.js.*$/, '');
							idx = len;
						}
					}
					if (base_url) swfURL = base_url + '/webcam.swf';else swfURL = 'webcam.swf';
				}

				// if this is the user's first visit, set flashvar so flash privacy settings panel is shown first
				if (window.localStorage && !localStorage.getItem('visited')) {
					this.params.new_user = 1;
					localStorage.setItem('visited', 1);
				}

				// construct flashvars string
				var flashvars = '';
				for (var key in this.params) {
					if (flashvars) flashvars += '&';
					flashvars += key + '=' + escape(this.params[key]);
				}

				// construct object/embed tag
				html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" type="application/x-shockwave-flash" codebase="' + this.protocol + '://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + this.params.width + '" height="' + this.params.height + '" id="webcam_movie_obj" align="middle"><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + swfURL + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + flashvars + '"/><embed id="webcam_movie_embed" src="' + swfURL + '" wmode="opaque" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + this.params.width + '" height="' + this.params.height + '" name="webcam_movie_embed" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + flashvars + '"></embed></object>';

				return html;
			},

			getMovie: function getMovie() {
				// get reference to movie object/embed in DOM
				if (!this.loaded) return this.dispatch('error', new FlashError("Flash Movie is not loaded yet. (If error persists, refresh app.)"));
				var movie = document.getElementById('webcam_movie_obj');
				if (!movie || !movie._snap) movie = document.getElementById('webcam_movie_embed');
				if (!movie) this.dispatch('error', new FlashError("Cannot locate Flash movie in DOM"));
				return movie;
			},

			freeze: function freeze() {
				// show preview, freeze camera
				var self = this;
				var params = this.params;

				// kill preview if already active
				if (this.preview_active) this.unfreeze();

				// determine scale factor
				var scaleX = this.params.width / this.params.dest_width;
				var scaleY = this.params.height / this.params.dest_height;

				// must unflip container as preview canvas will be pre-flipped
				this.unflip();

				// calc final size of image
				var final_width = params.crop_width || params.dest_width;
				var final_height = params.crop_height || params.dest_height;

				// create canvas for holding preview
				var preview_canvas = document.createElement('canvas');
				preview_canvas.width = final_width;
				preview_canvas.height = final_height;
				var preview_context = preview_canvas.getContext('2d');

				// save for later use
				this.preview_canvas = preview_canvas;
				this.preview_context = preview_context;

				// scale for preview size
				if (scaleX != 1.0 || scaleY != 1.0) {
					preview_canvas.style.webkitTransformOrigin = '0px 0px';
					preview_canvas.style.mozTransformOrigin = '0px 0px';
					preview_canvas.style.msTransformOrigin = '0px 0px';
					preview_canvas.style.oTransformOrigin = '0px 0px';
					preview_canvas.style.transformOrigin = '0px 0px';
					preview_canvas.style.webkitTransform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')';
					preview_canvas.style.mozTransform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')';
					preview_canvas.style.msTransform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')';
					preview_canvas.style.oTransform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')';
					preview_canvas.style.transform = 'scaleX(' + scaleX + ') scaleY(' + scaleY + ')';
				}

				// take snapshot, but fire our own callback
				this.snap(function () {
					// add preview image to dom, adjust for crop
					preview_canvas.style.position = 'relative';
					preview_canvas.style.left = '' + self.container.scrollLeft + 'px';
					preview_canvas.style.top = '' + self.container.scrollTop + 'px';

					self.container.insertBefore(preview_canvas, self.peg);
					self.container.style.overflow = 'hidden';

					// set flag for user capture (use preview)
					self.preview_active = true;
				}, preview_canvas);
			},

			unfreeze: function unfreeze() {
				// cancel preview and resume live video feed
				if (this.preview_active) {
					// remove preview canvas
					this.container.removeChild(this.preview_canvas);
					delete this.preview_context;
					delete this.preview_canvas;

					// unflag
					this.preview_active = false;

					// re-flip if we unflipped before
					this.flip();
				}
			},

			flip: function flip() {
				// flip container horiz (mirror mode) if desired
				if (this.params.flip_horiz) {
					var sty = this.container.style;
					sty.webkitTransform = 'scaleX(-1)';
					sty.mozTransform = 'scaleX(-1)';
					sty.msTransform = 'scaleX(-1)';
					sty.oTransform = 'scaleX(-1)';
					sty.transform = 'scaleX(-1)';
					sty.filter = 'FlipH';
					sty.msFilter = 'FlipH';
				}
			},

			unflip: function unflip() {
				// unflip container horiz (mirror mode) if desired
				if (this.params.flip_horiz) {
					var sty = this.container.style;
					sty.webkitTransform = 'scaleX(1)';
					sty.mozTransform = 'scaleX(1)';
					sty.msTransform = 'scaleX(1)';
					sty.oTransform = 'scaleX(1)';
					sty.transform = 'scaleX(1)';
					sty.filter = '';
					sty.msFilter = '';
				}
			},

			savePreview: function savePreview(user_callback, user_canvas) {
				// save preview freeze and fire user callback
				var params = this.params;
				var canvas = this.preview_canvas;
				var context = this.preview_context;

				// render to user canvas if desired
				if (user_canvas) {
					var user_context = user_canvas.getContext('2d');
					user_context.drawImage(canvas, 0, 0);
				}

				// fire user callback if desired
				user_callback(user_canvas ? null : canvas.toDataURL('image/' + params.image_format, params.jpeg_quality / 100), canvas, context);

				// remove preview
				if (this.params.unfreeze_snap) this.unfreeze();
			},

			snap: function snap(user_callback, user_canvas) {
				// take snapshot and return image data uri
				var self = this;
				var params = this.params;

				if (!this.loaded) return this.dispatch('error', new WebcamError("Webcam may be laggy"));
				// if (!this.live) return this.dispatch('error', new WebcamError("Webcam is not live yet"));
				if (!user_callback) return this.dispatch('error', new WebcamError("Please provide a callback function or canvas to snap()"));

				// if we have an active preview freeze, use that
				if (this.preview_active) {
					this.savePreview(user_callback, user_canvas);
					return null;
				}

				// create offscreen canvas element to hold pixels
				var canvas = document.createElement('canvas');
				canvas.width = this.params.dest_width;
				canvas.height = this.params.dest_height;
				var context = canvas.getContext('2d');

				// flip canvas horizontally if desired
				if (this.params.flip_horiz) {
					context.translate(params.dest_width, 0);
					context.scale(-1, 1);
				}

				// create inline function, called after image load (flash) or immediately (native)
				var func = function func() {
					// render image if needed (flash)
					if (this.src && this.width && this.height) {
						context.drawImage(this, 0, 0, params.dest_width, params.dest_height);
					}

					// crop if desired
					if (params.crop_width && params.crop_height) {
						var crop_canvas = document.createElement('canvas');
						crop_canvas.width = params.crop_width;
						crop_canvas.height = params.crop_height;
						var crop_context = crop_canvas.getContext('2d');

						crop_context.drawImage(canvas, Math.floor(params.dest_width / 2 - params.crop_width / 2), Math.floor(params.dest_height / 2 - params.crop_height / 2), params.crop_width, params.crop_height, 0, 0, params.crop_width, params.crop_height);

						// swap canvases
						context = crop_context;
						canvas = crop_canvas;
					}

					// render to user canvas if desired
					if (user_canvas) {
						var user_context = user_canvas.getContext('2d');
						user_context.drawImage(canvas, 0, 0);
					}

					// fire user callback if desired
					user_callback(user_canvas ? null : canvas.toDataURL('image/' + params.image_format, params.jpeg_quality / 100), canvas, context);
				};

				// grab image frame from userMedia or flash movie
				if (this.userMedia) {
					// native implementation
					context.drawImage(this.video, 0, 0, this.params.dest_width, this.params.dest_height);

					// fire callback right away
					func();
				} else {
					// flash fallback
					var raw_data = this.getMovie()._snap();

					// render to image, fire callback when complete
					var img = new Image();
					img.onload = func;
					img.src = 'data:image/' + this.params.image_format + ';base64,' + raw_data;
				}

				return null;
			},

			configure: function configure(panel) {
				// open flash configuration panel -- specify tab name:
				// "camera", "privacy", "default", "localStorage", "microphone", "settingsManager"
				if (!panel) panel = "camera";
				this.getMovie()._configure(panel);
			},

			flashNotify: function flashNotify(type, msg) {
				// receive notification from flash about event
				switch (type) {
					case 'flashLoadComplete':
						// movie loaded successfully
						this.loaded = true;
						this.dispatch('load');
						break;

					case 'cameraLive':
						// camera is live and ready to snap
						this.live = true;
						this.dispatch('live');
						break;

					case 'error':
						// Flash error
						this.dispatch('error', new FlashError(msg));
						break;

					default:
						// catch-all event, just in case
						// console.log("webcam flash_notify: " + type + ": " + msg);
						break;
				}
			},

			b64ToUint6: function b64ToUint6(nChr) {
				// convert base64 encoded character to 6-bit integer
				// from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
				return nChr > 64 && nChr < 91 ? nChr - 65 : nChr > 96 && nChr < 123 ? nChr - 71 : nChr > 47 && nChr < 58 ? nChr + 4 : nChr === 43 ? 62 : nChr === 47 ? 63 : 0;
			},

			base64DecToArr: function base64DecToArr(sBase64, nBlocksSize) {
				// convert base64 encoded string to Uintarray
				// from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
				var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""),
				    nInLen = sB64Enc.length,
				    nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2,
				    taBytes = new Uint8Array(nOutLen);

				for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
					nMod4 = nInIdx & 3;
					nUint24 |= this.b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
					if (nMod4 === 3 || nInLen - nInIdx === 1) {
						for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
							taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
						}
						nUint24 = 0;
					}
				}
				return taBytes;
			},

			upload: function upload(image_data_uri, target_url, callback) {
				// submit image data to server using binary AJAX
				var form_elem_name = this.params.upload_name || 'webcam';

				// detect image format from within image_data_uri
				var image_fmt = '';
				if (image_data_uri.match(/^data\:image\/(\w+)/)) image_fmt = RegExp.$1;else throw "Cannot locate image format in Data URI";

				// extract raw base64 data from Data URI
				var raw_image_data = image_data_uri.replace(/^data\:image\/\w+\;base64\,/, '');

				// contruct use AJAX object
				var http = new XMLHttpRequest();
				http.open("POST", target_url, true);

				// setup progress events
				if (http.upload && http.upload.addEventListener) {
					http.upload.addEventListener('progress', function (e) {
						if (e.lengthComputable) {
							var progress = e.loaded / e.total;
							Webcam.dispatch('uploadProgress', progress, e);
						}
					}, false);
				}

				// completion handler
				var self = this;
				http.onload = function () {
					if (callback) callback.apply(self, [http.status, http.responseText, http.statusText]);
					Webcam.dispatch('uploadComplete', http.status, http.responseText, http.statusText);
				};

				// create a blob and decode our base64 to binary
				var blob = new Blob([this.base64DecToArr(raw_image_data)], { type: 'image/' + image_fmt });

				// stuff into a form, so servers can easily receive it as a standard file upload
				var form = new FormData();
				form.append(form_elem_name, blob, form_elem_name + "." + image_fmt.replace(/e/, ''));

				// send data to server
				http.send(form);
			}

		};

		Webcam.init();

		if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return Webcam;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports) {
			module.exports = Webcam;
		} else {
			window.Webcam = Webcam;
		}
	})(window);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _pubsub = __webpack_require__(3);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*************** </> Imports ******************/

	var $dropzoneWrapper = $(".dropzone-wrapper");

	function dropzoneAlert(message) {
		var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
		var waitForResponse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		var $dropzoneMessage = $(".dropzone__message");
		$dropzoneMessage.text(message).addClass("display-alert").attr("data-status", status);

		//fade message out (unless told waiting for something)
		if (!waitForResponse) {
			setTimeout(function () {
				$dropzoneMessage.removeClass("display-alert");
			}, 3800);
		}
	}

	$dropzoneWrapper.click(function () {
		$("#fileInput").trigger("click");
	});

	_pubsub2.default.on("drag", function () {
		$dropzoneWrapper.addClass("is-dragging");
	}).on("dragend", function () {
		$dropzoneWrapper.removeClass("is-dragging");
	}).on("gcardSet", function () {
		$dropzoneWrapper.addClass("is-compressed");
	});

	//dropzone maximises on click and re-minimizes on body click
	$(".dropzone__message-wrapper").click(function (e) {
		e.stopPropagation();
		$dropzoneWrapper.removeClass("is-compressed");
	});

	//after image is already loaded 
	_pubsub2.default.on("gcardSet", function () {
		$("body").on("click", function () {
			$dropzoneWrapper.addClass("is-compressed");
		});
		//on reset
	}).on("resetOver", function () {
		$dropzoneWrapper.removeClass("is-compressed");
		dropzoneAlert("Send another?");
	});

	/*************** Drag and Drop listeners *****************/
	$("body").on("drag dragstart dragend dragover dragenter dragleave drop", function (e) {
		//prevent default browser file drop behaviour
		e.preventDefault();
		e.stopPropagation();
	}).on("dragover dragenter", function () {
		_pubsub2.default.trigger("drag");
	}).on("dragleave dragend drop", function () {
		_pubsub2.default.trigger("dragend");
	});

	exports.default = dropzoneAlert;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	//Any data which may be changed in later versions

	var MAX_FILESIZE = exports.MAX_FILESIZE = 12; //in MBs

	var POSTCARD = exports.POSTCARD = {
	    long: 690,
	    short: 460
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _pubsub = __webpack_require__(3);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _dropzoneUi = __webpack_require__(7);

	var _dropzoneUi2 = _interopRequireDefault(_dropzoneUi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*************** </> Imports ******************/

	var sending = false;

	$(".email-form").submit(function (e) {
		e.preventDefault();
		//prevent duplicate requests
		if (sending) return false;

		(0, _dropzoneUi2.default)("Sending...", null, true);

		sending = true;

		var url = $(this).attr("action"),
		    image = $(".gcard-image").attr("src"),
		    data = $(this).serialize() + "&image=" + image;

		$.ajax({
			type: "POST",
			url: url,
			data: data
		}).done(function (response) {
			response = JSON.parse(response);
			(0, _dropzoneUi2.default)(response.message, response.status);
			_pubsub2.default.trigger("reset");

			setTimeout(function () {
				sending = false;
				_pubsub2.default.trigger("resetOver");
			}, 4600);
		}).fail(function (response) {
			sending = false;
			(0, _dropzoneUi2.default)("Something went wrong. Your message could not be sent.", "error");
		});
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _pubsub = __webpack_require__(3);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _dropzoneUi = __webpack_require__(7);

	var _dropzoneUi2 = _interopRequireDefault(_dropzoneUi);

	var _data = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*************** </> Imports ******************/

	var $gcardImage = $(".gcard-image");

	function uploadFile(files) {
		var photoFile = files[0],
		    reader = new FileReader();

		//VALIDATE
		//File Type
		if (!photoFile || !photoFile.type.match("image.*")) {
			(0, _dropzoneUi2.default)("Oops, I can't seem to read this. Make sure you're uploading an image file.", "error");
			return;
		}
		//Max File Size
		if (photoFile.size > _data.MAX_FILESIZE * 1024 * 1024) {
			(0, _dropzoneUi2.default)("Sorry, your photo is too large (max: " + _data.MAX_FILESIZE + " MBs)", "error");
			return;
		}

		//LOADING SCREEN
		reader.onloadstart = function () {
			(0, _dropzoneUi2.default)("Loading...", null, true);
		};
		reader.onloadend = function () {
			(0, _dropzoneUi2.default)(""); //clear
		};

		//ERROR HANDLING
		//Failed upload
		reader.onerror = function () {
			(0, _dropzoneUi2.default)("Something went wrong. Please try reuploading your phot Sorry about that.", "error");
		};

		//successful upload
		reader.onload = function (e) {
			$gcardImage
			//set giftcard image
			.attr("src", e.target.result)
			//error if "image" file has bad data code
			.on("error", function () {
				(0, _dropzoneUi2.default)("Sorry, I can't understand this image file.", "error");
			})
			//SUCCESS
			//wait till image is loaded
			.on("load", function () {
				_pubsub2.default.trigger("gcardSet", $gcardImage[0]);
			});
		};

		//UPLOAD FILE
		reader.readAsDataURL(photoFile);
	}

	_pubsub2.default.on("fileUpload", uploadFile);

	/*************** File Upload listeners *****************/
	$("body").on("drop", function (e) {
		var files = e.originalEvent.dataTransfer.files;
		_pubsub2.default.trigger("fileUpload", files);
	});

	$("#fileInput").change(function (e) {
		var files = e.target.files;
		_pubsub2.default.trigger("fileUpload", files);
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _pubsub = __webpack_require__(3);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _canvasOrientation = __webpack_require__(12);

	var _canvasOrientation2 = _interopRequireDefault(_canvasOrientation);

	var _paintCanvas = __webpack_require__(13);

	var _paintCanvas2 = _interopRequireDefault(_paintCanvas);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*************** </> Imports ******************/

	function renderCanvas(img, switchStyle) {
		(0, _canvasOrientation2.default)(img); //set canvas orientation

		var header = $(".gcard__header").val(),
		    message = $(".gcard__message").val();

		var canvas = $("#gcard")[0],

		//initialize canvas
		ctx = canvas.getContext("2d"),
		    canvasOrientation = canvas.dataset.orientation;

		//SIMULATE "COVER" ABILITY FOR CANVAS
		var dx = void 0,
		    dy = void 0,
		    dWidth = void 0,
		    dHeight = void 0,
		    shape = void 0,
		    scale = void 0;
		if (canvasOrientation === "pillarbox") {
			shape = img.height / img.width; //shape on img
			scale = canvas.width / img.width; //upscaling needed

			dx = 0;
			dy = canvas.height * 0.5 - img.height * 0.5 * scale; //center h-image (with respect to scaling)
			dWidth = canvas.width; //full width if pillarbox
			dHeight = canvas.width * shape;
		} else {
			shape = img.width / img.height; //shape on img
			scale = canvas.height / img.height; //upscaling needed

			dx = canvas.width * 0.5 - img.width * 0.5 * scale; //center v-image (with respect to scaling)
			dy = 0;
			dWidth = canvas.height * shape;
			dHeight = canvas.height; //full height if letterbox
		}

		ctx.drawImage(img, dx, dy, dWidth, dHeight);

		(0, _paintCanvas2.default)(header, message, switchStyle); //paint text (or defaults) onto canvas
	}

	/*************** Render Canvas events *****************/

	_pubsub2.default.on("gcardSet", function (img) {
		renderCanvas(img);
	});

	$(".gcard__header, .gcard__message").on("input", function () {
		var img = $(".gcard-image")[0]; //keep current image
		renderCanvas(img);
	});

	$(".design__button").on("click", function () {
		var img = $(".gcard-image")[0]; //keep current image
		renderCanvas(img, true);
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = setCanvasOrientation;

	var _data = __webpack_require__(8);

	/*************** </> Imports ******************/

	var canvasData = {};

	//Get canvas orientation
	var long = _data.POSTCARD.long,
	    short = _data.POSTCARD.short;

	//ratio representing orientation mode
	var landscape = long / short,
	    portrait = 1 / landscape;

	//ratio breakpoint between page orientations
	var breakpoint = (landscape + portrait) / 2;

	function setCanvasOrientation(img) {
		//ratio of chosen photo
		var imgShape = img.width / img.height;

		//set photo data
		if (imgShape > landscape) {
			canvasData = {
				width: long,
				height: short,
				orientation: "letterbox"
			};
		} else if (imgShape > breakpoint) {
			canvasData = {
				width: long,
				height: short,
				orientation: "pillarbox"
			};
		} else if (imgShape > portrait) {
			canvasData = {
				width: short,
				height: long,
				orientation: "letterbox"
			};
		} else {
			canvasData = {
				width: short,
				height: long,
				orientation: "pillarbox"
			};
		}

		//Set canvas attributes
		$("#gcard").attr({
			"width": canvasData.width,
			"height": canvasData.height,
			"data-orientation": canvasData.orientation
		});
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = paintCanvas;

	var _canvasTextWrapper = __webpack_require__(14);

	var _canvasTextWrapper2 = _interopRequireDefault(_canvasTextWrapper);

	var _canvasTemplate2 = __webpack_require__(15);

	var _canvasTemplate3 = _interopRequireDefault(_canvasTemplate2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*************** </> Imports ******************/

	function paintCanvas(header, message, style) {
		//Dev note: Do not set these as default parameters to avoid ignoring empty strings
		header = header || "Congratulations!";
		//soft-hyphen(­) to "fix" ignored new-line issue on some browsers
		message = message.replace(/\n{2,}/g, "\n ­ \n") || "Sending warm wishes on this festive occassion.";
		message += " ­";

		var canvas = $("#gcard")[0],

		//initialize canvas
		ctx = canvas.getContext("2d");

		var _canvasTemplate = (0, _canvasTemplate3.default)(style);

		var hOptions = _canvasTemplate.hOptions;
		var mOptions = _canvasTemplate.mOptions;

		//set :inputs to template font

		$(".gcard__header").css({
			font: hOptions.font,
			fontSize: "1em" //override font-size
		});
		$(".gcard__message").css({
			font: mOptions.font,
			fontSize: "1em" //override font-size
		});

		//paint text onto canvas
		(0, _canvasTextWrapper2.default)(canvas, header, hOptions);
		(0, _canvasTextWrapper2.default)(canvas, message, mOptions);
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	(function (root) {

		function CanvasTextWrapper(canvas, text, options) {
			'use strict';

			var defaults = {
				font: '18px Arial, sans-serif',
				color: '#0B0B0B',
				shadow: '#0B0B0B',
				shadowOffsetX: 3,
				shadowOffsetY: 3,
				shadowBlur: 3,
				sizeToFill: false,
				maxFontSizeToFill: false,
				lineHeight: 1,
				allowNewLine: true,
				lineBreak: 'auto',
				textAlign: 'left',
				verticalAlign: 'top',
				justifyLines: false,
				paddingX: 20,
				paddingY: 20,
				fitParent: false,
				strokeText: false,
				renderHDPI: false,
				textDecoration: 'none'
			};

			var opts = {};

			for (var key in defaults) {
				opts[key] = options.hasOwnProperty(key) ? options[key] : defaults[key];
			}

			var context = canvas.getContext('2d');
			context.font = opts.font;
			context.textBaseline = 'bottom';
			context.fillStyle = opts.color;

			context.shadowColor = opts.shadow;
			context.shadowOffsetX = opts.shadowOffsetX;
			context.shadowOffsetY = opts.shadowOffsetY;
			context.shadowBlur = opts.shadowBlur;

			var scale = 1;
			var devicePixelRatio = typeof global !== 'undefined' ? global.devicePixelRatio : root.devicePixelRatio;

			if (opts.renderHDPI && devicePixelRatio > 1) {
				var tempCtx = {};

				// store context settings in a temp object before scaling otherwise they will be lost
				for (var key in context) {
					tempCtx[key] = context[key];
				}

				var canvasWidth = canvas.width;
				var canvasHeight = canvas.height;
				scale = devicePixelRatio;

				canvas.width = canvasWidth * scale;
				canvas.height = canvasHeight * scale;
				canvas.style.width = canvasWidth * scale * 0.5 + 'px';
				canvas.style.height = canvasHeight * scale * 0.5 + 'px';

				// restore context settings
				for (var key in tempCtx) {
					try {
						context[key] = tempCtx[key];
					} catch (e) {}
				}

				context.scale(scale, scale);
			}

			var EL_WIDTH = (!opts.fitParent ? canvas.width : canvas.parentNode.clientWidth) / scale;
			var EL_HEIGHT = (!opts.fitParent ? canvas.height : canvas.parentNode.clientHeight) / scale;
			var MAX_TXT_WIDTH = EL_WIDTH - opts.paddingX * 2;
			var MAX_TXT_HEIGHT = EL_HEIGHT - opts.paddingY * 2;

			var fontSize = opts.font.match(/\d+(px|em|%)/g) ? +opts.font.match(/\d+(px|em|%)/g)[0].match(/\d+/g) : 18;
			var textBlockHeight = 0;
			var lines = [];
			var newLineIndexes = [];
			var textPos = { x: 0, y: 0 };
			var lineHeight = 0;
			var fontParts;

			setFont(fontSize);
			setLineHeight();
			validate();
			render();

			function setFont(fontSize) {
				if (!fontParts) fontParts = !opts.sizeToFill ? opts.font.split(/\b\d+px\b/i) : context.font.split(/\b\d+px\b/i);
				context.font = fontParts[0] + fontSize + 'px' + fontParts[1];
			}

			function setLineHeight() {
				if (!isNaN(opts.lineHeight)) {
					lineHeight = fontSize * opts.lineHeight;
				} else if (opts.lineHeight.toString().indexOf('px') !== -1) {
					lineHeight = parseInt(opts.lineHeight);
				} else if (opts.lineHeight.toString().indexOf('%') !== -1) {
					lineHeight = parseInt(opts.lineHeight) / 100 * fontSize;
				}
			}

			function render() {
				if (opts.sizeToFill) {
					var wordsCount = text.trim().split(/\s+/).length;
					var newFontSize = 0;
					var fontSizeHasLimit = opts.maxFontSizeToFill !== false;

					do {
						if (fontSizeHasLimit) {
							if (++newFontSize <= opts.maxFontSizeToFill) {
								adjustFontSize(newFontSize);
							} else {
								break;
							}
						} else {
							adjustFontSize(++newFontSize);
						}
					} while (textBlockHeight < MAX_TXT_HEIGHT && lines.join(' ').split(/\s+/).length == wordsCount);

					adjustFontSize(--newFontSize);
				} else {
					wrap();
				}

				if (opts.justifyLines && opts.lineBreak === 'auto') {
					justify();
				}

				setVertAlign();
				setHorizAlign();
				drawText();
			}

			function adjustFontSize(size) {
				setFont(size);
				lineHeight = size;
				wrap();
			}

			function wrap() {
				if (opts.allowNewLine) {
					var newLines = text.trim().split('\n');
					for (var i = 0, idx = 0; i < newLines.length - 1; i++) {
						idx += newLines[i].trim().split(/\s+/).length;
						newLineIndexes.push(idx);
					}
				}

				var words = text.trim().split(/\s+/);
				checkLength(words);
				breakText(words);

				textBlockHeight = lines.length * lineHeight;
			}

			function checkLength(words) {
				var testString, tokenLen, sliced, leftover;

				words.forEach(function (word, index) {
					testString = '';
					tokenLen = context.measureText(word).width;

					if (tokenLen > MAX_TXT_WIDTH) {
						for (var k = 0; context.measureText(testString + word[k]).width <= MAX_TXT_WIDTH && k < word.length; k++) {
							testString += word[k];
						}

						sliced = word.slice(0, k);
						leftover = word.slice(k);
						words.splice(index, 1, sliced, leftover);
					}
				});
			}

			function breakText(words) {
				lines = [];
				for (var i = 0, j = 0; i < words.length; j++) {
					lines[j] = '';

					if (opts.lineBreak === 'auto') {
						if (context.measureText(lines[j] + words[i]).width > MAX_TXT_WIDTH) {
							break;
						} else {
							while (context.measureText(lines[j] + words[i]).width <= MAX_TXT_WIDTH && i < words.length) {

								lines[j] += words[i] + ' ';
								i++;

								if (opts.allowNewLine) {
									for (var k = 0; k < newLineIndexes.length; k++) {
										if (newLineIndexes[k] === i) {
											j++;
											lines[j] = '';
											break;
										}
									}
								}
							}
						}
						lines[j] = lines[j].trim();
					} else {
						lines[j] = words[i];
						i++;
					}
				}
			}

			function justify() {
				var maxLen, longestLineIndex, tokenLen;
				for (var i = 0; i < lines.length; i++) {
					tokenLen = context.measureText(lines[i]).width;

					if (!maxLen || tokenLen > maxLen) {
						maxLen = tokenLen;
						longestLineIndex = i;
					}
				}

				// fill lines with extra spaces
				var numWords, spaceLength, numOfSpaces, num, filler;
				var delimiter = '\u200A';
				for (i = 0; i < lines.length; i++) {
					if (i === longestLineIndex) continue;

					numWords = lines[i].trim().split(/\s+/).length;
					if (numWords <= 1) continue;

					lines[i] = lines[i].trim().split(/\s+/).join(delimiter);

					spaceLength = context.measureText(delimiter).width;
					numOfSpaces = (maxLen - context.measureText(lines[i]).width) / spaceLength;
					num = numOfSpaces / (numWords - 1);

					filler = '';
					for (var j = 0; j < num; j++) {
						filler += delimiter;
					}

					lines[i] = lines[i].trim().split(delimiter).join(filler);
				}
			}

			function underline(text, x, y) {
				var width = context.measureText(text).width;

				switch (context.textAlign) {
					case 'center':
						x -= width / 2;
						break;
					case 'right':
						x -= width;
						break;
				}

				context.beginPath();
				context.moveTo(x, y);
				context.lineTo(x + width, y);
				context.stroke();
			}

			function drawText() {
				for (var i = 0; i < lines.length; i++) {
					textPos.y = parseInt(textPos.y) + lineHeight;
					context.fillText(lines[i], textPos.x, textPos.y);

					if (opts.strokeText) {
						context.strokeText(lines[i], textPos.x, textPos.y);
					}

					if (opts.textDecoration.toLocaleLowerCase() === 'underline') {
						underline(lines[i], textPos.x, textPos.y);
					}
				}
			}

			function setHorizAlign() {
				context.textAlign = opts.textAlign;

				if (opts.textAlign == 'center') {
					textPos.x = EL_WIDTH / 2;
				} else if (opts.textAlign == 'right') {
					textPos.x = EL_WIDTH - opts.paddingX;
				} else {
					textPos.x = opts.paddingX;
				}
			}

			function setVertAlign() {
				if (opts.verticalAlign == 'middle') {
					textPos.y = (EL_HEIGHT - textBlockHeight) / 2;
				} else if (opts.verticalAlign == 'bottom') {
					textPos.y = EL_HEIGHT - textBlockHeight - opts.paddingY;
				} else {
					textPos.y = opts.paddingY;
				}
			}

			function validate() {
				if (typeof text !== 'string') throw new TypeError('The second parameter must be a String.');

				if (isNaN(fontSize)) throw new TypeError('Cannot parse "font".');

				if (isNaN(lineHeight)) throw new TypeError('Cannot parse "lineHeight".');

				if (opts.textAlign.toLocaleLowerCase() !== 'left' && opts.textAlign.toLocaleLowerCase() !== 'center' && opts.textAlign.toLocaleLowerCase() !== 'right') throw new TypeError('Property "textAlign" must be set to either "left", "center", or "right".');

				if (opts.verticalAlign.toLocaleLowerCase() !== 'top' && opts.verticalAlign.toLocaleLowerCase() !== 'middle' && opts.verticalAlign.toLocaleLowerCase() !== 'bottom') throw new TypeError('Property "verticalAlign" must be set to either "top", "middle", or "bottom".');

				if (typeof opts.justifyLines !== 'boolean') throw new TypeError('Property "justifyLines" must be a Boolean.');

				if (isNaN(opts.paddingX)) throw new TypeError('Property "paddingX" must be a Number.');

				if (isNaN(opts.paddingY)) throw new TypeError('Property "paddingY" must be a Number.');

				if (typeof opts.fitParent !== 'boolean') throw new TypeError('Property "fitParent" must be a Boolean.');

				if (opts.lineBreak.toLocaleLowerCase() !== 'auto' && opts.lineBreak.toLocaleLowerCase() !== 'word') throw new TypeError('Property "lineBreak" must be set to either "auto" or "word".');

				if (typeof opts.sizeToFill !== 'boolean') throw new TypeError('Property "sizeToFill" must be a Boolean.');

				if (typeof opts.strokeText !== 'boolean') throw new TypeError('Property "strokeText" must be a Boolean.');

				if (typeof opts.renderHDPI !== 'boolean') throw new TypeError('Property "renderHDPI" must be a Boolean.');

				if (opts.textDecoration.toLocaleLowerCase() !== 'none' && opts.textDecoration.toLocaleLowerCase() !== 'underline') throw new TypeError('Property "textDecoration" must be set to either "none" or "underline".');
			}
		}
		module.exports = CanvasTextWrapper;
	})(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = canvasTemplate;
	//default style options for header & message
	var defHOptions = {
		lineHeight: 0.85,
		shadow: "black",
		shadowOffsetX: 5,
		shadowOffsetY: 5,
		shadowBlur: 1,
		verticalAlign: "middle",
		textAlign: "center",
		sizeToFill: true,
		maxFontSizeToFill: 100
	};

	var defMOptions = {
		verticalAlign: "bottom",
		textAlign: "center"
	};

	var hOptions = void 0,
	    mOptions = void 0,
	    //set canvas options (for one or both)
	style = 0;

	var TEMPLATE_COUNT = 2;

	function canvasTemplate(switchStyle) {
		//boolean called to cycle template
		if (switchStyle) {
			style++;
			style = style % TEMPLATE_COUNT;
		}
		//canvas style templates
		switch (style) {
			case 0:
				hOptions = {
					font: "120px 'Lobster Two', cursive",
					color: "#EAB100"
				};
				mOptions = {
					font: "30px 'Homemade Apple', sans-serif",
					color: "#FCFCFC"
				};
				break;

			case 1:
				hOptions = {
					font: "100px 'Berkshire Swash', cursive",
					color: "#FF5733",
					textAlign: "left",
					verticalAlign: "top"
				};
				mOptions = {
					font: "30px 'Lato', sans-serif",
					color: "#FCFCFC",
					textAlign: "right"
				};
				break;
		}

		//merge canvas options
		return {
			hOptions: Object.assign({}, defHOptions, hOptions),
			mOptions: Object.assign({}, defMOptions, mOptions)
		};
	}

/***/ }
/******/ ]);