$(document).ready(function(){
	
	var init_data = {};
	//efects
	
	function init(){
		//http://api.restobank.com/api.php?method=city.get
		$.ajax({
				type: "POST",
				url: "http://api.restobank.com/api.php",
				data: { method: "city.get" },
				dataType: "json",
				cache: false,
				timeout: 180000, //3min
				success: function(data){
					init_data["city.get"] = data;
				}
		})
		
		//http://api.restobank.com/api.php?method=country.get
		$.ajax({
				type: "POST",
				url: "http://api.restobank.com/api.php",
				data: { method: "country.get" },
				dataType: "json",
				cache: false,
				timeout: 180000,
				success: function(data){
					init_data["country.get"] = data;
				}
		})		
	
		http://api.restobank.com/api.php?method=subway.get
		$.ajax({
				type: "POST",
				url: "http://api.restobank.com/api.php",
				data: { method: "subway.get" },
				dataType: "json",
				cache: false,
				timeout: 180000,
				success: function(data){
					init_data["subway.get"] = data;
				}
		})
		
		//http://api.restobank.com/api.php?method=currency.get
		$.ajax({
				type: "POST",
				url: "http://api.restobank.com/api.php",
				data: { method: "currency.get" },
				dataType: "json",
				cache: false,
				timeout: 180000,
				success: function(data){
					init_data["currency.get"] = data;
				}
		})
		
		//http://api.restobank.com/api.php?method=phoneType.get
		$.ajax({
				type: "POST",
				url: "http://api.restobank.com/api.php",
				data: { method: "phoneType.get" },
				dataType: "json",
				cache: false,
				timeout: 180000,
				success: function(data){
					init_data["phoneType.get"] = data;
				}
		})
		
	}
	init();
	
	//обработка меню
	function Controller(){
		var self = this;
		self.pid = {}
		self.pid.PAGE;
		
		//<id-ники
		self.slected_id_address;
		self.selected_id_company;
		self.data_company = {};
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
						self.list_logo[name_company] = data.response[next].logo["114"];
						//список копманий
						$("#idCompany").append('<option>' + name_company + '</option>');
						//list id
						list_id[name_company] = data.response[next].id;
					}
					
					$("#idCompany").change(function(){
						var name_company = "";
						$("#idCompany option:selected").each(function () {
							name_company += $(this).text();
							//save change company
							for(next in data.response){
								if (data.response[next].name[self.language] == name_company){
									self.data_company = data.response[next];
									
									var imgLevel = self.priceLevelToImage(self.data_company.price.level);
									$("#priceLevel").text(imgLevel + "");
								}
							}
							
							self.selected_id_company = list_id[name_company];
							$("#logo").html(self.view.manager_el("base","logo_req", self.list_logo["" + name_company]));
							
						});
						
						if (name_company != "-- Компания --"){
							self.loadAddress(self.selected_id_company);
						}
					}).trigger('change');
				}
			})
			
			
			self.list_foto = new Array();
			
			
			self.list_address_id = {};
			self.list_address_name = {};
			self.list_favourite_count = {};
			self.list_address_rating = {};
			self.rating_count = {};
			self.list_address_count_review = {};
		
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
							//избранное
							self.list_favourite_count["" + next] = data.response[next].estimate.favourite_count;
							console.dir(data.response[next]);
							//рейтинг
							if (typeof(data.response[next].estimate.rating[4]) != "undefined")
								self.list_address_rating["" + next] = data.response[next].estimate.rating[4]; //почему 5 массивов ?
							else 
								self.list_address_rating["" + next] = "0";
							//кол-во поситителей голосующих за текущий рейтинг
							if (typeof(data.response[next].estimate.rating_count[4]) != "undefined")
								self.rating_count["" + next] = data.response[next].estimate.rating_count[4];
							else
								self.rating_count["" + next] = "0";
							//кол-во отзывов
							if (typeof(data.response[next].estimate.review_count[4]) != "undefined")
								self.list_address_count_review["" + next] = data.response[next].estimate.review_count[4];//опять массив 5 эл.
							else
								self.list_address_count_review["" + next] = "0";
							
							//self.list_address_likes["" + next];
							self.list_address_name["" + next] = data.response[next].address.street[self.language];
							//адреса
							var name_address = data.response[next].address.street[self.language];
							$("#textAddress").append('<option>' + name_address + '</option>');
						}
						
						$("#textAddress").change(function(){						
							var name_address = "";
							$("#textAddress option:selected").each(function () {
								name_address = $(this).text();
								//получение координат по адресу
								self.getCoordAddress(name_address);
								var link_pic;
								for(next in self.list_address_name){
									
									if (self.list_address_name[next] == name_address){
										link_pic = self.list_foto[next];
										self.slected_id_address = self.list_address_id[next];
										self.slected_favourite_count = self.list_favourite_count[next];
										self.address_rating = self.list_address_rating[next];
										self.rating_count = self.rating_count[next];
										self.address_count_review = self.list_address_count_review[next];
										
									}
								}
								
								$("#favourite").text(self.slected_favourite_count);
								$("#address_subway").text("Метро: " + name_address);
								$("#address_rating").text("Рейтинг: " + self.address_rating);
								$("#rating_count").text("Кол-во. голосовавших: " + self.rating_count);
								$("#address_count_review").text("Кол-во отзывов: " + self.address_count_review);
								
								$("#foto").html(self.view.manager_el("base", "foto_req", link_pic));
								$("#textAddress").trigger('update_menu',[ self.slected_id_address, self.selected_id_company ]);
								
								if (typeof(self.pid.PAGE) != "undefined")
									self.selectPage(self.pid.PAGE);
								else 
									self.selectPage("Новости");
								
							})
						});
						
						$("#textAddress").trigger('change');
						$("#textAddress").trigger('update_page',[ self.slected_id_address, self.selected_id_company ]);
					
					}
				})
				
			}
			
			self.priceLevelToImage = function(count){
				var img = "";
				while( count > 0){
					img += "$";
					--count;
				}
				return img;
			}
			
			self.getCoordAddress = function(name_address){
				//http://maps.googleapis.com/maps/api/geocode/json?address= + + &sensor=true
				$.ajax({
					type: "POST",
					url: "http://maps.googleapis.com/maps/api/geocode/json",
					data: { address: "Рыбацкий пр.30", sensor: true },
					dataType: "json",
					cache: false,
					success: function(data){
						console.dir("coordinate", data);
						debugger
					}
				})
			}
		
			self.list_address;
		}
		
		self.log = function(text){
			alert(text);
		}
		
		self.manager_el.click = function(id, type_selector, namePage , id_address, id_company){
			if(typeof(self.count_list[id]) == "undefined")
				self.count_list[id] = 0;
			else 
				++self.count_list[id];
					
			switch(type_selector){					
				case "a":
					$("a#" + id + "_" + self.count_list[id]).bind('click', function() { 
						//cbMethodBind(namePage);
						self.selectPage(namePage, id_address, id_company);
					});
				break;
			}
			
		}
		
		
		//pages
		self.selectPage = function(namePage){
			self.pid.PAGE = namePage;
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
					self.managerAjax.beginCreateModelPage("information", self.slected_id_address, self.selected_id_company, self.data_company);
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
		
		$("#textAddress").on("update_menu", function(e, id_address, id_company){
			controller.init.menu();
		})
		
		$("#textAddress").on("update_page", function(e, id_address, id_company){
			
		});
		
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
			
			$("button", ".demo" ).button();
			$( "#opening_date_right" ).datepicker({
				showButtonPanel: true
			});
			
			//$("#phone_right").
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
	var view_g = new View();
	//id, type, text, list
	
	//view_g.manager_widgetEl("language", "select", "right", list);
	
	$("#textAddress").on("update_info", function(e, namePage, ObjModelPage){
		console.log("update_info");
		switch(namePage){
			case "news":
			break;
			case "menu":
			break;
			case "information":
				
				var language_main = dataModel.information.language.main;
				var html = view_g.manager_widgetEl("language", "select", "right", language_main);
				$("#language_right").append(html);
				
				var list = dataModel.information.language.list;
				var html = view_g.manager_widgetEl("language", "select", "right", list);				
				$("#language_left").append(html);
				
				var language_left;
				$("#language_left").bind('change', function() { 
					$("#language_left option:selected").each(function () {
						language_left = $(this).text();
						
						//Название
						var val = dataModel.information.name_company[language_left];
						$("#name_company_left").val(val);
						
						//Описание(компания)
						val = dataModel.information.description_company[language_left];
						$("#description_company_left").val(val);
						
						//Описание(адрес)
						val = dataModel.information.description_address[language_left];
						$("#description_address_left").val(val);
						
						//Страна
						val = dataModel.information.country[language_left];
						$("#country_left").val(val);
						
						//Город
						val = dataModel.information.city[language_left];
						$("#city_left").val(val);
						
						//Метро
						val = dataModel.information.subway.main[language_left];
						$("#subway_left").val(val);
						
						//Адрес
						val = dataModel.information.street_list[language_left];
						$("#address_left").val(val);
						
					});
				}).trigger('change');;
				
				//right 
				
				//Название
				var val = dataModel.information.name_company[language_main];
				$("#name_company_right").val(val);
				
				//Описание(компания)
				val = dataModel.information.description_company[language_main];
				$("#description_company_right").val(val);
				
				//Юридическое лицо
				val = dataModel.information.juridical_person;
				val = "обговорить момент";
				$("#juridical_person_right").val(val);
				$("#juridical_person_left").val(val);
				
				//Сайт
				val = dataModel.information.site;
				$("#site_right").val(val);
				$("#site_left").val(val);
				
				//Средний счет без нал.
				val = dataModel.information.no_cash;
				$("#no_cash_right").val(val);
				$("#no_cash_left").val(val);
				
				//Дата открытия
				val = dataModel.information.opening_date;
				if (val != null){
					var opening_date = new Date(val * 1000);
					var openingDay = opening_date.getDate(); // Считываем число
					var openingMonth =  opening_date.getMonth(); // Считываем месяц
					var openingYear = opening_date.getYear() + 1900; // Считываем год
						
					if (openingDay < 9) 
						openingDay = "0" + openingDay;
					if (openingMonth < 9) 
						openingMonth = "0" + openingMonth;
					if (openingYear < 9) 
						openingYear = "0" + openingYear;
					
					val =   openingMonth + "/" + openingDay + "/" + openingYear;
					console.log(val);
					
					$("#opening_date_right").datepicker("setDate" , val);
					$("#opening_date_left").val(val);
					
				}
				//Описание(адрес)
				val = dataModel.information.description_address[language_main];
				$("#description_address_right").val(val);
				
				//"Индекс"
				val = dataModel.information.postal_code;
				$("#postal_code_right").val(val);
				$("#postal_code_left").val(val);
				
				//Всего (посадочных мест)
				val = dataModel.information.capacity_all;
				$("#capacity_all_right").val(val);
				$("#capacity_all_left").val(val);
				
				//Ресторан
				val = dataModel.information.capacity_indoor;
				$("#capacity_indoor_right").val(val);
				$("#capacity_indoor_left").val(val);
				
				//Терраса
				val = dataModel.information.capacity_outdoor;
				$("#capacity_outdoor_right").val(val);
				$("#capacity_outdoor_left").val(val);
				
				//Страна
				val = dataModel.information.country[language_main];
				$("#country_right").val(val);
				
				//Город
				val = dataModel.information.city[language_main];
				$("#city_right").val(val);
				
				//Метро
				val = dataModel.information.subway.main[language_main];
				$("#subway_right").val(val);
				
				//Адрес
				val = dataModel.information.street_list[language_main];
				$("#address_right").val(val);
				
				//Понедельник
				val = dataModel.information.time_work.res.Monday.begin;
				$("#monday_left").val(val);
				val = dataModel.information.time_work.res.Monday.end;
				$("#monday_right").val(val);
				
				//Вторник
				val = dataModel.information.time_work.res.Tuesday.begin;
				$("#tuesday_left").val(val);
				val = dataModel.information.time_work.res.Tuesday.end;
				$("#tuesday_right").val(val);
				
				//Среда
				val = dataModel.information.time_work.res.Wednesday.begin;
				$("#wednesday_left").val(val);
				val = dataModel.information.time_work.res.Wednesday.end;
				$("#wednesday_right").val(val);
				
				//Четверг
				val = dataModel.information.time_work.res.Thursday.begin;
				$("#thursday_left").val(val);
				val = dataModel.information.time_work.res.Thursday.end;
				$("#thursday_right").val(val);
				
				//Пятница
				val = dataModel.information.time_work.res.Friday.begin;
				$("#friday_left").val(val);
				val = dataModel.information.time_work.res.Friday.end;
				$("#friday_right").val(val);
				
				//Суббота
				val = dataModel.information.time_work.res.Saturday.begin;
				$("#saturday_left").val(val);
				val = dataModel.information.time_work.res.Saturday.end;
				$("#saturday_right").val(val);
				
				//Воскресенье
				val = dataModel.information.time_work.res.Sunday.begin;
				$("#sunday_left").val(val);
				val = dataModel.information.time_work.res.Sunday.end;
				$("#sunday_right").val(val);

				//Долгота
				val = dataModel.information.longitude;
				$("#current_longitude").val(val);

				//Широта
				val = dataModel.information.latitude;
				$("#current_latitude").val(val);
				
				//"Телефон"
				//dataModel[namePage].phone.list
				val = dataModel.information.phone.main.phone;
				$("#phone_right").val(val);
				$("#phone_left").val(val);

				$("#add_phone").button({
					icons: {
						primary: "ui-icon ui-icon-plusthick"
					}
				});

				$("#del_phone").button({
					icons: {
						primary: "ui-icon ui-icon-minusthick"
					}
				});
				//основной тел.
					
					//доп. тел
					
				//init_data["phoneType.get"]
				
				var myLatlng = new google.maps.LatLng(0, 0);
				var map;
				function initialize_map() {
					var myOptions = {
						zoom: 12,
						center: myLatlng,
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						draggableCursor: 'auto',
						draggingCursor: 'move',
						disableDoubleClickZoom: true
					}
					map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				}
				initialize_map();

				var geocoder = new google.maps.Geocoder();
				//address_right
			function codeAddress(id, type) {
				$("#test_api_googlemap_left").button( "option", "disabled", true );
				$("#test_api_googlemap_right").button( "option", "disabled", true );
				var address = document.getElementById(id).value;
				var pos;
				geocoder.geocode( { 'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						map.setCenter(results[0].geometry.location);
						var marker = new google.maps.Marker({
							map: map,
							position: results[0].geometry.location
						});
						if (typeof(results[0]) != "undefined"){
							var pos = results[0].geometry.location;
							$("#latitude_address").val(pos["$a"]);
							$("#longitude_address").val(pos["ab"]);

							if ($("#latitude_address").val() != $("#longitude_address")){
								if (type == "first")
									$("#msg_current_longitude").html("<p style='color: red;'>" + "error" + "</p>");
							}
							if ($("#longitude_address").val() != $("#longitude_address")){
								if (type == "first")
									$("#msg_current_latitude").html("<p style='color: red;'>" + "error" + "</p>");
							}
						}

					} else {
						alert("Geocode was not successful for the following reason: " + status);
					}
					$("#test_api_googlemap_left").button( "option", "disabled", false );
					$("#test_api_googlemap_right").button( "option", "disabled", false );
				});
			}

				$("#test_api_googlemap_left").bind('click', function() {codeAddress("address_left")});
				$("#test_api_googlemap_right").bind('click', function() {codeAddress("address_right")});

				codeAddress("address_right","first");


				//-34.397, 150.644


				//left
				
				
			//console.log($("div:contains('Название')").html()); 
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
	
	
	var dataModel = {};
	//process id .Ajax контроль за вызовами
	dataModel.pid = {};
	
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
		
		ajax_self.endCreateModelPage = function(namePage, data_company, id_address){
		
			if (ajax_self.count_endCreateModelPage == 3){
				clearInterval(ajax_self.intervalID);
				console.log("error");
			}
			
			if((ajax_self.mod.count_request["" + namePage] == ajax_self.mod.count_response["" + namePage])&&(dataModel.pid.Ajax > 0)){
				clearInterval(ajax_self.intervalID);
				//ответ валиден
				ajax_dataModel.createPageModel(namePage, data_company, id_address);
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
		}
		
		
		ajax_self.intervalID = "";
		ajax_self.beginCreateModelPage = function(namePage, id_address, id_company, data_company){
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
					dataModel.pid.Ajax = 0;
					
					
					param1.name = "limit";
					param1.val = 2;
					ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "company.get", param1);
					
					//не пашет
					param1.name = "company_ids";
					param1.val = id_company;
					ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "address.get", param1);
					
					//денежные единицы
					ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "currency.get");
					//страны системы
					ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "country.get");
					
					//wait
					if (dataModel.pid.Ajax == 0){
						ajax_self.intervalID  = setInterval(function(){
							ajax_self.endCreateModelPage(namePage, data_company, id_address);  
							dataModel.pid.Ajax = 1;
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
		
		var ajax_dataModel = {};
		
		ajax_dataModel.createPageModel = function(namePage, data_company, id_address){
			console.log("PID ", dataModel.pid.Ajax);
			//добавление данных в модель
			//							кеширование данных 
			
			/* for(name in data){
				ajax_dataModel.data["" + name] = data["" + name];
			} */
			if (typeof(dataModel["" + namePage]) == "undefined"){
				dataModel["" + namePage] = {};
			}
			
			switch(namePage){
				case "news":
					/*
					company.get
					dataModel.base_info.logo = data.response[0].logo[114];
					dataModel.base_info.foto = ;
					dataModel.company_list = ;
					dataModel.address_list;
					*/
				break;
				case "menu":
				break;
				case "information":
					//ответ на прямой запрос 
					
					if (dataModel.pid.Ajax == 1){
						
						var data_address = 0;
						for (var next in ajax_self.data["address.get"].response){
							if (ajax_self.data["address.get"].response[next].id == id_address){
								data_address = ajax_self.data["address.get"].response[next];
								console.log("data_address ", data_address);
							}
						}
												
						/* Компания */
						
						//Язык - [] без [0]
						dataModel[namePage].language = {};
						dataModel[namePage].language.main = data_company.language[0];
						dataModel[namePage].language.list = data_company.language;
						
						
						//Название
						dataModel[namePage].name_company = data_company.name;
						//Описание
						dataModel[namePage].description_company = data_company.description;
						//Юридическое лицо ?
						dataModel[namePage].juridical_person = "";
						
						//Рейтинг среднего счета без нал. (сумма)
						dataModel[namePage].reiting_no_cash = data_company.check;
						
						/*
						dataModel[namePage].language = {};
						dataModel[namePage].language.main = ajax_self.data["company.get"].response[0].language.shift();
						dataModel[namePage].language.list = ajax_self.data["company.get"].response[0].language;
						
						//Название
						dataModel[namePage].name_company = ajax_self.data["company.get"].response[0].name;
						//Описание
						dataModel[namePage].description_company = ajax_self.data["company.get"].response[0].description;
						//Юридическое лицо ?
						dataModel[namePage].juridical_person = "";
						//Средний счет без нал.
						dataModel[namePage].no_cash = ajax_self.data["company.get"].response[0].check;
						//Вся валюта системы
						dataModel[namePage].no_cash = ajax_self.data["currency.get"].response[0].sign; //obj id=1, руб.
						//Валюта ресторана ?
						dataModel[namePage].money_unit = "";
						//Рейтинг среднего счета без нал. (пока костыль ?)
						dataModel[namePage].reiting_no_cash = ajax_self.data["company.get"].response[0].check;
						*/
						/* Адрес */
	
						//Дата открытия (null ? ?? )
						dataModel[namePage].opening_date = data_address.opening_date;
						//Сайт (!!! косяк -> адрес)
						dataModel[namePage].site = data_company.site;
						//Телефон (у компании есть ?)
						dataModel[namePage].phone = {};
						dataModel[namePage].phone = data_address.phone;
						dataModel[namePage].phone.list = {};
						
						if (typeof(data_address.phone[0]) != "undefined"){
							for(var next in data_address.phone){
								if (data_address.phone[next].type == 1){
									//основной телефон
									dataModel[namePage].phone.main = data_address.phone[next].phone;
								} else {
									for (var next_type in init_data["phoneType.get"].response){
										if (data_address.phone[next].type == init_data["phoneType.get"].response[next_type].type){
											var name_type = init_data["phoneType.get"].response[next_type].name[dataModel[namePage].language.main];
											//все телефоны, -"Основной"
											dataModel[namePage].phone.list[name_type] = data_address.phone[next].phone;
										}
									}									
								}
							}
						}
						//Индекс
						dataModel[namePage].postal_code = data_address.address.postal_code;
						//Описание
						dataModel[namePage].description_address = data_address.description;
						//Кол-во посадочных мест :							
							//Ресторан:
							dataModel[namePage].capacity_indoor = data_address.capacity.indoor;
							//Терраса:
							dataModel[namePage].capacity_outdoor = data_address.capacity.outdoor;
							//Всего п.м
							dataModel[namePage].capacity_all = dataModel[namePage].capacity_indoor + dataModel[namePage].capacity_outdoor;
				
						
						//Адрес:
						dataModel[namePage].street_list = data_address.address.street;
						
						//Время работы (ресторана):
					
						dataModel[namePage].time_work = {};
						dataModel[namePage].time_work.res = {};
						
						
						//init
						dataModel[namePage].time_work.res.Monday = {};
						dataModel[namePage].time_work.res.Monday.begin = "";
						dataModel[namePage].time_work.res.Monday.end = "";
						dataModel[namePage].time_work.res.Monday.kitchen = "";						
						dataModel[namePage].time_work.res.Tuesday = {};
						dataModel[namePage].time_work.res.Tuesday.begin = "";
						dataModel[namePage].time_work.res.Tuesday.end = "";
						dataModel[namePage].time_work.res.Tuesday.kitchen = "";
						dataModel[namePage].time_work.res.Wednesday = {};
						dataModel[namePage].time_work.res.Wednesday.begin = "";
						dataModel[namePage].time_work.res.Wednesday.end = "";
						dataModel[namePage].time_work.res.Wednesday.kitchen = "";
						dataModel[namePage].time_work.res.Thursday = {};
						dataModel[namePage].time_work.res.Thursday.begin = "";
						dataModel[namePage].time_work.res.Thursday.end = "";
						dataModel[namePage].time_work.res.Thursday.kitchen = ""
						dataModel[namePage].time_work.res.Friday = {};
						dataModel[namePage].time_work.res.Friday.begin = "";
						dataModel[namePage].time_work.res.Friday.end = "";
						dataModel[namePage].time_work.res.Friday.kitchen = "";
						dataModel[namePage].time_work.res.Saturday = {};
						dataModel[namePage].time_work.res.Saturday.begin = "";
						dataModel[namePage].time_work.res.Saturday.end = "";
						dataModel[namePage].time_work.res.Saturday.kitchen = "";
						dataModel[namePage].time_work.res.Sunday = {};
						dataModel[namePage].time_work.res.Sunday.begin = "";
						dataModel[namePage].time_work.res.Sunday.end = "";
						dataModel[namePage].time_work.res.Sunday.kitchen = "";
						
						
						//Понедельник
						if (typeof(data_address.worktime[1][0]) != "undefined"){
							if (typeof(data_address.worktime[1][0][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Monday.begin = ajax_self.getformatSM(data_address.worktime[1][0][0]);
							if (typeof(data_address.worktime[1][0][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Monday.end = ajax_self.getformatSM(data_address.worktime[1][0][1]);
						}
						if (typeof(data_address.worktime[1][1]) != "undefined"){
							if (typeof(data_address.worktime[1][1][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Monday.kitchen = ajax_self.getformatSM(data_address.worktime[1][1][0]);
						}
						//Вторник
						if (typeof(data_address.worktime[2][0]) != "undefined"){
							if (typeof(data_address.worktime[2][0][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Tuesday.begin = ajax_self.getformatSM(data_address.worktime[2][0][0]);
							if (typeof(data_address.worktime[2][0][1]) != "undefined")
								dataModel["" + namePage].time_work.res.Tuesday.end = ajax_self.getformatSM(data_address.worktime[2][0][1]);
						}
						if (typeof(data_address.worktime[2][1]) != "undefined"){
							if (typeof(data_address.worktime[2][1][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Tuesday.kitchen = ajax_self.getformatSM(data_address.worktime[2][1][0]);
						}
						//Среда
						if (typeof(data_address.worktime[3][0]) != "undefined"){
							if (typeof(data_address.worktime[3][0][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Wednesday.begin = ajax_self.getformatSM(data_address.worktime[3][0][0]);
							if (typeof(data_address.worktime[3][0][1]) != "undefined")
								dataModel["" + namePage].time_work.res.Wednesday.end = ajax_self.getformatSM(data_address.worktime[3][0][1]);
						}
						if (typeof(data_address.worktime[3][1]) != "undefined"){
							if (typeof(data_address.worktime[3][1][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Wednesday.kitchen = ajax_self.getformatSM(data_address.worktime[3][1][0]);								
						}
						//Четверг
						if (typeof(data_address.worktime[4][0]) != "undefined"){
							if (typeof(data_address.worktime[4][0][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Thursday.begin = ajax_self.getformatSM(data_address.worktime[4][0][0]);
							if (typeof(data_address.worktime[4][0][1]) != "undefined")
								dataModel["" + namePage].time_work.res.Thursday.end = ajax_self.getformatSM(data_address.worktime[4][0][1]);
						}
						if (typeof(data_address.worktime[4][1]) != "undefined"){
							if (typeof(data_address.worktime[4][1][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Thursday.kitchen = ajax_self.getformatSM(data_address.worktime[4][1][0]);							
						}
						//Пятница
						if (typeof(data_address.worktime[5][0]) != "undefined"){
							if (typeof(data_address.worktime[5][0][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Friday.begin = ajax_self.getformatSM(data_address.worktime[5][0][0]);
							if (typeof(data_address.worktime[5][0][1]) != "undefined")
								dataModel["" + namePage].time_work.res.Friday.end = ajax_self.getformatSM(data_address.worktime[5][0][1]);
						}
						if (typeof(data_address.worktime[5][1]) != "undefined"){
							if (typeof(data_address.worktime[5][1][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Friday.kitchen = ajax_self.getformatSM(data_address.worktime[5][1][0]);									
						}
						//Суббота
						if (typeof(data_address.worktime[6][0]) != "undefined"){
							dataModel["" + namePage].time_work.res.Saturday = {};
							if (typeof(data_address.worktime[6][0][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Saturday.begin = ajax_self.getformatSM(data_address.worktime[6][0][0]);
							if (typeof(data_address.worktime[6][0][1]) != "undefined")
								dataModel["" + namePage].time_work.res.Saturday.end = ajax_self.getformatSM(data_address.worktime[6][0][1]);
						}
						if (typeof(data_address.worktime[6][1]) != "undefined"){
							if (typeof(data_address.worktime[6][1][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Saturday.kitchen = ajax_self.getformatSM(data_address.worktime[6][1][0]);	
						}
						//Воскресенье
						if (typeof(data_address.worktime[0][0]) != "undefined"){
							dataModel["" + namePage].time_work.res.Sunday = {};
							if (typeof(data_address.worktime[0][0][0]) != "undefined")
								dataModel["" + namePage].time_work.res.Sunday.begin = ajax_self.getformatSM(data_address.worktime[0][0][0]);
							if (typeof(data_address.worktime[0][0][1]) != "undefined")
								dataModel["" + namePage].time_work.res.Sunday.end = ajax_self.getformatSM(data_address.worktime[0][0][1]);
						}
						if (typeof(data_address.worktime[6][1]) != "undefined"){
							if (typeof(data_address.worktime[6][1][1]) != "undefined")
								dataModel["" + namePage].time_work.res.Sunday.kitchen = ajax_self.getformatSM(data_address.worktime[6][1][1]);								
						}
						
						//Долгота
						dataModel["" + namePage].longitude = data_address.address.longitude;
						//Широта
						dataModel["" + namePage].latitude = data_address.address.latitude;	
					
					
					//Город:						
					for(var res in init_data["city.get"].response){
						if (init_data["city.get"].response[res].id == data_address.address.city_id){
							dataModel["" + namePage].city = init_data["city.get"].response[res].name;
						}
					}
					
					//Страна:
					for(var res in init_data["country.get"].response){
						if (init_data["country.get"].response[res].id == data_address.address.country_id){
							dataModel["" + namePage].country = init_data["country.get"].response[res].name;
						}
					}
					
					//Метро:
					var count = 0;
					dataModel[namePage].subway = {};
					dataModel[namePage].subway.list = [];
					for(var res in init_data["subway.get"].response){
						for (var next in ajax_self.data["address.get"].response[0].address.subway_id){
							if (init_data["subway.get"].response[res].id == data_address.address.subway_id[next]){
								dataModel["" + namePage].subway.list[count] = init_data["subway.get"].response[res].name;
								++count;
							}
						}
					}
					//основное метро
					dataModel[namePage].subway.main = dataModel[namePage].subway.list.shift();
				
					
					//Валюта ресторана:
					var resto_val = init_data["currency.get"].response[0].sign;	//.руб	(пока обьект 1)			
					//Средний счет без нал.:
					dataModel[namePage].no_cash = data_company.price.check + " " + resto_val;
					
					//завершение запросов
					dataModel.pid.Ajax = 0;

					$("#textAddress").trigger('update_info',[ namePage, dataModel[namePage] ]);
					console.log(" --- END --- ");
					//dataModel.updateViewModel();
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
			ajax_self.getformatSM = function(sec){ 
				var minutes = parseInt(sec / 60); 
				var seconds = sec % 60; 
				var hours = parseInt(minutes / 60); 
				minutes = minutes % 60; 
				// Обеспечиваем ведущие нули 
				if(String(minutes).length != 2) minutes = "0" + minutes; 
				if(String(seconds).length != 2) seconds = "0" + seconds; 
				// Выводим результат 
				return hours + ":" + minutes; 
			}		
	}
})