
	function m_info(id_address, id_company, namePage, mainmenu, fixed){
		var dataModel = {};

		dataModel[namePage] = {};

		var data_address;
		var data_company;

		for (var next in mainmenu["address.get"].response){
			if (mainmenu["address.get"].response[next].id == id_address)
				data_address = mainmenu["address.get"].response[next];
		}

		for (var next in mainmenu["company.get"].response){
			if (mainmenu["company.get"].response[next].id == id_company)
				data_company = mainmenu["company.get"].response[next];
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

		/* Адрес */

		//Дата открытия (null ? ?? )
		dataModel[namePage].opening_date = data_address.opening_date;
		//Сайт (!!! косяк -> адрес)
		dataModel[namePage].site = data_company.site;
		//Телефон
		dataModel[namePage].phone = {};
		dataModel[namePage].phone.list = {};

		if (typeof(data_address.phone[0]) != "undefined"){
			for(var next in data_address.phone){
				if (data_address.phone[next].type == 1){
					//основной телефон
					dataModel[namePage].phone.main = data_address.phone[next].phone;
				} else {
					for (var next_type in fixed["phoneType.get"].response){
						if (data_address.phone[next].type == fixed["phoneType.get"].response[next_type].id){
							var name_type = fixed["phoneType.get"].response[next_type].name[dataModel[namePage].language.main];
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
		dataModel[namePage].capacity_all = parseInt(dataModel[namePage].capacity_indoor) + parseInt(dataModel[namePage].capacity_outdoor);


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
				dataModel["" + namePage].time_work.res.Monday.begin = getformatSM(data_address.worktime[1][0][0]);
			if (typeof(data_address.worktime[1][0][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Monday.end = getformatSM(data_address.worktime[1][0][1]);
		}
		if (typeof(data_address.worktime[1][1]) != "undefined"){
			if (typeof(data_address.worktime[1][1][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Monday.kitchen = getformatSM(data_address.worktime[1][1][0]);
		}
		//Вторник
		if (typeof(data_address.worktime[2][0]) != "undefined"){
			if (typeof(data_address.worktime[2][0][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Tuesday.begin = getformatSM(data_address.worktime[2][0][0]);
			if (typeof(data_address.worktime[2][0][1]) != "undefined")
				dataModel["" + namePage].time_work.res.Tuesday.end = getformatSM(data_address.worktime[2][0][1]);
		}
		if (typeof(data_address.worktime[2][1]) != "undefined"){
			if (typeof(data_address.worktime[2][1][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Tuesday.kitchen = getformatSM(data_address.worktime[2][1][0]);
		}
		//Среда
		if (typeof(data_address.worktime[3][0]) != "undefined"){
			if (typeof(data_address.worktime[3][0][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Wednesday.begin = getformatSM(data_address.worktime[3][0][0]);
			if (typeof(data_address.worktime[3][0][1]) != "undefined")
				dataModel["" + namePage].time_work.res.Wednesday.end = getformatSM(data_address.worktime[3][0][1]);
		}
		if (typeof(data_address.worktime[3][1]) != "undefined"){
			if (typeof(data_address.worktime[3][1][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Wednesday.kitchen = getformatSM(data_address.worktime[3][1][0]);
		}
		//Четверг
		if (typeof(data_address.worktime[4][0]) != "undefined"){
			if (typeof(data_address.worktime[4][0][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Thursday.begin = getformatSM(data_address.worktime[4][0][0]);
			if (typeof(data_address.worktime[4][0][1]) != "undefined")
				dataModel["" + namePage].time_work.res.Thursday.end = getformatSM(data_address.worktime[4][0][1]);
		}
		if (typeof(data_address.worktime[4][1]) != "undefined"){
			if (typeof(data_address.worktime[4][1][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Thursday.kitchen = getformatSM(data_address.worktime[4][1][0]);
		}
		//Пятница
		if (typeof(data_address.worktime[5][0]) != "undefined"){
			if (typeof(data_address.worktime[5][0][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Friday.begin = getformatSM(data_address.worktime[5][0][0]);
			if (typeof(data_address.worktime[5][0][1]) != "undefined")
				dataModel["" + namePage].time_work.res.Friday.end = getformatSM(data_address.worktime[5][0][1]);
		}
		if (typeof(data_address.worktime[5][1]) != "undefined"){
			if (typeof(data_address.worktime[5][1][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Friday.kitchen = getformatSM(data_address.worktime[5][1][0]);
		}
		//Суббота
		if (typeof(data_address.worktime[6][0]) != "undefined"){
			dataModel["" + namePage].time_work.res.Saturday = {};
			if (typeof(data_address.worktime[6][0][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Saturday.begin = getformatSM(data_address.worktime[6][0][0]);
			if (typeof(data_address.worktime[6][0][1]) != "undefined")
				dataModel["" + namePage].time_work.res.Saturday.end = getformatSM(data_address.worktime[6][0][1]);
		}
		if (typeof(data_address.worktime[6][1]) != "undefined"){
			if (typeof(data_address.worktime[6][1][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Saturday.kitchen = getformatSM(data_address.worktime[6][1][0]);
		}
		//Воскресенье
		if (typeof(data_address.worktime[0][0]) != "undefined"){
			dataModel["" + namePage].time_work.res.Sunday = {};
			if (typeof(data_address.worktime[0][0][0]) != "undefined")
				dataModel["" + namePage].time_work.res.Sunday.begin = getformatSM(data_address.worktime[0][0][0]);
			if (typeof(data_address.worktime[0][0][1]) != "undefined")
				dataModel["" + namePage].time_work.res.Sunday.end = getformatSM(data_address.worktime[0][0][1]);
		}
		if (typeof(data_address.worktime[6][1]) != "undefined"){
			if (typeof(data_address.worktime[6][1][1]) != "undefined")
				dataModel["" + namePage].time_work.res.Sunday.kitchen = getformatSM(data_address.worktime[6][1][1]);
		}

		//Долгота
		dataModel["" + namePage].longitude = data_address.address.longitude;
		//Широта
		dataModel["" + namePage].latitude = data_address.address.latitude;


		//Город:
		for(var res in fixed["city.get"].response){
			if (fixed["city.get"].response[res].id == data_address.address.city_id){
				dataModel["" + namePage].city = fixed["city.get"].response[res].name;
			}
		}

		//Страна:
		for(var res in fixed["country.get"].response){
			if (fixed["country.get"].response[res].id == data_address.address.country_id){
				dataModel[namePage].country = fixed["country.get"].response[res].name;
			}
		}

		//Метро:
		var count = 0;
		dataModel[namePage].subway = {};
		dataModel[namePage].subway.list = [];
		for(var res in fixed["subway.get"].response){
			for (var next in mainmenu["address.get"].response[0].address.subway_id){
				if (fixed["subway.get"].response[res].id == data_address.address.subway_id[next]){
					dataModel["" + namePage].subway.list[count] = fixed["subway.get"].response[res].name;
					++count;
				}
			}
		}
		//основное метро
		dataModel[namePage].subway.main = dataModel[namePage].subway.list.shift();


		//Валюта ресторана:
		var resto_val = fixed["currency.get"].response[0].sign;	//.руб	(пока обьект 1)
		//Средний счет без нал.:
		dataModel[namePage].no_cash = data_company.price.check + " " + resto_val;

		return dataModel;
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		function getformatSM(sec){
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