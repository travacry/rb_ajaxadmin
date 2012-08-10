send_pack = {};
function save_info(id_address, dataModel){

	//$(".cont").loader_jquery("destroy");

	$(".cont").hide();
	$(".right").append("<div id='save_loader'></div>");
	$("#save_loader").loader_jquery({ type: "cyclic" });
	$("#save_loader").loader_jquery("setMsg", "сохранение");

	var onChangeData = false;

	if (dataModel.opening_date != $("#opening_date_right").val()){
		//Дата открытия  (UTC)
		var str = $("#opening_date_right").val();
		send_pack.opening_date = DT.StrDateToTimestamp(str);
		onChangeData = true;
	}

	//пока только ru
	if (dataModel.description_address[dataModel.language.main] != $("#description_address_right").val()){
		//Описание адреса
		send_pack.description = $("#description_address_right").val();
		onChangeData = true;
	}
	/*
	if (dataModel.phone.main != $("#phone_main").val()){
		//Основной телефон
		send_pack.phone = {};
		send_pack.phone.main = $("#phone_main").val();
		onChangeData = true;
	}
	*/
	if (dataModel.postal_code != $("#postal_code_right").val()){
		//Индекс
		send_pack.postal_code = $("#postal_code_right").val();
		onChangeData = true;
	}
	if (dataModel.capacity_indoor != $("#capacity_indoor_right").val()){
		//Мест в ресторане
		send_pack.capacity_indoor = $("#capacity_indoor_right").val();
		onChangeData = true;
	}
	if (dataModel.capacity_outdoor != $("#capacity_outdoor_right").val()){
		//Мест на террасе
		send_pack.capacity_outdoor = $("#capacity_outdoor_right").val();
		onChangeData = true;
	}

	if (dataModel.country[dataModel.language.main]  != $("#country_right").val()){
		//Страна
		send_pack.country = $("#country_right").val();
		onChangeData = true;
	}
	if (dataModel.city[dataModel.language.main] != $("#city_right").val()){
		//Город
		send_pack.city = $("#city_right").val();
		onChangeData = true;
	}
	/*
	 if (dataModel.subway.main[dataModel.language.main] != $("#subway_right").val()){
	 //Метро
	 send_pack.subway = {};
	 send_pack.subway.main = $("#subway_right").val();
	 onChangeData = true;
	 }
	 */
	if (dataModel.street_list[dataModel.language.main] != $("#address_right").val()){
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

	 if (dataModel.time_work.res.Monday.begin != $("#monday_left").val()){
	 send_pack.Monday.begin = $("#monday_left").val();
	 onChangeData = true;
	 }
	 if (dataModel.time_work.res.Monday.end != $("#monday_right").val()){
	 send_pack.Monday.end = $("#monday_right").val();
	 onChangeData = true;
	 }
	 console.dir(dataModel.time_work.res.Monday.kitchen);
	 if (dataModel.time_work.res.Monday.kitchen != $("#monday_kitchen").val()){
	 send_pack.Monday.kitchen = $("#monday_kitchen").val();
	 onChangeData = true;
	 }

	 if (dataModel.time_work.res.Tuesday.begin != $("#tuesday_left").val()){
	 send_pack.Tuesday.begin = $("#tuesday_left").val();
	 onChangeData = true;
	 }
	 if (dataModel.time_work.res.Tuesday.end != $("#tuesday_right").val()){
	 send_pack.Tuesday.end = $("#tuesday_right").val();
	 onChangeData = true;
	 }
	 if (dataModel.time_work.res.Tuesday.kitchen != $("#tuesday_kitchen").val()){
	 send_pack.Tuesday.kitchen = $("#tuesday_kitchen").val();
	 onChangeData = true;
	 }

	 if (dataModel.time_work.res.Wednesday.begin != $("#wednesday_left").val()){
	 send_pack.Wednesday.begin = $("#wednesday_left").val();
	 onChangeData = true;
	 }
	 if (dataModel.time_work.res.Wednesday.end != $("#wednesday_right").val()){
	 send_pack.Wednesday.end = $("#wednesday_right").val();
	 onChangeData = true;
	 }
	 if (dataModel.time_work.res.Wednesday.kitchen != $("#wednesday_kitchen").val()){
	 send_pack.Wednesday.kitchen = $("#wednesday_kitchen").val();
	 onChangeData = true;
	 }

	 if (dataModel.time_work.res.Thursday.begin != $("#thursday_left").val()){
	 send_pack.Thursday.begin = $("#thursday_left").val();
	 onChangeData = true;
	 }
	 if (dataModel.time_work.res.Thursday.end != $("#thursday_right").val()){
	 send_pack.Thursday.end = $("#thursday_right").val();
	 onChangeData = true;
	 }
	 if (dataModel.time_work.res.Thursday.kitchen != $("#thursday_kitchen").val()){
	 send_pack.Thursday.kitchen = $("#thursday_kitchen").val();
	 onChangeData = true;
	 }

	 if (dataModel.time_work.res.Friday.begin != $("#friday_left").val()){
	 send_pack.Friday.begin = $("#friday_left").val();
	 onChangeData = true;
	 }
	 if (dataModel.time_work.res.Friday.end != $("#friday_right").val()){
	 send_pack.Friday.end = $("#friday_right").val();
	 onChangeData = true;
	 }
	 if (dataModel.time_work.res.Friday.kitchen != $("#friday_kitchen").val()){
	 send_pack.Friday.kitchen = $("#friday_kitchen").val();
	 onChangeData = true;
	 }

	 if (dataModel.time_work.res.Saturday.begin != $("#saturday_left").val()){
	 send_pack.Saturday.begin = $("#saturday_left").val();
	 onChangeData = true;
	 }
	 if (dataModel.time_work.res.Saturday.end != $("#saturday_right").val()){
	 send_pack.Saturday.end = $("#saturday_right").val();
	 onChangeData = true;
	 }
	 if (dataModel.time_work.res.Saturday.kitchen != $("#saturday_kitchen").val()){
	 send_pack.Saturday.kitchen = $("#saturday_kitchen").val();
	 onChangeData = true;
	 }
	 */
	if (dataModel.time_work.res.Sunday.begin != $("#sunday_left").val()){
		send_pack.Sunday.begin = $("#sunday_left").val();
		onChangeData = true;
	}
	if (dataModel.time_work.res.Sunday.end != $("#sunday_right").val()){
		send_pack.Sunday.end = $("#sunday_right").val();
		onChangeData = true;
	}
	if (dataModel.time_work.res.Sunday.kitchen != $("#sunday_kitchen").val()){
		send_pack.Sunday.kitchen = $("#sunday_kitchen").val();
		onChangeData = true;
	}

	//Широта
	if (dataModel.latitude != $("#latitude_address").val()){
		var val = parseFloat($("#latitude_address").val());
		val = val.toFixed(4);
		send_pack.latitude = val;
		onChangeData = true;
	}

	//Долгота
	if (dataModel.longitude != $("#longitude_address").val()){
		var val = parseFloat($("#longitude_address").val());
		val = val.toFixed(4);
		send_pack.longitude = val;
		onChangeData = true;
	}

	send_pack.method = "address.edit";
	send_pack.address_id = id_address;

	console.log("send_pack");
	console.dir(send_pack);


	if (onChangeData){
		var ajax_dr = new ajax_driver();
		var ajaxObj = {    id : "address", pack_id : "edit",   data : send_pack   }
		console.dir(ajaxObj);
		ajax_dr.addPack("edit");
		ajax_dr.addReq(ajaxObj);
		ajax_dr.setCbOkPack("edit", function(data){ saveLoader(data.response.success); });
		ajax_dr.setCbErrPack("edit", function(data){ saveLoader(data.response.success); });

		ajax_dr.sendPack("edit");
	}

	function saveLoader(state){
		if (state){
			console.log("OK");
			$("#save_loader").loader_jquery("setMsg", "сохранение прошло успешно");
			//сохранение данных
			for (var next in mainmenu["address.get"].response){
				if (mainmenu["address.get"].response[next].id ==  id_address){
					if (typeof(send_pack.opening_date) != "undefined")
						mainmenu["address.get"].response[next].opening_date = send_pack.opening_date;
					if (typeof(send_pack.description) != "undefined")
						mainmenu["address.get"].response[next].description[dataModel.language.main] = send_pack.description;
					if (typeof(send_pack.latitude) != "undefined")
						mainmenu["address.get"].response[next].address.latitude =	send_pack.latitude;
					if (typeof(send_pack.longitude) != "undefined")
						mainmenu["address.get"].response[next].address.longitude =	send_pack.longitude;
					if (typeof(send_pack.postal_code) != "undefined")
						mainmenu["address.get"].response[next].address.postal_code = send_pack.postal_code;
					if (typeof(send_pack.street) != "undefined")
						mainmenu["address.get"].response[next].address.street[dataModel.language.main] = send_pack.street;
					if (typeof(send_pack.capacity_indoor) != "undefined")
						mainmenu["address.get"].response[next].capacity.indoor = send_pack.capacity_indoor;
					if (typeof(send_pack.capacity_outdoor) != "undefined")
						mainmenu["address.get"].response[next].capacity.outdoor = send_pack.capacity_outdoor;
				}
			}
			$(".right").fadeOut(1000, function(){
				$("#m_info").click();
				$(".right").fadeIn(1000);
			})
		}else{
			console.log("Error");
			$("#save_loader").loader_jquery("setMsg", "сохранение завершилось ошибкой");
			$(".right").fadeOut(3000, function(){
				$("#m_info").click();
				$(".right").fadeIn(1000);
			})
		}
	}
}