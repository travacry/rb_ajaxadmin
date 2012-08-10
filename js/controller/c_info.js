function c_info(dataModel, fixid){
	var self = this;
	self.init = function(){
		var language_main = dataModel.language.main;//1

		$("#language_right").html("");
		$("#language_right").html('<select id="language_right" disable class="widgetlang"></select>');
		$("#language_right").append('<option>' + language_main + '</option>');



		var list = dataModel.language.list;
		var html = "";
		$("#language_left").html("");
		$("#language_left").html('<select id="language_left" class="widgetlang"></select>');
		for(var next in list){
			html += '<option>' + list[next] + '</option>';
		}
		$("#language_left").append(html);



		var language_left;
		$("#language_left").bind('change', function() {
			$("#language_left option:selected").each(function () {
				language_left = $(this).text();

				//Название
				var val = dataModel.name_company[language_left];
				$("#name_company_left").val(val);

				//Описание(компания)
				val = dataModel.description_company[language_left];
				$("#description_company_left").val(val);

				//Описание(адрес)
				val = dataModel.description_address[language_left];
				$("#description_address_left").val(val);

				//Страна
				val = dataModel.country[language_left];
				$("#country_left").val(val);

				//Город
				val = dataModel.city[language_left];
				$("#city_left").val(val);

				//Метро
				val = dataModel.subway.main[language_left];
				$("#subway_left").val(val);

				//Адрес
				val = dataModel.street_list[language_left];
				$("#address_left").val(val);

			});
		}).trigger('change');

		//right

		//Название
		var val = dataModel.name_company[language_main];
		$("#name_company_right").val(val);

		//Описание(компания)
		val = dataModel.description_company[language_main];
		$("#description_company_right").val(val);

		//Юридическое лицо
		val = dataModel.juridical_person;
		val = "обговорить момент";
		$("#juridical_person_right").val(val);
		$("#juridical_person_left").val(val);

		//Сайт
		val = dataModel.site;
		$("#site_right").val(val);
		$("#site_left").val(val);

		//Средний счет без нал.
		val = dataModel.no_cash;
		$("#no_cash_right").val(val);
		$("#no_cash_left").val(val);

		//Дата открытия
		unix_timestamp = dataModel.opening_date;
		if (unix_timestamp != null){
			val = DT.TimestampToStrDate(unix_timestamp);

			$("#opening_date_right").val(val);
			$("#opening_date_left").val(val);

			$("#opening_date_right").mask("99/99/9999");
		}
		//Описание(адрес)
		val = dataModel.description_address[language_main];
		$("#description_address_right").val(val);

		//"Индекс"
		val = dataModel.postal_code;
		$("#postal_code_right").val(val);
		$("#postal_code_left").val(val);
		$("#postal_code_right").mask("999999");

		//Всего (посадочных мест)
		val = dataModel.capacity_all;
		$("#capacity_all_right").val(val);
		$("#capacity_all_left").val(val);

		//Ресторан
		val = dataModel.capacity_indoor;
		$("#capacity_indoor_right").val(val);
		$("#capacity_indoor_left").val(val);
		$("#capacity_indoor_right").mask("?9999");

		//Терраса
		val = dataModel.capacity_outdoor;
		$("#capacity_outdoor_right").val(val);
		$("#capacity_outdoor_left").val(val);
		$("#capacity_outdoor_right").mask("?9999");

		//Страна
		val = dataModel.country[language_main];
		$("#country_right").val(val);

		//Город
		val = dataModel.city[language_main];
		$("#city_right").val(val);

		//Метро
		val = dataModel.subway.main[language_main];
		$("#subway_right").val(val);

		//Адрес
		val = dataModel.street_list[language_main];
		$("#address_right").val(val);

		//Понедельник
		val = dataModel.time_work.res.Monday.begin;
		$("#monday_left").val(val);
		val = dataModel.time_work.res.Monday.end;
		$("#monday_right").val(val);
		val = dataModel.time_work.res.Monday.kitchen;
		$("#monday_kitchen").val(val);

		//Вторник
		val = dataModel.time_work.res.Tuesday.begin;
		$("#tuesday_left").val(val);
		val = dataModel.time_work.res.Tuesday.end;
		$("#tuesday_right").val(val);
		val = dataModel.time_work.res.Tuesday.kitchen;
		$("#tuesday_kitchen").val(val);

		//Среда
		val = dataModel.time_work.res.Wednesday.begin;
		$("#wednesday_left").val(val);
		val = dataModel.time_work.res.Wednesday.end;
		$("#wednesday_right").val(val);
		val = dataModel.time_work.res.Wednesday.kitchen;
		$("#wednesday_kitchen").val(val);

		//Четверг
		val = dataModel.time_work.res.Thursday.begin;
		$("#thursday_left").val(val);
		val = dataModel.time_work.res.Thursday.end;
		$("#thursday_right").val(val);
		val = dataModel.time_work.res.Thursday.kitchen;
		$("#thursday_kitchen").val(val);

		//Пятница
		val = dataModel.time_work.res.Friday.begin;
		$("#friday_left").val(val);
		val = dataModel.time_work.res.Friday.end;
		$("#friday_right").val(val);
		val = dataModel.time_work.res.Friday.kitchen;
		$("#friday_kitchen").val(val);

		//Суббота
		val = dataModel.time_work.res.Saturday.begin;
		$("#saturday_left").val(val);
		val = dataModel.time_work.res.Saturday.end;
		$("#saturday_right").val(val);
		val = dataModel.time_work.res.Saturday.kitchen;
		$("#saturday_kitchen").val(val);

		//Воскресенье
		val = dataModel.time_work.res.Sunday.begin;
		$("#sunday_left").val(val);
		val = dataModel.time_work.res.Sunday.end;
		$("#sunday_right").val(val);
		val = dataModel.time_work.res.Sunday.kitchen    ;
		$("#sunday_kitchen").val(val);

		//Долгота
		val = dataModel.longitude;
		$("#current_longitude").val(val);

		//Широта
		val = dataModel.latitude;
		$("#current_latitude").val(val);

		//"Телефон"

		var additional_phone = new Phone();
		//dataModel[namePage].phone.list
		val = dataModel.phone.main;

		for(var next in dataModel.phone.list){
			if (typeof(dataModel.phone.list[next]) != "undefined"){
				additional_phone.addPhone(dataModel.phone.list[next], next);
			}
		}

		$("#phone_main").val(val);
		$("#phone_main_right").val(val);
		$("#phone_right").mask("+7(999) 999-9999");

		$("#phone_main").mask("+7(999) 999-9999");

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

		function Phone(){
			var self = this;
			self.count_btn_del = 0;
			//type_phone
			self.addPhone = function(number, type){

				if (typeof(number) == "undefined"){
					var reg = /[\(,\),\ ,\-,\[,\]]/g;
					self.phone_right_val = ($("#phone_right").val() + "").replace(reg, "");
				} else
					self.phone_right_val = number;

				if((self.phone_right_val != "")){
					++self.count_btn_del;
					if (!$("#phone_left_" + self.count_btn_del).val()){
						if (typeof(type) == "undefined"){
							var selector = document.getElementById("type_phone");
							var type = selector.options[selector.selectedIndex].innerHTML;
						}

						var class_btn_del = 'canvas_note_small ' + 'del_phone_' + self.count_btn_del;

						html =  "<div class='" + class_btn_del +"'>";
						html += "<div class='canvas_text' style='color: grey;'><p>" + type + ":</p></div>";
						html += "<div class='canvas_left' align='left'><input id='phone_right_" + self.count_btn_del + "' disabled class='widget80p20px'></input>";
						html += "&nbsp";
						html += "<button id='btn_del_phone_" + self.count_btn_del + "' class='del_widgetw17px'>Del</button></div>";
						html += "<div class='canvas_left' align='left'><input id='phone_left_" + self.count_btn_del + "' disabled class='widget98p20px'></input></div></div>";

						$("#ptr_phone").append(html);
						$(".del_widgetw17px").button();
						//$(".del_phone_" + self.count_btn_del).css("border","3px solid red");
						//$("#btn_del_phone_" + self.count_btn_del).css("border","3px solid red");

						$("#phone_right_" + self.count_btn_del).val(self.phone_right_val);
						$("#phone_left_" + self.count_btn_del).val(self.phone_right_val);
						$("#phone_right").val("");
					}
				}

				$("#btn_del_phone_" + self.count_btn_del).bind("click", function(event){
					var parent = $(this).parents();
					var str = ($(parent[1]).attr("class"));
					var str_=str.replace(/\s/,'.');
					$("." + str_).hide();
					$("." + str_).html("");
				});

				$(".del_widgetw17px").button({  icons: {    primary: "ui-icon ui-icon-minusthick"   }   });

			};

			self.delPhone = function(type){};

		}



		var html = "";
		var index_main;
		var list_type_phone = {};

		for (var next in fixid["phoneType.get"].response) {
			list_type_phone[next] = fixid["phoneType.get"].response[next].name[language_main];
			if (fixid["phoneType.get"].response[next].name[language_main] == "Основной"){
				index_main = next;
			} else {
				var list_phone = fixid["phoneType.get"].response[next].name[language_main];
				html += '<option>' + list_phone + '</option>';
			}
		}



		$("#add_phone").click(function() {
			additional_phone.addPhone();
		});


		$("#type_phone").append(html);
		//основной тел.

		//доп. тел

		//карта
		delete google_map;
		$("#map_canvas").html("");
		var google_map  = new g_map();


		$("#test_api_googlemap_left").button({ disabled: true });


	///////////////////////////////////////////////////////////////////////////////////////////////////////////
		self.el_focus;
		$("#juridical_person_right").focusin(function(){ self.el_focus = "juridical_person_right"; });
		$("#site_right").focusin(function(){ self.el_focus = "site_right"; });
		$("#no_cash_right").focusin(function(){ self.el_focus = "no_cash_right"; });
		$("#opening_date_right").focusin(function(){ self.el_focus = "opening_date_right"; });
		$("#phone_main").focusin(function(){ self.el_focus = "phone_main"; });
		$("#postal_code_right").focusin(function(){ self.el_focus = "postal_code_right"; });
		$("#capacity_indoor_right").focusin(function(){ self.el_focus = "capacity_indoor_right"; });
		$("#capacity_outdoor_right").focusin(function(){ self.el_focus = "capacity_outdoor_right"; });

		window.addEventListener('keydown', handler, false);
		//window.addEventListener('keypress', handler, false);
		window.addEventListener('keyup', handler, false);

		function handler(event) {
			switch(self.el_focus){
				case "juridical_person_right":
					$("#juridical_person_left").val($("#juridical_person_right").val());
				break;
				case "site_right":
					$("#site_left").val($("#site_right").val());
				break;
				case "no_cash_right":
					$("#no_cash_left").val($("#no_cash_right").val());
				break;
				case "opening_date_right":
					$("#opening_date_left").val($("#opening_date_right").val());
				break;
				case "phone_main":
					$("#phone_main_left").val($("#phone_main_right").val());
				break;
				case "postal_code_right":
					$("#postal_code_left").val($("#postal_code_right").val());
				break;
				case "capacity_indoor_right":
					$("#capacity_indoor_left").val($("#capacity_indoor_right").val());
				break;
				case "capacity_outdoor_right":
					$("#capacity_outdoor_left").val($("#capacity_outdoor_right").val());
				break;
			}
		}
	}
}