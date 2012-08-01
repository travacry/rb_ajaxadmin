$(document).ready(function(){
	/*
		center: myLatlng – это координаты центра карты
		zoom – это увеличение при инициализации
		mapTypeId – тип (политическая, физическая, гибрид)
	*/
	var myLatlng = new google.maps.LatLng(-34.397, 150.644);
	var map;
	function initialize1() {
		var myOptions = {
			zoom: 8,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		map = new google.maps.Map(document.getElementById("map_canvas1"), myOptions);
		
	}

	function initialize2() {
		var myOptions = {
			zoom: 8,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		map = new google.maps.Map(document.getElementById("map_canvas2"), myOptions);
		map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
	}

	initialize1();
	initialize2();



    var str = "10/28/2008";//"1227855998";
    var reg_exp = /^([0-9]{2})[/]([0-9]{2})[/]([0-9]{4})$/;
    var ObjDate = str.match(reg_exp);
    var timestamp = Date.UTC(ObjDate[3], ObjDate[1], ObjDate[2]);
    //console.log(timestamp/1000);
    //console.dir(ObjStr);

	//
})