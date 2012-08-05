/**
 * Created by JetBrains PhpStorm.
 * User: trio
 * Date: 04.08.12
 * Time: 15:52
 * To change this template use File | Settings | File Templates.
 *
 * 	$('div').responsiveBlock();
 * 	$('div:last').responsiveBlock({defColor:"#bbbbbb"});
 * 	$('ul').responsiveBlock({defColor:"#aaaaaa", hoverColor:"green"});
 */
/*
(function($){
	jQuery.fn.responsiveBlock = function(options){
		options = $.extend({
			defColor:"white", //цвет элемента над которым нет курсора
			hoverColor:"red" //цвет элемента на который наведен курсор
		}, options);

		var make = function(){
			// здесь переменная this будет содержать отдельный
			// DOM-элемент, к которому и нужно будет применить
			// воздействия плагина
			$(this).css("background-color",options.defColor)
				.mouseenter( function(){
					$(this).css("background-color",options.hoverColor);
				})
				.mouseleave( function(){
					$(this).css("background-color",options.defColor);
				});
		};

		return this.each(make);
	};
})(jQuery);
*/
/*
(function( $ ){

	var methods = {
		init : function( options ) {
		},
		show : function( ) {
		},
		hide : function( ) {
		},
		update : function( content ) {
		}
	};

	$.fn.tooltip = function( method ) {

		// Логика вызова метода
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод ' +  method + ' не существует в jQuery.tooltip' );
		}
	};

})( jQuery );

 $('div').tooltip(); // вызов метода init
 $('div').tooltip({  // вызов метода init
 foo : 'bar'
 });
 $('div').tooltip('hide'); // вызов метода hide
 $('div').tooltip('update', 'Это новый контент тултипа!');  //  вызов метода update

*/


(function( $ ){

	var methods = {
		init : function( options ) {

			options = $.extend({
				defColor:"grey", //цвет элемента над которым нет курсора
				hoverColor:"red" //цвет элемента на который наведен курсор
			}, options);

			return this.each(function(){
				var $this = $(this),
				data = $this.data('responsiveBlock');

				// Если плагин еще не был инициализирован
				if ( ! data ) {
					$(this).data('responsiveBlock', {

					});

					$(this).css("background-color",options.defColor)
						.mouseenter( function(){
							$(this).css("background-color",options.hoverColor);
						})
						.mouseleave( function(){
							$(this).css("background-color",options.defColor);
					});
				}
			});
		},
		destroy : function( ) {

			return this.each(function(){
				var $this = $(this),
				data = $this.data('responsiveBlock');

				$(window).unbind('.responsiveBlock');
				data.responsiveBlock.remove();
				$this.removeData('responsiveBlock');
			})
		},
		reposition : function( ) { },
		show : function( ) { },
		hide : function( ) { },
		update : function( content ) { }
	};

	$.fn.responsiveBlock = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод ' +  method + ' не существует в jQuery.responsiveBlock' );
		}
	};

})( jQuery );

$(function(){
	$("#block").responsiveBlock();
})