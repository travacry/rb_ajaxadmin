init_data = {};

function manager_page(){
	var ajax_self = this;
	ajax_self.data = {};

	ajax_self.id = 0;
	ajax_self.mod = new Model();

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
				dataModel.pid.Ajax = 0;

				param1.name = "limit";
				param1.val = 2;
				ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "company.get", param1);

				//не пашет
				param1.name = "company_ids";
				param1.val = id_company;
				ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "address.get", param1);

				if (dataModel.pid.Ajax == 0){
					ajax_self.intervalID  = setInterval(function(){
						ajax_self.endCreateModelPage(namePage, data_company, id_address);
						dataModel.pid.Ajax = 1;
					} ,500); //повторение проверки через 30 сек * 3 1.5 мин на ожидание
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
					dataModel[namePage].phone.list = {};

					if (typeof(data_address.phone[0]) != "undefined"){
						for(var next in data_address.phone){
							if (data_address.phone[next].type == 1){
								//основной телефон
								dataModel[namePage].phone.main = data_address.phone[next].phone;
							} else {


								for (var next_type in init_data["phoneType.get"].response){
									if (data_address.phone[next].type == init_data["phoneType.get"].response[next_type].id){
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
					dataModel[namePage].time_work.res.Thursday.kitchen = "";
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