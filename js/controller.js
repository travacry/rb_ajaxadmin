
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
	self.managerPage = new manager_page();

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
				self.managerPage.beginCreateModelPage("news");
				break;
			case "Меню":
				self.createPage.menu();
				self.managerPage.beginCreateModelPage("menu");
				break;
			case "Информация":
				self.createPage.information();
				self.managerPage.beginCreateModelPage("information", self.slected_id_address, self.selected_id_company, self.data_company);
				break;
			case "Отзывы":
				self.createPage.reviews();
				self.managerPage.beginCreateModelPage("reviews");
				break;
			case "Интерьер":
				self.createPage.interior();
				self.managerPage.beginCreateModelPage("interior");
				break;
			case "Клиенты":
				self.createPage.clients();
				self.managerPage.beginCreateModelPage("clients");
				break;
			case "Настройки":
				self.createPage.settings();
				self.managerPage.beginCreateModelPage("settings");
				break;
			case "Фотоочеты":
				self.createPage.photoreports();
				self.managerPage.beginCreateModelPage("photoreports");
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