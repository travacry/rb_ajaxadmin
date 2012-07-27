$(document).ready(function(){
	
	
	
	//��������� ����
	function Controller(){
		var self = this;
		
		//<id-����
		self.slected_id_address;
		self.selected_id_company;
		//>
		
		self.view = new View();
		self.managerAjax = new manager_ajax();
		
		self.init = {};
		self.manager_el = {};
		self.count_list = {};
		
		self.init.menu = function(){
			//��� ���������� , �������� ����
			$(".menu").html("");
			var html = "";
			//view
			html += self.view.manager_el("menu","li", "�������"); //id, type, text
			html += self.view.manager_el("menu","li", "����");
			html += self.view.manager_el("menu","li", "����������");
			html += self.view.manager_el("menu","li", "������");
			html += self.view.manager_el("menu","li", "��������");
			html += self.view.manager_el("menu","li", "�������");
			html += self.view.manager_el("menu","li", "���������");
			html += self.view.manager_el("menu","li", "���������");
			$(".menu").append(html);			
			//controller
			self.manager_el.click("menu", "a", "�������", self.slected_id_address, self.selected_id_company);
			self.manager_el.click("menu", "a", "����");
			self.manager_el.click("menu", "a", "����������", self.slected_id_address, self.selected_id_company);
			self.manager_el.click("menu", "a", "������");
			self.manager_el.click("menu", "a", "��������");
			self.manager_el.click("menu", "a", "�������");
			self.manager_el.click("menu", "a", "���������");
			self.manager_el.click("menu", "a", "���������");
		}
		
		//limit ����� ����������� api -> sid
		self.limit = 2;
		//������ ������������� �������
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
						//������ ���������
						self.list_logo["" + name_company] = data.response[next].logo["114"];
						//������ ��������
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
						//����
						self.list_foto["" + next] = data.response[next].image[114];
						self.list_address_id["" + next] = data.response[next].id;
						self.list_address_name["" + next] = data.response[next].address.street[self.language];
						//������
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
				case "�������":
					self.createPage.news();
					self.managerAjax.beginCreateModelPage("news");						
				break;
				case "����":
					self.createPage.menu();
					self.managerAjax.beginCreateModelPage("menu");				
				break;
				case "����������":
					self.createPage.information();
					self.managerAjax.beginCreateModelPage("information", self.slected_id_address, self.selected_id_company);
				break;
				case "������":
					self.createPage.reviews();
					self.managerAjax.beginCreateModelPage("reviews");					
				break;
				case "��������":
					self.createPage.interior();
					self.managerAjax.beginCreateModelPage("interior");									
				break;
				case "�������":
					self.createPage.clients();
					self.managerAjax.beginCreateModelPage("clients");					
				break;
				case "���������":
					self.createPage.settings();
					self.managerAjax.beginCreateModelPage("settings");					
				break;
				case "���������":
					self.createPage.photoreports();
					self.managerAjax.beginCreateModelPage("photoreports");					
				break;
			}
		}
		
		
		
		self.createPage = {};
		//��� ������ ���������� ���
		
		//�������� - �������
		self.createPage.news = function(){
			var html = new EJS({url: 'templates/news/news.ejs'}).render();
			$(".right").html(html);
		}
		
		//�������� - ����
		self.createPage.menu = function(){
			var html = new EJS({url: 'templates/menu/menu.ejs'}).render();
			$(".right").html(html);			
		}
		//�������� - ���������� � ��������
		self.createPage.information = function(){
			var html = new EJS({url: 'templates/information/information.ejs'}).render();
			$(".right").html(html);
		}
		
		//�������� - ������
		self.createPage.reviews = function(){
			var html = new EJS({url: 'templates/reviews/reviews.ejs'}).render();
			$(".right").html(html);		
		}
		
		//�������� - ��������
		self.createPage.interior = function(){
			var html = new EJS({url: 'templates/interior/interior.ejs'}).render();
			$(".right").html(html);				
		}
		
		//�������� - �������
		self.createPage.clients = function(){
			var html = new EJS({url: 'templates/clients/clients.ejs'}).render();
			$(".right").html(html);			
		}
		
		//�������� - ���������
		self.createPage.settings = function(){
			var html = new EJS({url: 'templates/settings/settings.ejs'}).render();
			$(".right").html(html);		
		}
		
		//�������� - ����������
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
			console.log($("div:contains('��������')").html()); 
			/*
					for (nextElement in $("div.canvas_text")){
						if (nextElement.match(/^[-\+]?\d+/) === null){
						} else { 							
							var re = /[�-��-�]+/;
							var name = $("div.canvas_text").get(nextElement);
							name = $(name).html();


							switch(name.match(re)[0]){
								case "����":
									console.log("ObjModelPage");
									console.log(ObjModelPage.language.main);
									//$("div.canvas_text").get(nextElement).html("ObjModelPage.language.main");
								break;
								case "��������":
								break;
								case "��������":
								break;
								case "�����������":
								break;
								case "����":
								break;
								case "�������":
								break;
								case "����":
								break;
								case "�������":
								break;
								case "������":
								break;
								case "�����������":
								break;
								case "�����":
								break;
								case "��������":
								break;
								case "�������":
								break;
								case "������":
								break;
								case "�����":
								break;
								case "�����":
								break;
								case "�����":
								break;
								case "�����������":
								break;
								case "�������":
								break;	
								case "�����":
								break;	
								case "�������":
								break;							
								case "�������":
								break;	
								case "�������":
								break;
								case "������":
								break;	
								case "�����":
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
					html += '<input id="' + 'save_' + id + '" type="button" value="���������" style="float: right;"></input>';
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
					return '<img src="../images/loading.gif" alt="�������" id="logo" width="100px" class="passe-partout">';
				break;
				case "foto":
					return '<img src="../images/loading.gif" alt="����" id="foto" class="passe-partout">';
				break;
				case "logo_req":
					return '<img src="' + text + '" alt="�������" id="logo" class="passe-partout">';
				break;
				case "foto_req":
					return '<img src="' + text + '" alt="����" id="foto" class="passe-partout">';
				break;										
			}
		}
	}
	
	function Model(){
		
		var self = this;
		//���-�� ��������
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
						//����� ���-�� ������� �� �������
						if (typeof(self.count_response["" + manager_param]) == "undefined")
							self.count_response["" + manager_param] = 1;
						else
							++self.count_response["" + manager_param];
						
						//������ ��� ������� ���������
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
		
		//��� �����������
		/*
		self.base_info;
		self.imformation_about_company;
		self.information_about_address;
		self.time_work_res;
		self.location;
		*/
		
		ajax_self.test = function(){
		}
		
		//����� ��������� �������� ���������� �������
		ajax_self.count_endCreateModelPage = 0;
		
		ajax_self.endCreateModelPage = function(namePage){
			
			if (self.pid.Ajax == 1){}
		
			if (ajax_self.count_endCreateModelPage == 3){
				clearInterval(ajax_self.intervalID);
				console.log("error");
			}
			
			if(ajax_self.mod.count_request["" + namePage] == ajax_self.mod.count_response["" + namePage]){
				clearInterval(ajax_self.intervalID);
				//����� �������
				ajax_self.createPageModel(namePage);
			}
			++ajax_self.count_endCreateModelPage;
		}
		
		/*
		self.CreateViewPage = function(namePage){
			//������ ��� ������ �������������
			//���������� ��� �������
			switch(namePage){
				case: "information":
					
				break;
			}
		}
		*/
		
		ajax_self.AddDataAjax = function(data, nameMethod){
			
			//���������� ������ � ������
			for(name in data){
				ajax_self.data[nameMethod] = {};
				ajax_self.data[nameMethod][name] = data["" + name];
			}
			console.dir(data);
		}
		
		//process id .Ajax �������� �� ��������
		self.pid = {};
		ajax_self.intervalID = "";
		ajax_self.beginCreateModelPage = function(namePage, id_address, id_company){
		
			//������ ������
			ajax_self.data = {};
			//ajax ������
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
					
					//�������� �������
					ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "currency.get");
					//������ �������
					ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "country.get");

					//wait
					if (self.pid.Ajax == 0){
						ajax_self.intervalID  = setInterval(function(){
							ajax_self.endCreateModelPage(namePage);  
							self.pid.Ajax = 1;
						} ,2000); //���������� �������� ����� 30 ��� * 3 1.5 ��� �� ��������
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
			//���������� ������ � ������
			//							����������� ������ 
			
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
					//����� �� ������ ������ 
					
					if (self.pid.Ajax == 1){
						/* �������� */
						
						//���� - [] ��� [0]
						self[namePage].language = {};
						self[namePage].language.main = ajax_self.data["company.get"].response[0].language.shift();
						self[namePage].language.list = ajax_self.data["company.get"].response[0].language;
						
						//��������
						self[namePage].name_company = ajax_self.data["company.get"].response[0].name;
						//��������
						self[namePage].description_company = ajax_self.data["company.get"].response[0].description;
						//����������� ���� ?
						self[namePage].juridical_person = "";
						//������� ���� ��� ���.
						self[namePage].no_cash = ajax_self.data["company.get"].response[0].check;
						//��� ������ �������
						self[namePage].no_cash = ajax_self.data["currency.get"].response[0].sign; //obj id=1, ���.
						//������ ��������� ?
						self[namePage].money_unit = "";
						//������� �������� ����� ��� ���. (���� ������� ?)
						self[namePage].reiting_no_cash = ajax_self.data["company.get"].response[0].check;
						
						/* ����� */
						
						//���� �������� (null ? ?? )
						self[namePage].opening_date = ajax_self.data["address.get"].response[0].opening_date;
						//���� (!!! ����� -> �����)
						self[namePage].site = ajax_self.data["company.get"].response[0].site;
						//������� (� �������� ���� ?)
						self[namePage].phone = {};
						self[namePage].phone = ajax_self.data["address.get"].response[0].phone;
						if (typeof(ajax_self.data["address.get"].response[0].phone[0]) != "undefined"){
							self[namePage].phone = {};
							self[namePage].phone.list = ajax_self.data["address.get"].response[0].phone;
							//�������� �������
							self[namePage].phone.main = ajax_self.data["address.get"].response[0].phone.shift();
						}
						//������
						self[namePage].postal_code = ajax_self.data["address.get"].response[0].address.postal_code;
						//��������
						self[namePage].description_address = ajax_self.data["address.get"].response[0].description;
						//���-�� ���������� ���� :
							//��������:
							self[namePage].capacity_indoor = ajax_self.data["address.get"].response[0].capacity.indoor;
							//�������:
							self[namePage].capacity_outdoor = ajax_self.data["address.get"].response[0].capacity.outdoor;
						//self["" + namePage].city = ajax_self.data["address.get"].response[0].address.city_id;
						//����� (id):
						if (typeof(ajax_self.data["address.get"].response[0].address.subway_id[0]) != "undefined"){
							self[namePage].subway = {};
							self[namePage].subway.ids = ajax_self.data["address.get"].response[0].address.subway_id;
							//�������� �����
							self[namePage].subway.main = self[namePage].subway.ids.shift();
						}
						//�����:
						self[namePage].street_list = ajax_self.data["address.get"].response[0].address.street;
						//����� ������:
						self[namePage].time_work = {};
						self[namePage].time_work.res = {};
							//�����������	
							self["" + namePage].time_work.res.Monday = {};
							self["" + namePage].time_work.res.Monday.begin = "";
							self["" + namePage].time_work.res.Monday.end = "";
							//�������
							self["" + namePage].time_work.res.Tuesday = {};
							self["" + namePage].time_work.res.Tuesday.begin = "";
							self["" + namePage].time_work.res.Tuesday.end = "";
							//�����
							self["" + namePage].time_work.res.Wednesday = {};
							self["" + namePage].time_work.res.Wednesday.begin = "";
							self["" + namePage].time_work.res.Wednesday.end = "";
							//�������
							self["" + namePage].time_work.res.Thursday = {};
							self["" + namePage].time_work.res.Thursday.begin = "";
							self["" + namePage].time_work.res.Thursday.end = "";
							//�������
							self["" + namePage].time_work.res.Friday = {};
							self["" + namePage].time_work.res.Friday.begin = "";
							self["" + namePage].time_work.res.Friday.end = "";
						//�������
						self["" + namePage].time_work.longitude = ajax_self.data["address.get"].response[0].address.longitude;
						//������
						self["" + namePage].time_work.latitude = ajax_self.data["address.get"].response[0].address.latitude;
						//������:
						self["" + namePage].country = {};
						self["" + namePage].country.list = [];
							//id ������
							self["" + namePage].country.id = ajax_self.data["address.get"].response[0].address.country_id;
							
						
						self.pid.Ajax = 2;
					}
					//���������������� ������ (����������� ����� ������ ����� ��������)
					if (self.pid.Ajax == 2){

						//�����:
						if (typeof(ajax_self.data["city.get"]) == "undefined"){
							param1 = {};
							param1.name = "country_id";
							param1.val = self[namePage].country.id;
							ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "city.get", param1);
						}
						//�������� ������:
						if (typeof(ajax_self.data["country.get"]) == "undefined"){
							/* ��������� ������� : http://api.restobank.com/api.php?method=country.get&country_id=123123
							param1 = {};
							param1.name = "country_id";
							param1.val = self[namePage].country.id;
							ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "country.get", param1);
							*/
						}
						//�������� �����:
						if (typeof(ajax_self.data["subway.get"]) == "undefined"){
							/* ��������� ������� : http://api.restobank.com/api.php?method=subway.get&subway_id=123123
							param1 = {};
							param1.name = "subway_id";
							param1.val = self[namePage].country.id;
							ajax_self.mod.driver_ajax(1, ajax_self.AddDataAjax, "information", "subway.get", param1);
							*/
						}
						
						ajax_self.intervalID  = setInterval(function(){ self.pid.Ajax = 3; ajax_self.endCreateModelPage(namePage);  } ,2000);
					}
					
					
					//���� �� ���������������� ������
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
					
					//���������� ��������
					
					
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