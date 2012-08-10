$(function(){
	function ObjParser(){
		var self = this;

 		self.setObj = function(obj){
			self.obj = obj;
			console.dir(obj);

		self.Buff = function(){
			var self_ = this;
			/*
			буфер
			*/
			self_.buff_ = [];
			self_.count = 0;

			self_.addBuff = function(name){
				self_.buff_[self_.count++] = name;
			}

			self_.clearBuff = function(){
				self_.count = 0;
				self_.buff_.splice(0, self_.buff_.length)
			}
			self_.clearCurrent = function(){
				self_.buff_.slice(self_.buff_.length, self_.buff_.length);
			}
			self_.getCurEl = function(){
				var ret = "";
				for(var next = 0; next < self_.buff_.length; ++next){
					ret += '["' + self_.buff_[next] + '"].';
				}
				ret = ret.slice(0, -1);

				console.log(ret);

				//console.dir(self_.buff_);
				return ret;
			}
			//удаление до текущей вложенности
			self_.clearToNesting = function(name){

				var current_index;
				for (var next in self_.buff_){
					if (self_.buff_[next] == name){
						current_index = next;
						break;
					}
				}

				if (current_index == self_.buff_.length){
					return;
				}
				//console.log("slice");
				self_.buff_ = self_.buff_.slice(0, parseInt(current_index) + 1);
				console.log("asdas");
				console.log(current_index);
				console.dir(self_.buff_);
			}
		}

		var buff = new self.Buff();
			 /*
		buff.addBuff("asdas123da3sd");
		buff.addBuff("asd534as23dasd");
		buff.addBuff("asda123s12dasd");
		buff.addBuff("asd234a33sdasd");
		buff.addBuff("asd324as123dasd");

		buff.getCurEl();
		buff.clearToNesting("asd234a33sdasd");
		buff.getCurEl();
*/
		parseElements(obj);
		function parseElements(obj_){

			for (var next_ in obj_){
				if (typeof(obj_[next_]) == "object"){
					buff.addBuff(next_);
					parse(obj_[next_]);
					buff.clearBuff();
				}
			}

			function parse(obj){
				for (var next in obj){

					if (typeof(obj[next]) == "object"){

						buff.addBuff(next);
						buff.clearToNesting(next);

						$("#elements").append('<span style="color: red; width: 30px; ">' + next + '</span><br>');
						parse(obj[next]);
						//$("#elements").append(next + "<br>");
					} else {

						buff.getCurEl();
						//buff.clearBuff();
						$("#elements").append('<span style="width: 50px;  background-color:grey">' + next + " = " + obj[next]);
						$("#elements").append('<input type="text"></input><br></span>');
					}
				}
			}
		}


			$("#elements").append("<hr>");
			$("#elements").append('<input type="button" value="Render" ></input><br>');
			$("#elements").append("<hr>");
			var stack = [];
			var name_val = "out_val";
			stack[0] = "neasd2";
			stack[1] = "oasd";
			stack[2] = "a1";
			stack[3] = "lkhj";
			stack[4] = "asdd";
			var data = {};
			getEl(obj, stack, name_val, data);


			function getEl(obj, stack, name, data){


				$("#elements").append("LOG = " + obj[stack[0]][stack[1]][stack[2]][stack[3]][stack[4]]);
				data[name + ""] = obj[stack[0]][stack[1]][stack[2]][stack[3]][stack[4]];
				return data;
			}
			console.log("data");
			console.dir(data);

		};
		self.init = function(){

		};
		self.render = function(){

		};
	}

	var obj_ = new ObjParser();

	 po = {
		as: "asd",
		asd: 1,
		pp: { asddd: "123", dasdsa: "r32e", ds: 1 },
		neasd: { asd: "", masd: [1, 3, 4], oasd: { a1: "asd", ff3: "asdas"}},
		neasd2: { asd: "", masd: [1, 3, 4], oasd: { a1: { asd: "asd", asd12: 231, lkhj: { asdd: "end" } }, ff3: "asdas"}}
	}

	obj_.setObj(po);

	obj_.render();


})

