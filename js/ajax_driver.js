////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
	create 2012, trava(ajax, transfer packets)
*/
function ajax_driver(){
	/*
	 example:

	 //http://api.restobank.com/api.php?method=company.get&limit=1
	 var ajaxObj_companyGet_limit1 = {    id : 1, pack_id : 1,    data :  {   method: "company.get",  limit: 1}   }
	 var ajaxObj_companyGet_limit2 = {    id : 2, pack_id : 1,    data :  {   method: "company.get",  limit: 2}   }

	 var ajax_dr = new ajax_driver();
	 ajax_dr.addPack(1);
	 ajax_dr.addReq(ajaxObj_companyGet_limit1);
	 ajax_dr.addReq(ajaxObj_companyGet_limit2);

	 //ajax_dr.setCbOKReq(1,2, function(data){ console.dir(data); });
	 ajax_dr.setCbOkPack(1, function(data){ console.dir(data); });
	 ajax_dr.setCbErrReq(1,1, function(xhr, textStatus){ console.log(textStatus); });

	 ajax_dr.sendPack(1);

	 */

	var self = this;
	self.pack = {};

	self.addPack = function(pack_id){
		if (typeof(pack_id) != "undefined"){
			self.pack[pack_id] = {};
			self.pack[pack_id]._timeout = 180000;
			self.pack[pack_id]._url = "http://api.restobank.com/api.php";
			self.pack[pack_id]._type = "POST";
			self.pack[pack_id]._dataType = "json";
			self.pack[pack_id]._cache = false;
		}
	}

	self.addReq = function(req_obj){

		/*
		 id, pack_id, url, type(get,post), timeout, method1, method2
		 */
		if(typeof(req_obj) == "object"){
			if ((typeof(req_obj.pack_id) != "undefined") && (typeof(self.pack[req_obj.pack_id][req_obj.id]) == "undefined")){

				self.pack[req_obj.pack_id][req_obj.id] = {};

				self.pack[req_obj.pack_id][req_obj.id].id;
				self.pack[req_obj.pack_id][req_obj.id].pack_id;
				self.pack[req_obj.pack_id][req_obj.id].url = self.pack[req_obj.pack_id]._url;
				self.pack[req_obj.pack_id][req_obj.id].type = self.pack[req_obj.pack_id]._type;
				self.pack[req_obj.pack_id][req_obj.id].timeout = self.pack[req_obj.pack_id]._timeout;
				self.pack[req_obj.pack_id][req_obj.id].data;
				self.pack[req_obj.pack_id][req_obj.id].dataType = self.pack[req_obj.pack_id]._dataType;
				self.pack[req_obj.pack_id][req_obj.id].cache = self.pack[req_obj.pack_id]._cache;
				self.pack[req_obj.pack_id][req_obj.id].success;
				self.pack[req_obj.pack_id][req_obj.id].error;

				for (var next in req_obj){
					if ((next == "pack_id")||(next == "id")) continue;
					self.pack[req_obj.pack_id][req_obj.id][next] = req_obj[next];
				}

				return true;
			}
		}
		return false
	}


	self.deletePack = function(pack_id){
		if (typeof(pack_id) != "undefined")
			return delete self.pack[pack_id];
		else
			return false;
	}

	self.clearReq = function(pack_id, req_id){
		if (typeof(req_id) != "undefined")
			return delete self.pack[pack_id][req_id];
		else
			return false;
	}

	self.setReqTimeout = function(pack_id, req_id, timeout){
		self.pack[pack_id][req_id].timeout = timeout;
	}

	self.setPackTimeout = function(pack_id, timeout){
		for (var next in self.pack[pack_id]){
			self.pack[pack_id][next].timeout = timeout;
		}
	}

	self.sendReq = function(pack_id, req_id){
		if (typeof(pack_id) != "undefined"){
			if (typeof(req_id) != "undefined"){
				$.ajax({
					type: self.pack[pack_id][req_id].type,
					url: self.pack[pack_id][req_id].url,
					data: self.pack[pack_id][req_id].data,
					dataType: self.pack[pack_id][req_id].dataType,
					cache: self.pack[pack_id][req_id].cache,
					timeout: self.pack[pack_id][req_id].timeout, //3min
					success: self.pack[pack_id][req_id].success
				})
				return true;
			}
			return false;
		}
	}

	self.sendPack = function(pack_id){
		if (typeof(pack_id) != "undefined"){
			for (var next in self.pack[pack_id]){
				$.ajax({
					type: self.pack[pack_id][next].type,
					url: self.pack[pack_id][next].url,
					data: self.pack[pack_id][next].data,
					dataType: self.pack[pack_id][next].dataType,
					cache: self.pack[pack_id][next].cache,
					timeout: self.pack[pack_id][next].timeout, //3min
					success: self.pack[pack_id][next].success
				})
			}
			return true;
		} else
			return false;
	}


	//OK
	self.setCbOKReq = function(pack_id, req_id, cb){
		self.pack[pack_id][req_id].success = cb;
	}

	self.setCbOkPack = function(pack_id, cb){
		for (var next in self.pack[pack_id])
			self.pack[pack_id][next].success = cb;
	}

	//error , xhr, textStatus
	self.setCbErrReq = function(pack_id, req_id, cb){
		self.pack[pack_id][req_id].error = cb;
	}

	self.setCbErrPack = function(pack_id, cb){
		for (var next in self.pack[pack_id])
			self.pack[pack_id][next].error = cb;
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
