
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
						console.log("self.selected_id_company = ", self.selected_id_company);
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
		self.rating_count = [];
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
                        console.log("asd = ", data.response[next].estimate.rating_count[4]);
						if (typeof(data.response[next].estimate.rating_count[4]) != "undefined")
							self.rating_count[next] = data.response[next].estimate.rating_count[4];
						else
							self.rating_count[next] = "0";
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
									self.r_count = self.rating_count[next];
									self.address_count_review = self.list_address_count_review[next];

								}
							}

							$("#favourite").text(self.slected_favourite_count);
							$("#address_subway").text("Метро: " + name_address);
							$("#address_rating").text("Рейтинг: " + self.address_rating);
							$("#rating_count").text("Кол-во. голосовавших: " + self.r_count);
							$("#address_count_review").text("Кол-во отзывов: " + self.address_count_review);

							$("#foto").html(self.view.manager_el("base", "foto_req", link_pic));
							$("#textAddress").trigger('update_menu',[ self.slected_id_address, self.selected_id_company ]);

                            $("#btn_save").button();
                            $("#btn_save").addClass("clssave");

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


    //save info for page
    //
    self.saveInfo = function(namePage){
        //пак для отправки
        var send_pack = {};
        switch(namePage){
            case "Информация":
                console.log("dataModel.information");
                console.dir(dataModel.information);
                var onChangeData = false;
                if (dataModel.information.opening_date != $("#opening_date_right").val()){
                    //Дата открытия  (UTC)
                    var str = $("#opening_date_right").val();
                    send_pack.opening_date = DT.StrDateToTimestamp(str);
                    onChangeData = true;
                }
                //пока только ru
                if (dataModel.information.description_address[dataModel.information.language.main] != $("#description_address_right").val()){
                    //Описание адреса
                    send_pack.description = $("#description_address_right").val();
                    onChangeData = true;
                }
                if (dataModel.information.phone.main != $("#phone_main").val()){
                    //Основной телефон
                    send_pack.phone = {};
                    send_pack.phone.main = $("#phone_main").val();
                    onChangeData = true;
                }
                if (dataModel.information.postal_code != $("#postal_code_right").val()){
                    //Индекс
                    send_pack.postal_code = $("#postal_code_right").val();
                    onChangeData = true;
                }
                if (dataModel.information.capacity_indoor != $("#capacity_indoor_right").val()){
                    //Мест в ресторане
                    send_pack.capacity_indoor = $("#capacity_indoor_right").val();
                    onChangeData = true;
                }
                if (dataModel.information.capacity_outdoor != $("#capacity_outdoor_right").val()){
                    //Мест на террасе
                    send_pack.capacity_outdoor = $("#capacity_outdoor_right").val();
                    onChangeData = true;
                }

                if (dataModel.information.country[dataModel.information.language.main]  != $("#country_right").val()){
                    //Страна
                    send_pack.country = $("#country_right").val();
                    onChangeData = true;
                }
                if (dataModel.information.city[dataModel.information.language.main] != $("#city_right").val()){
                    //Город
                    send_pack.city = $("#city_right").val();
                    onChangeData = true;
                }
                /*
                if (dataModel.information.subway.main[dataModel.information.language.main] != $("#subway_right").val()){
                    //Метро
                    send_pack.subway = {};
                    send_pack.subway.main = $("#subway_right").val();
                    onChangeData = true;
                }
                */
                if (dataModel.information.street_list[dataModel.information.language.main] != $("#address_right").val()){
                    //Адрес
                    send_pack.address = {}
                    send_pack.street = $("#address_right").val();
                    onChangeData = true;
                }

                /*
                send_pack.Monday = {};
                send_pack.Tuesday = {};
                send_pack.Wednesday = {};
                send_pack.Thursday = {};
                send_pack.Friday = {};
                send_pack.Saturday = {};
                send_pack.Sunday = {};

                if (dataModel.information.time_work.res.Monday.begin != $("#monday_left").val()){
                    send_pack.Monday.begin = $("#monday_left").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Monday.end != $("#monday_right").val()){
                    send_pack.Monday.end = $("#monday_right").val();
                    onChangeData = true;
                }
                console.dir(dataModel.information.time_work.res.Monday.kitchen);
                if (dataModel.information.time_work.res.Monday.kitchen != $("#monday_kitchen").val()){
                    send_pack.Monday.kitchen = $("#monday_kitchen").val();
                    onChangeData = true;
                }

                if (dataModel.information.time_work.res.Tuesday.begin != $("#tuesday_left").val()){
                    send_pack.Tuesday.begin = $("#tuesday_left").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Tuesday.end != $("#tuesday_right").val()){
                    send_pack.Tuesday.end = $("#tuesday_right").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Tuesday.kitchen != $("#tuesday_kitchen").val()){
                    send_pack.Tuesday.kitchen = $("#tuesday_kitchen").val();
                    onChangeData = true;
                }

                if (dataModel.information.time_work.res.Wednesday.begin != $("#wednesday_left").val()){
                    send_pack.Wednesday.begin = $("#wednesday_left").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Wednesday.end != $("#wednesday_right").val()){
                    send_pack.Wednesday.end = $("#wednesday_right").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Wednesday.kitchen != $("#wednesday_kitchen").val()){
                    send_pack.Wednesday.kitchen = $("#wednesday_kitchen").val();
                    onChangeData = true;
                }

                if (dataModel.information.time_work.res.Thursday.begin != $("#thursday_left").val()){
                    send_pack.Thursday.begin = $("#thursday_left").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Thursday.end != $("#thursday_right").val()){
                    send_pack.Thursday.end = $("#thursday_right").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Thursday.kitchen != $("#thursday_kitchen").val()){
                    send_pack.Thursday.kitchen = $("#thursday_kitchen").val();
                    onChangeData = true;
                }

                if (dataModel.information.time_work.res.Friday.begin != $("#friday_left").val()){
                    send_pack.Friday.begin = $("#friday_left").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Friday.end != $("#friday_right").val()){
                    send_pack.Friday.end = $("#friday_right").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Friday.kitchen != $("#friday_kitchen").val()){
                    send_pack.Friday.kitchen = $("#friday_kitchen").val();
                    onChangeData = true;
                }

                if (dataModel.information.time_work.res.Saturday.begin != $("#saturday_left").val()){
                    send_pack.Saturday.begin = $("#saturday_left").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Saturday.end != $("#saturday_right").val()){
                    send_pack.Saturday.end = $("#saturday_right").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Saturday.kitchen != $("#saturday_kitchen").val()){
                    send_pack.Saturday.kitchen = $("#saturday_kitchen").val();
                    onChangeData = true;
                }
                */
                if (dataModel.information.time_work.res.Sunday.begin != $("#sunday_left").val()){
                    send_pack.Sunday.begin = $("#sunday_left").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Sunday.end != $("#sunday_right").val()){
                    send_pack.Sunday.end = $("#sunday_right").val();
                    onChangeData = true;
                }
                if (dataModel.information.time_work.res.Sunday.kitchen != $("#sunday_kitchen").val()){
                    send_pack.Sunday.kitchen = $("#sunday_kitchen").val();
                    onChangeData = true;
                }

                //Широта
                if (dataModel.information.latitude != $("#latitude_address").val()){
                    var val = parseFloat($("#latitude_address").val());
                    val = val.toFixed(4);
                    send_pack.latitude = val;
                    onChangeData = true;
                }

                //Долгота
                if (dataModel.information.longitude != $("#longitude_address").val()){
                    var val = parseFloat($("#longitude_address").val());
                    val = val.toFixed(4);
                    send_pack.longitude = val;
                    onChangeData = true;
                }

                send_pack.method = "address.edit";
                send_pack.address_id = self.slected_id_address;

                console.log("send_pack");
                console.dir(send_pack);
                console.dir("onChangeData = ", onChangeData);

                if (onChangeData){
                    var ajax_dr = new ajax_driver();
                    var ajaxObj = {    id : "address", pack_id : "edit",   data : send_pack   }

                    ajax_dr.addPack("edit");
                    ajax_dr.addReq(ajaxObj);
                    ajax_dr.setCbOkPack("edit", function(data){ saveLoader(data.response.success); });
                    ajax_dr.setCbErrPack("edit", function(data){ saveLoader(data.response.success); });

                    ajax_dr.sendPack("edit");
                }

                function saveLoader(state){
                    if (state){
                        console.log("OK");
                    }else{
                        console.log("Error");
                    }
                }

            break;
        }
    }


    /*    display:block;
     cursor:pointer;
     width:100px;
     background:#f1f1f1;
     border:2px solid #ccc;
     border-radius:5px;
     text-align:center;
     padding:5px;
     position:fixed;
     top:2%;
     right:15%;
     cursor:pointer;
     color:#666;
     text-decoration:none;
     z-index:100*/

    $("#btn_save").click(function(){
        //заглушка
        var namePage = "Информация";
        self.saveInfo(namePage);
    })

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

		$("button").button();
		$("#opening_date_right").datepicker({
			showButtonPanel: true,
            changeMonth: true,
            changeYear: true,
            nextText: "",
            prevText: ""
        });
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