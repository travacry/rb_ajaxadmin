$.widget("rb.app_menu", {
	options: {
		width: "170px",
		height: "561px"
	},

	_create: function() {

		var $this = $(this),    data = $this.data('app_menu');

		if (!data) {
			$(this).data('loader_jquery', {

			});

			console.log(this.options);
			var html = new EJS({url: 'templates/app_menu/app_menu.ejs'}).render({options: this.options});
			this.element.append(html);
		}


	},

	destroy: function() {

	},

	_setOption: function(key, value){

	}

});

$(function(){
	$("#app_menu").app_menu();
})