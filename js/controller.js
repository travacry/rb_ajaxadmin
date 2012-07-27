
//обработка меню
	
	var Controller = function (){
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
			console.log(1);
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
		
	var controller = function(){	
		control = new Controller();
		control.init.base();
	}()
	
