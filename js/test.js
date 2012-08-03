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

    //var timestamp = Date.UTC( 2008, 03, 15);
    //console.log("save timestamp = ", timestamp/1000);
    //send_pack.opening_date = timestamp/1000;

    function DateToTimestamp(year, month, day) {
        return (Date.UTC(year, month, day, 00, 00, 00) / 1000);
    }

    function StrDateToTimestamp(str){
        var reg_exp = /^([0-9]{2})[/]([0-9]{2})[/]([0-9]{4})$/;
        var ObjDate = str.match(reg_exp);
        return DateToTimestamp(ObjDate[3], ObjDate[1], ObjDate[2]);
    }

    function TimestampToStrDate(unix_timestamp){
        var ObjDataTs = new Date(unix_timestamp * 1000);

        var openingDay = ('0'+ObjDataTs.getDate()).slice(-2);
        var openingMonth = ('0'+ObjDataTs.getMonth()).slice(-2);
        var openingYear = ObjDataTs.getFullYear();
        return openingMonth + "/" + openingDay + "/" + openingYear;
    }

    var str = "10/28/2008"
    var timestamp = StrDateToTimestamp(str);
    console.log("timestamp = ", timestamp);

    console.log("timestamp = ", TimestampToStrDate(timestamp));

})