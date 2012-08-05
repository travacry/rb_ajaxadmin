/*
	 var mw = $('.mywidget').myWidget({greeting: 'Hi there!'})
	 console.log(mw.myWidget('option', 'greeting')); // 'Hi there!'
	 mw.myWidget('option', 'greeting', 'O HAI CAN I HAZ CHEEZBURGER?');
 */
(function($) {
	$.widget("my.myWidget", {
		options: {
			greetings: "Hello"
		},
		_create: function() {
			this._render();
		},
		_render: function() {
			this.element.html(this.options.greetings);
		},
		setOption: function(key, value) {
			if (value != undefined) {
				this.options[key] = value;
				this._render();
				return this;
			}
			else {
				return this.options[key];
			}
		}
	})

})(JQuery);

var mw = $('.mywidget').myWidget({greeting: 'Hi there!'})
console.log(mw.myWidget('option', 'greeting')); // 'Hi there!'
mw.myWidget('option', 'greeting', 'O HAI CAN I HAZ CHEEZBURGER?');