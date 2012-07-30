$(function(){

	var ajaxDriver = new ajax_driver();

	var controller;
	init_data = {};
	var view_g = new View();

	function initPage(){
        console.log("init_data");
        console.dir(init_data);
		controller = new Controller();
		controller.init.base();
	}

	function init(){
		var capacity = 5;
		//http://api.restobank.com/api.php?method=company.get&limit=1
		var ajaxObj_cityGet = {    id : "cityGet", pack_id : "init",    data :  {   method: "city.get"}   }
		var ajaxObj_countryGet = {    id : "countryGet", pack_id : "init",    data :  {   method: "country.get"}   }
		var ajaxObj_subwayGet = {    id : "subwayGet", pack_id : "init",    data :  {   method: "subway.get"}   }
		var ajaxObj_currencyGet = {    id : "currencyGet", pack_id : "init",    data :  {   method: "currency.get"}   }
		var ajaxObj_phoneTypeGet = {    id : "phoneTypeGet", pack_id : "init",    data :  {   method: "phoneType.get"}   }

		ajaxDriver.addPack("init");

		ajaxDriver.addReq(ajaxObj_cityGet);
		ajaxDriver.addReq(ajaxObj_countryGet);
		ajaxDriver.addReq(ajaxObj_subwayGet);
		ajaxDriver.addReq(ajaxObj_currencyGet);
		ajaxDriver.addReq(ajaxObj_phoneTypeGet);
		var count_res = 0;

		//ajax_dr.setCbOKReq(1,2, function(data){ console.dir(data); });
		ajaxDriver.setCbOKReq("init", "cityGet", function(data){ init_data["city.get"] = data; ++count_res; if(count_res == capacity) initPage(); });
		ajaxDriver.setCbOKReq("init", "countryGet", function(data){ init_data["country.get"] = data; ++count_res; if(count_res == capacity) initPage();   });
		ajaxDriver.setCbOKReq("init", "subwayGet", function(data){ init_data["subway.get"] = data; ++count_res; if(count_res == capacity) initPage();  });
		ajaxDriver.setCbOKReq("init", "currencyGet", function(data){ init_data["currency.get"] = data; ++count_res; if(count_res == capacity) initPage(); });
		ajaxDriver.setCbOKReq("init", "phoneTypeGet", function(data){ init_data["phoneType.get"] = data; console.dir(init_data["phoneType.get"].response);  ++count_res; if(count_res == capacity) initPage();  });

		ajaxDriver.setCbErrPack("init", function(xhr, textStatus){} );

		ajaxDriver.setPackTimeout("init", 60000); //3min
		ajaxDriver.sendPack("init");


	}

	init();
	
	//обработка меню


	/*
	var controller = new Controller();
	controller.init.base();
	var view_g = new View();*/
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
				}).trigger('change');
				
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

				$(".del_widgetw17px").button({
					icons: {
						primary: "ui-icon ui-icon-minusthick"
					}
				});

                var html = "";
                var index_main;
                var list_type_phone = {};
                for (var next in init_data["phoneType.get"].response) {
                    list_type_phone[next] = init_data["phoneType.get"].response[next].name[language_main];
                    if (init_data["phoneType.get"].response[next].name[language_main] == "Основной"){
                        index_main = next;
                    } else {
                        html += view_g.manager_widgetEl("phone", "select", "right", init_data["phoneType.get"].response[next].name[language_main]);
                    }
                }
                $("#add_phone").click(function() {
                    //type_phone


                    html =  "<div class='canvas_note_small'>";
                    html += "<div class='canvas_text' style='color: grey;'><p>Факс:</p></div>";
                    html += "<div class='canvas_left' align='left'><input id='phone_right' disabled class='widget80p20px'></input>";
                    html += "<button id='del_phone' class='del_widgetw17px'>Del</button></div>";
                    html += "<div class='canvas_left' align='left'><input id='phone_left' disabled class='widget98p20px'></input></div></div>";

                    $("#ptr_phone").append(html);

                    $(".del_widgetw17px").button();
                    $(".del_widgetw17px").button({  icons: {    primary: "ui-icon ui-icon-minusthick"   }   });

                });


                $("#type_phone").append(html);
				//основной тел.

				//доп. тел

                //карта
                var google_map  = new g_map();

                $("#test_api_googlemap_left").button({ disabled: true });



			break;
		}
	});

	$("#textAddress").on("update_menu", function(e, id_address, id_company){
		controller.init.menu();
	})

	$("#textAddress").on("update_page", function(e, id_address, id_company){

	});
})