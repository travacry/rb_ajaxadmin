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
			defColor:"white", //���� �������� ��� ������� ��� �������
			hoverColor:"red" //���� �������� �� ������� ������� ������
		}, options);

		var make = function(){
			// ����� ���������� this ����� ��������� ���������
			// DOM-�������, � �������� � ����� ����� ���������
			// ����������� �������
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

		// ������ ������ ������
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( '����� ' +  method + ' �� ���������� � jQuery.tooltip' );
		}
	};

})( jQuery );

 $('div').tooltip(); // ����� ������ init
 $('div').tooltip({  // ����� ������ init
 foo : 'bar'
 });
 $('div').tooltip('hide'); // ����� ������ hide
 $('div').tooltip('update', '��� ����� ������� �������!');  //  ����� ������ update

*/


(function( $ ){

	var methods = {
		init : function( options ) {

			options = $.extend({
				defColor:"grey", //���� �������� ��� ������� ��� �������
				hoverColor:"red" //���� �������� �� ������� ������� ������
			}, options);

			return this.each(function(){
				var $this = $(this),
				data = $this.data('responsiveBlock');

				// ���� ������ ��� �� ��� ���������������
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
			$.error( '����� ' +  method + ' �� ���������� � jQuery.responsiveBlock' );
		}
	};

})( jQuery );

$(function(){
	$("#block").responsiveBlock();
})