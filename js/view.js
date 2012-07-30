function View(){
	var html = "";
	var self = this;
	self.count_list = {};
	self.count_canvas = 0;

	self.manager_widgetEl = function(id, type, text, list){
		switch(type){
			case "head":
				//save_
				//help_
				html =	'<div class="title">&nbsp&nbsp&nbsp' + text + ':';
				html += '<input id="' + 'save_' + id + '" type="button" value="Сохранить" style="float: right;"></input>';
				html += '<input id="' + 'help_' + id + '" type="button" value="&nbsp?&nbsp" style="float: right;"></input>';
				html += '</div>';
				return html;
				break;

			//manager_widgetEl(id, "select", "right", list)
			//manager_widgetEl(id, "select", "left", list)
			case "select":
				html = "";
				if (typeof(list) == "object"){
					for(var next in list){
						html += '<option>' + list[next] + '</option>';
					}
				} else {
					html = '<option>' + list + '</option>';
				}
				return html;
				break;
			case "input_mid":
				html += '<div class="canvas_mid"></div>';
				break;

			//manager_widgetEl(id, "input", "right", val)
			case "input":
				html = list;
				break;

			//manager_widgetEl(id, "textarea", "right", val)
			case "textarea":
				html = list;
				break;
		}
	}

	self.manager_el = function(id, type, text, id_address, id_company){

		if(typeof(self.count_list["" + id]) == "undefined")
			self.count_list["" + id] = 0;
		else
			++self.count_list["" + id];

		var html = "";

		switch(type){
			case "li":
				return "<li><a id='" + id + "_" + self.count_list["" + id] + "' href='#'>" + text + "</a></li>";
				break;
			case "logo":
				return '<img src="../images/loading.gif" alt="Логотип" id="logo" width="100px" class="passe-partout">';
				break;
			case "foto":
				return '<img src="../images/loading.gif" alt="Фото" id="foto" class="passe-partout">';
				break;
			case "logo_req":
				return '<img src="' + text + '" alt="Логотип" id="logo" class="passe-partout">';
				break;
			case "foto_req":
				return '<img src="' + text + '" alt="Фото" id="foto" class="passe-partout">';
				break;
		}
	}
}