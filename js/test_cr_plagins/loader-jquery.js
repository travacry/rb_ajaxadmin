(function($){
	var methods = {
		init : function(options) {

			options = $.extend({
				select_class: ".right",
				width: "1061px",
				height: "500px",
				type: "percent",
				percent: 0,
				msg: ""
			}, options);

			return this.each(function(){
				var $this = $(this),    data = $this.data('loader_jquery');

				// Если плагин еще не был инициализирован
				if (!data) {
					$(this).data('loader_jquery', {
						percent:  options.percent,
						id_interval: 0,
						value: 0,
						msg: options.msg
					});


					var html = new EJS({url: 'templates/loading/loading.ejs'}).render({options: options});
					$(this).html(html);
					$(".progressbar").progressbar();

				}
			});
		},
		setMsg: function(msg) {
			if (typeof(msg) == "undefined"){
				var msg = $(this).data('loader_jquery').msg;
			}
			$(this).parent().find('.msg_loader').text(msg);
		},
		destroy : function() {
			$(this).empty();
		},
		addNextPosition: function(){

		},
		update : function(percent) {

			var self = $(this).data('loader_jquery');

			var current_percent =  $(this).data('loader_jquery').percent;

			if((percent > 0)&&(percent > current_percent)&&(current_percent >= 0)){
				if (current_percent != percent) clearInterval(self.id_interval);
				$(".progressbar").progressbar();
				self.id_interval = setInterval(function(){
					if (percent == self.value) clearInterval(self.id_interval);
					++self.value;
					$(".progressbar").progressbar({ value: self.value });
				} ,20)
			} else {
				$(".progressbar").progressbar({ value: 0 });
			}
		}
	};

	$.fn.loader_jquery = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод ' +  method + ' не существует в jQuery.responsiveBlock' );
		}
	};
})(jQuery);

$(function(){

    //$("#loader_jquery").loader_jquery();
	//$("#loader_jquery").loader_jquery({ type: "cyclic" });
	//$("#loader_jquery").loader_jquery("setMsg", "hi");
	//$("#loader_jquery").loader_jquery("update", 10);
	//$(".right").loader_jquery("update", 90);

})