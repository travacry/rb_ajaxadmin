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