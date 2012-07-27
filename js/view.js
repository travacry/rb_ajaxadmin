$(document).ready(function(){
	
	
	
	//обработка меню
	function Controller(){
		var self = this;
		
		//<id-ники
		self.slected_id_address;
		self.selected_id_company;
		//>
		
		self.view = new View();
		self.managerAjax = new manager_ajax();
		
		self.init = {};
		self.manager_el = {};
		self.count_list = {};
		
		self.init.menu = function(){
			//при обновлении , перебинд меню
			$(".menu").html("");
			var html = "";
			//view
			html += self.view.manager_el("menu","li", "Новости"); //id, type, text
			html += self.view.manager_el("menu","li", "Меню");
			html += self.view.manager_el("menu","li", "Информация");
			html += self.view.manager_el("menu","li", "Отзывы");
			html += self.view.manager_el("menu","li", "Интерьер");
			html += self.view.manager_el("menu","li", "Клиенты");
			html += self.view.manager_el("menu","li", "Настройки");
			html += self.view.manager_el("menu","li", "Фотоочеты");
			$(".menu").append(html);			
			//controller
			self.manager_el.click("menu", "a", "Новости", self.slected_id_address, self.selected_id_company);
			self.manager_el.click("menu", "a", "Меню");
			self.manager_el.click("menu", "a", "Информация", self.slected_id_address, self.selected_id_company);
			self.manager_el.click("menu", "a", "Отзывы");
			self.manager_el.click("menu", "a", "Интерьер");
			self.manager_el.click("menu", "a", "Клиенты");
			self.manager_el.click("menu", "a", "Настройки");
			self.manager_el.click("menu", "a", "Фотоочеты");
		}
		
		//limit после модификации api -> sid
		self.limit = 2;
		//список индификаторов адресов
		self.list_ids = [];
		//
		self.language = "ru";
		//
		
		
		self.init.base = function(){
			
			$("#logo").html(self.view.manager_el("base","logo"));		
			
			self.list_logo = new Array();
			self.list_foto;
			
			$.ajax({
				type: "POST",
				url: "http://api.restobank.com/api.php",
				data: { method: "company.get", limit: self.limit },
				dataType: "json",
				cache: false,
				success: function(data){
					$("#foto").html(self.view.manager_el("base","foto"));
					var list_id = {};
					
					for(next in data.response){
						var name_company = data.response[next].name[self.language];
						//список логотипов
						self.list_logo["" + name_company] = data.response[next].logo["114"];
						//список копманий
						$("#idCompany").append('<option>' + name_company + '</option>');
						//list id
						list_id[name_company] = data.response[next].id;
					}
					
					$("#idCompany").change(function(){
						var name_company = "";
						
						$("#idCompany option:selected").each(function () {
							name_company += $(this).text();
							self.selected_id_company = list_id[name_company];
							$("#logo").html(self.view.manager_el("base","logo_req", self.list_logo["" + name_company]));
							
						});
						self.loadAddress(self.selected_id_company);
						
					}).trigger('change');
					
					
				}
			})
		
		
			self.list_foto = new Array();
			
			
			self.list_address_id = {};
			self.list_address_name = {};
		
		
			$(".note_address").html("<br><br>");
			self.loadAddress = function(change_id){
				$("#foto").html(self.view.manager_el("base","foto"));
				$("#textAddress").html("");
				$.ajax({
				type: "POST",
				url: "http://api.restobank.com/api.php",
				data: { method: "address.get", company_ids: change_id },
				dataType: "json",
				cache: false,
				success: function(data){
					//save all
					self.address_get = data;
					for(next in data.response){
						//фото
						self.list_foto["" + next] = data.response[next].image[114];
						self.list_address_id["" + next] = data.response[next].id;
						self.list_address_name["" + next] = data.response[next].address.street[self.language];
						//адреса
						var name_address = data.response[next].address.street[self.language];
						$("#textAddress").append('<option>' + name_address + '</option>');
					}
					
					$("#textAddress").change(function(){
					
						var name_address = "";
						$(".note_address").html("<br>");
								
						$("#textAddress option:selected").each(function () {
							name_address = $(this).text();
							$(".note_address").append("" + name_address);
							var link_pic;
							for(next in self.list_address_name){
								if (self.list_address_name[next] == name_address){
									link_pic = self.list_foto[next];
									self.slected_id_address = self.list_address_id[next];
								}
							}
							$("#foto").html(self.view.manager_el("base", "foto_req", link_pic));
						})
						
					});
					$("#textAddress").trigger('change').trigger('update_page',[ self.slected_id_address, self.selected_id_company ]);
				}
				
			})
			
			}			

			self.list_address;
		}
		
		self.log = function(text){
			alert(text);
		}
		
		self.manager_el.click = function(id, type_selector, namePage , id_address, id_company){
			if(typeof(self.count_list["" + id]) == "undefined")
				self.count_list["" + id] = 0;
			else 
				++self.count_list["" + id];
					
			switch(type_selector){					
				case "a":
					$("a#" + id + "_" + self.count_list["" + id]).bind('click', function() { 
						//cbMethodBind(namePage);
						self.selectPage(namePage, id_address, id_company);
					});
				break;
			}
			
		}
		
		//pages
		self.selectPage = function(namePage){			
			switch(namePage){
				case "Новости":
					self.createPage.news();
					self.managerAjax.beginCreateModelPage("news");						
				break;
				case "Меню":
					self.createPage.menu();
					self.managerAjax.beginCreateModelPage("menu");				
				break;
				case "Информация":
					self.createPage.information();
					self.managerAjax.beginCreateModelPage("information", self.slected_id_address, self.selected_id_company);
				break;
				case "Отзывы":
					self.createPage.reviews();
					self.managerAjax.beginCreateModelPage("reviews");					
				break;
				case "Интерьер":
					self.createPage.interior();
					self.managerAjax.beginCreateModelPage("interior");									
				break;
				case "Клиенты":
					self.createPage.clients();
					self.managerAjax.beginCreateModelPage("clients");					
				break;
				case "Настройки":
					self.createPage.settings();
					self.managerAjax.beginCreateModelPage("settings");					
				break;
				case "Фотоочеты":
					self.createPage.photoreports();
					self.managerAjax.beginCreateModelPage("photoreports");					
				break;
			}
		}
		
		
		
		self.createPage = {};
		//без данных параметров нет
		
		//страница - новости
		self.createPage.news = function(){
			var html = new EJS({url: 'templates/news/news.ejs'}).render();
			$(".right").html(html);
		}
		
		//страница - меню
		self.createPage.menu = function(){
			var html = new EJS({url: 'templates/menu/menu.ejs'}).render();
			$(".right").html(html);			
		}
		//страница - информация о компании
		self.createPage.information = function(){
			var html = new EJS({url: 'templates/information/information.ejs'}).render();
			$(".right").html(html);
		}
		
		//страница - отзывы
		self.createPage.reviews = function(){
			var html = new EJS({url: 'templates/reviews/reviews.ejs'}).render();
			$(".right").html(html);		
		}
		
		//страница - интерьер
		self.createPage.interior = function(){
			var html = new EJS({url: 'templates/interior/interior.ejs'}).render();
			$(".right").html(html);				
		}
		
		//страница - клиенты
		self.createPage.clients = function(){
			var html = new EJS({url: 'templates/clients/clients.ejs'}).render();
			$(".right").html(html);			
		}
		
		//страница - настройки
		self.createPage.settings = function(){
			var html = new EJS({url: 'templates/settings/settings.ejs'}).render();
			$(".right").html(html);		
		}
		
		//страница - фотоотчеты
		self.createPage.photoreports = function(){
			var html = new EJS({url: 'templates/photoreports/photoreports.ejs'}).render();
			$(".right").html(html);		
		}
		
		
	}
	
	var controller = new Controller();
	controller.init.base();
	
	$("#textAddress").on("update_page", function(e, id_address, id_company){
		controller.init.menu();
	});
	
	$("#textAddress").on("update_info", function(e, namePage, ObjModelPage){
	
		switch(namePage){
			case "news":
			break;
			case "menu":
			break;
			case "information":
			console.log($("div:contains('Название')").html()); 
			/*
					for (nextElement in $("div.canvas_text")){
						if (nextElement.match(/^[-\+]?\d+/) === null){
						} else { 							
							var re = /[А-Яа-я]+/;
							var name = $("div.canvas_text").get(nextElement);
							name = $(name).html();


							switch(name.match(re)[0]){
								case "Язык":
									console.log("ObjModelPage");
									console.log(ObjModelPage.language.main);
									//$("div.canvas_text").get(nextElement).html("ObjModelPage.language.main");
								break;
								case "Название":
								break;
								case "Описание":
								break;
								case "Юридическое":
								break;
								case "Сайт":
								break;
								case "Средний":
								break;
								case "Дата":
								break;
								case "Телефон":
								break;
								case "Индекс":
								break;
								case "Колличество":
								break;
								case "Всего":
								break;
								case "Ресторан":
								break;
								case "Терраса":
								break;
								case "Страна":
								break;
								case "Город":
								break;
								case "Метро":
								break;
								case "Адрес":
								break;
								case "Понедельник":
								break;
								case "Вторник":
								break;	
								case "Среда":
								break;	
								case "Четверг":
								break;							
								case "Пятница":
								break;	
								case "Долгота":
								break;
								case "Широта":
								break;	
								case "Карта":
								break;								
							}
			
						}
					};
				*/
			break;
		}
		
		
	});
	
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
				case "input":
					++self.count_canvas;
					html = '<div class="canvas_note' + self.count_canvas + '">';
					html += '<div class="canvas_text">&nbsp&nbsp&nbsp' + text +  '</div>';
					html += '<div class="canvas_left" style="text-align: center;"><input id="input_left_' + id + '" type="text" style="width: 250px; margin-top: 10px;"></input></div>';
					html += '<div class="canvas_right" style="text-align: center;"><input id="input_right_"' + id + 'type="text" style="width: 250px; margin-top: 10px;"></input></div>';
					html += '</div>';
					return html;
				break;
				case "select":
					++self.count_canvas;
					//text = arr[2].list
					//append('<option>' + name_address + '</option>');
					html = '<div class="canvas_note' + self.count_canvas + '">';
					html += '<div class="canvas_text">&nbsp&nbsp&nbsp' + text +  '</div>';
					for(lr in type){
						switch(lr){
							case "left":
								html += '<div class="canvas_left" style="text-align: center;">';
								html += '<select id=select_left_" ' + id + 'style="width: 250px; margin-top: 10px;">';
							break;
							case "right":
								html += '<div class="canvas_right" style="text-align: center;">';
								html += '<select id=select_right_" ' + id + 'style="width: 250px; margin-top: 10px;">';
							break;
							
							for(next in type){
								html += '<option>' + type[lr][next] + '</option>';
							}
							
							html += '</select>';
							html += '</div>';
						}
					}
					html += '</div>';
					return html;
				break;
				case "input_mid":
					html += '<div class="canvas_mid"></div>';
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
	
	function Model(){
		
		var self = this;
		//кол-во запросов
		self.count_request = {};
		self.count_response = {};
		
		self.driver_ajax = function(id, AddDataAjax, manager_param, method, param1, param2){
			
			if (typeof(self.count_request["" + manager_param]) == "undefined")
				self.count_request["" + manager_param] = 1;
			else
				++self.count_request["" + manager_param];
			
			var item = new Object();
			item.data = new Object();
			item.data.method = method;
			
			if (typeof(param1) != "undefined"){
				item.data["" + param1.name] = param1.val;
			}
			
			if (typeof(param2) != "undefined"){
				item.data["" + param2.name] = param2.val;
			}
			
			//http://api.restobank.com/api.php?method=company.get&limit=1				
			$.ajax({
				type: "POST",
				url: "http://api.restobank.com/api.php",
				data: item.data,
				dataType: "json",
				cache: false,
				success: function(data){
					
					if (typeof(data.response) != "undefined"){
						//общее кол-во ответов от сервера
						if (typeof(self.count_response["" + manager_param]) == "undefined")
							self.count_response["" + manager_param] = 1;
						else
							++self.count_response["" + manager_param];
						
						//данные для каркаса элементов
						AddDataAjax(data, method);
						
					} else if (typeof(data.error)){
						var msg = data.message;
					}
				},
				statusCode: {
					404: function() {
						alert("page not found");
					}
				}
			})
		};
		
		self.managerElements = function(){
		}
		
	}
	
	function manager_ajax(){
		var ajax_self = this;
		ajax_self.data = {};
		
		ajax_self.id = 0;
		ajax_self.mod = new Model();
		
		//для наглядности
		/*
		self.base_info;
		self.imformation_about_company;
		self.information_about_address;
		self.time_work_res;
		self.location;
		*/
		
		ajax_self.test = function(){
		}
		
		//число повторных проверок валидности ответов
		ajax_self.count_endCreateModelPage = 0;
		
		ajax_self.endCreateModelPage = function(namePage){
			
			if (self.pid.Ajax == 1){}
		
			if (ajax_self.count_endCreateModelPage == 3){
				clearInterval(ajax_self.intervalID);
				console.log("error");
			}
			
			if(ajax_self.mod.count_request["" + namePage] == ajax_self.mod.count_response["" + namePage]){
				clearInterval(ajax_self.intervalID);
				//ответ валиден
				ajax_self.createPageModel(namePage);
			}
			++ajax_self.count_endCreateModelPage;
		}
		
		/*
		self.CreateViewPage = function(namePage){
			//данные для станиы сформированны
			//котроллеры для страниц
			switch(namePage){
				case: "information":
					
				break;
			}
		}
		*/
		
		ajax_self.AddDataAjax = function(data, nameMethod){
			
			//добавление данных в модель
			for(name in data){
				ajax_self.data[nameMethod] = {};
				ajax_self.data[nameMethod][name] = data["" + name];
			}
			console.dir(data);
		}
		
		//process id .Ajax контроль за вызовами
		self.pid = {};
		ajax_self.intervalID = "";
		ajax_self.beginCreateModelPage = function(namePage, id_address, id_company){
		
			//начало вызова
			ajax_self.data = {};
			//ajax вызовы
			switch(namePage){
				case "news":
				break;
				case "menu":
				break;
				case "information":	
					if (typeof(ajax_self.intervalID) != "undefined"){
						clearInterval(ajax_self.intervalID);
					}
					
					
					param1 = {};
					/*  */
					self.pid.Ajax = 0;
					
					param1.name = "limit";
					param1.val = 1;
					ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "company.get", param1);
					
					param1.name = "company_ids";
					param1.val = id_address;
					ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "address.get", param1);
					
					//денежные единицы
					ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "currency.get");
					//страны системы
					ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "country.get");

					//wait
					if (self.pid.Ajax == 0){
						ajax_self.intervalID  = setInterval(function(){
							ajax_self.endCreateModelPage(namePage);  
							self.pid.Ajax = 1;
						} ,2000); //повторение проверки через 30 сек * 3 1.5 мин на ожидание
					}
				break;
				case "reviews":
				break;
				case "interior":
				break;
				case "clients":
				break;
				case "settings":
				break;
				case "photoreports":
				break;
			
			}
		}
		
		ajax_self.createPageModel = function(namePage){
			self.information;
			//добавление данных в модель
			//							кеширование данных 
			
			/* for(name in data){
				ajax_self.data["" + name] = data["" + name];
			} */
			if (typeof(self["" + namePage]) == "undefined"){
				self["" + namePage] = {};
			}
			switch(namePage){
				case "news":
					/*
					company.get
					self.base_info.logo = data.response[0].logo[114];
					self.base_info.foto = ;
					self.company_list = ;
					self.address_list;
					*/
				break;
				case "menu":
				break;
				case "information":
					//ответ на прямой запрос 
					
					if (self.pid.Ajax == 1){
						/* Компания */
						
						//Язык - [] без [0]
						self[namePage].language = {};
						self[namePage].language.main = ajax_self.data["company.get"].response[0].language.shift();
						self[namePage].language.list = ajax_self.data["company.get"].response[0].language;
						
						//Название
						self[namePage].name_company = ajax_self.data["company.get"].response[0].name;
						//Описание
						self[namePage].description_company = ajax_self.data["company.get"].response[0].description;
						//Юридическое лицо ?
						self[namePage].juridical_person = "";
						//Средний счет без нал.
						self[namePage].no_cash = ajax_self.data["company.get"].response[0].check;
						//Вся валюта системы
						self[namePage].no_cash = ajax_self.data["currency.get"].response[0].sign; //obj id=1, руб.
						//Валюта ресторана ?
						self[namePage].money_unit = "";
						//Рейтинг среднего счета без нал. (пока костыль ?)
						self[namePage].reiting_no_cash = ajax_self.data["company.get"].response[0].check;
						
						/* Адрес */
						
						//Дата открытия (null ? ?? )
						self[namePage].opening_date = ajax_self.data["address.get"].response[0].opening_date;
						//Сайт (!!! косяк -> адрес)
						self[namePage].site = ajax_self.data["company.get"].response[0].site;
						//Телефон (у компании есть ?)
						self[namePage].phone = {};
						self[namePage].phone = ajax_self.data["address.get"].response[0].phone;
						if (typeof(ajax_self.data["address.get"].response[0].phone[0]) != "undefined"){
							self[namePage].phone = {};
							self[namePage].phone.list = ajax_self.data["address.get"].response[0].phone;
							//основной телефон
							self[namePage].phone.main = ajax_self.data["address.get"].response[0].phone.shift();
						}
						//Индекс
						self[namePage].postal_code = ajax_self.data["address.get"].response[0].address.postal_code;
						//Описание
						self[namePage].description_address = ajax_self.data["address.get"].response[0].description;
						//Кол-во посадочных мест :
							//Ресторан:
							self[namePage].capacity_indoor = ajax_self.data["address.get"].response[0].capacity.indoor;
							//Терраса:
							self[namePage].capacity_outdoor = ajax_self.data["address.get"].response[0].capacity.outdoor;
						//self["" + namePage].city = ajax_self.data["address.get"].response[0].address.city_id;
						//Метро (id):
						if (typeof(ajax_self.data["address.get"].response[0].address.subway_id[0]) != "undefined"){
							self[namePage].subway = {};
							self[namePage].subway.ids = ajax_self.data["address.get"].response[0].address.subway_id;
							//основное метро
							self[namePage].subway.main = self[namePage].subway.ids.shift();
						}
						//Адрес:
						self[namePage].street_list = ajax_self.data["address.get"].response[0].address.street;
						//Время работы:
						self[namePage].time_work = {};
						self[namePage].time_work.res = {};
							//Понедельник	
							self["" + namePage].time_work.res.Monday = {};
							self["" + namePage].time_work.res.Monday.begin = "";
							self["" + namePage].time_work.res.Monday.end = "";
							//Вторник
							self["" + namePage].time_work.res.Tuesday = {};
							self["" + namePage].time_work.res.Tuesday.begin = "";
							self["" + namePage].time_work.res.Tuesday.end = "";
							//Среда
							self["" + namePage].time_work.res.Wednesday = {};
							self["" + namePage].time_work.res.Wednesday.begin = "";
							self["" + namePage].time_work.res.Wednesday.end = "";
							//Четверг
							self["" + namePage].time_work.res.Thursday = {};
							self["" + namePage].time_work.res.Thursday.begin = "";
							self["" + namePage].time_work.res.Thursday.end = "";
							//Пятница
							self["" + namePage].time_work.res.Friday = {};
							self["" + namePage].time_work.res.Friday.begin = "";
							self["" + namePage].time_work.res.Friday.end = "";
						//Долгота
						self["" + namePage].time_work.longitude = ajax_self.data["address.get"].response[0].address.longitude;
						//Широта
						self["" + namePage].time_work.latitude = ajax_self.data["address.get"].response[0].address.latitude;
						//Страна:
						self["" + namePage].country = {};
						self["" + namePage].country.list = [];
							//id страны
							self["" + namePage].country.id = ajax_self.data["address.get"].response[0].address.country_id;
							
						
						self.pid.Ajax = 2;
					}
					//последовательный запрос (выполняется после первой пачки запросов)
					if (self.pid.Ajax == 2){

						//Город:
						if (typeof(ajax_self.data["city.get"]) == "undefined"){
							param1 = {};
							param1.name = "country_id";
							param1.val = self[namePage].country.id;
							ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "city.get", param1);
						}
						//Название страны:
						if (typeof(ajax_self.data["country.get"]) == "undefined"){
							/* попросить сделать : http://api.restobank.com/api.php?method=country.get&country_id=123123
							param1 = {};
							param1.name = "country_id";
							param1.val = self[namePage].country.id;
							ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "country.get", param1);
							*/
						}
						//Название метро:
						if (typeof(ajax_self.data["subway.get"]) == "undefined"){
							/* попросить сделать : http://api.restobank.com/api.php?method=subway.get&subway_id=123123
							param1 = {};
							param1.name = "subway_id";
							param1.val = self[namePage].country.id;
							ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "subway.get", param1);
							*/
						}
						
						ajax_self.intervalID  = setInterval(function(){ self.pid.Ajax = 3; ajax_self.endCreateModelPage(namePage);  } ,2000);
					}
					
					
					//овет на последовательный запрос
					if (self.pid.Ajax == 3){
						/*					
						for (var next in ajax_self.data["country.get"].response){
							if (ajax_self.data["country.get"].response[next].id == self[namePage].country.id){
								self[namePage].country.list = ajax_self.data["country.get"].response[next].name;
								self[namePage].country.id = ajax_self.data["country.get"].response[next].id;
							}
						}
						*/
						self.pid.Ajax = 0;
					}	
					
					//завершение запросов
					
					
					if(self.pid.Ajax == 0){
						//self.updateViewModel();
							console.log();
						$("#textAddress").trigger('update_info',[ namePage, self[namePage] ]);
						//self.updateViewModel();
					}
					
				break;
				case "reviews":
				break;
				case "interior":
				break;
				case "clients":
				break;
				case "settings":
				break;
				case "photoreports":
				break;

			}
		}		
	}
})