/**
 * Created by JetBrains PhpStorm.
 * User: trio
 * Date: 04.08.12
 * Time: 15:53
 * To change this template use File | Settings | File Templates.
 *
 * Все jQuery UI плагины (плагины поведения и виджеты) реализованы с помощью одного удобного инструмента — фабрики виджетов jQuery UI. Она позволяет создавать гибкие, настраиваемые плагины, с едиными, интуитивно понятными api, включающими свойства, методы и события, связанные с работой плагина.
 * http://jquery.page2page.ru/index.php5/%D0%A4%D0%B0%D0%B1%D1%80%D0%B8%D0%BA%D0%B0_%D0%B2%D0%B8%D0%B4%D0%B6%D0%B5%D1%82%D0%BE%D0%B2_UI
 * _create, _init, destroy и _setOption
 *
 * <!DOCTYPE html>
 <html>
 <head>

 <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

 <script src="js/jquery_ui/development-bundle/jquery-1.7.2.js"></script>
 <script src="js/jquery_ui/development-bundle/ui/jquery-ui-1.8.22.custom.js"></script>
 <link type="text/css" href="js/jquery_ui/css/smoothness/jquery-ui-1.8.22.custom.css" rel="stylesheet" />
 <script src="js/test_cr_plagins/plagin-jqueryui.js"></script>
 <style>
 .ui-dialog-titlebar-hideshow{position:absolute; top:50%; right:27px;
 display:block; height:18px; width:19px; margin:-9px 0 0 0; padding:1px; color:#222;}
 .ui-dialog-titlebar-hideshow-hover{margin-top:-11px}
 .ui-dialog-titlebar .ui-state-hover .ui-icon-circle-triangle-s,
 .ui-dialog-titlebar .ui-state-hover .ui-icon-circle-triangle-n{margin:1px}
 </style>
 </head>
 <body>
 <body>
 <div id="wnd" title="Заголовок">Содержимое </div>

 <script>
 // установим плагин cDialog на элемент с id = wnd
 $("#wnd").cDialog();
 </script>

 </body>
 </html>
 */
// Зададим плагин cDialog, наследуемый от dialog
$.widget("my.cDialog", $.ui.dialog, {

	// настройки dialog автоматически перейдут cDialog,
	options: {
		resizable: false,
		isCollapsed: false,
		modal: false,
		height: 500,
		width: 400
	},

	// функция сворачивающая окно
	collapse: function(){
		// найдем элемент с кнопкой, открывающей/закрывающей окно
		var $clButt = this.element.siblings('.ui-widget-header').find('.ui-dialog-titlebar-hideshow');
		// проверим, не закрыто ли уже окно
		if(this.element.hasClass('ui-dialog-hideshow-close')) return;
		else this.element.addClass('ui-dialog-hideshow-close');
		// скроем содержимое и ручку растягивания окна (если она есть)
		this.element.hide().siblings('.ui-resizable-handle').hide();
		// изменим иконку закрытия окна на обратную
		$clButt.find('span').toggleClass('ui-icon-circle-triangle-s ui-icon-circle-triangle-n');
		this.isCollapsed = true;
	},

	// функция разворачивающая окно
	uncollapse: function(){
		// найдем элемент с кнопкой, открывающей/закрывающей окно
		var $clButt = this.element.siblings('.ui-widget-header').find('.ui-dialog-titlebar-hideshow');
		// проверим, не открыто ли уже окно
		if(!this.element.hasClass('ui-dialog-hideshow-close')) return;
		else this.element.removeClass('ui-dialog-hideshow-close');
		// откроем содержимое и ручку растягивания окна (если она есть)
		this.element.show().siblings('.ui-resizable-handle').show();
		// изменим иконку открытия окна на обратную
		$clButt.find('span').toggleClass('ui-icon-circle-triangle-s ui-icon-circle-triangle-n');
		this.isCollapsed = false;
	},

	// конструктор плагина.
	_create: function() {
		// вызовем в нем конструктор родительского плагина, который выполнит манипуляции с DOM
		// сделая из выбранного элемента диалоговое окно
		$.ui.dialog.prototype._create.call(this);

		// в уже созданное диалоговое окно добавим элемент с кнопкой сворачивания/разворачивания
		// и установим необходимые обработчики событий:

		// найдем элемент, оборачивающий все диалоговое окно
		var $o = this.element.parent();

		$('<a id="butt" class="ui-dialog-titlebar-hideshow ui-corner-all" href="#">'+
			'<span class="ui-icon ui-icon-circle-triangle-s"></span></a>')
			.mouseenter(function(){$(this).addClass('ui-state-hover ui-dialog-titlebar-hideshow-hover');})
			.mouseleave(function(){$(this).removeClass('ui-state-hover ui-dialog-titlebar-hideshow-hover');})
			.click(this, function(ev){
				if(!ev.data.element.hasClass('ui-dialog-hideshow-close'))
					ev.data.collapse();
				else
					ev.data.uncollapse();
				return false;
			})
			.insertAfter($o.find('.ui-dialog-title'));

		this.element.parent().find('.ui-widget-content').append('<div id="dialog" title="Basic dialog"></div>');
		this.element.parent().find('#dialog').datepicker();
		//this.element.parent().find('#dialog').onfocus();
		//this.element.parent().find('#dialog').onblur();

	},

	// деструктор плагина
	destroy: function() {
		// удалим из диалогового окна кнопку сворачивания/разворачивания
		this.element.parent().find('.ui-dialog-titlebar-hideshow').remove();

		//this.element.parent().find('#dialog').dialog('close');

		// вызовем в деструктор родительского плагина, который удалит
		// оставшиеся следы диалогового окна
		$.ui.dialog.prototype.destroy.call(this);
	},

	// обработка изменения свойств
	_setOption: function(key, value) {
		if(key == "isCollapsed"){
			if(value == true) this.collapse();
			else this.uncollapse();
		}

		// стандартная обработка
		$.ui.dialog.prototype._setOption.apply( this, arguments );
	}

});

$(function(){
	// установим плагин cDialog на элемент с id = wnd
	$("#wnd").cDialog();
});
