$(document).ready(function(){
	/*
		center: myLatlng � ��� ���������� ������ �����
		zoom � ��� ���������� ��� �������������
		mapTypeId � ��� (������������, ����������, ������)
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

	function initialize3() {
		var myOptions = {
			zoom: 8,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		map = new google.maps.Map(document.getElementById("map_canvas3"), myOptions);
	}	
	/*
		position � ���������� ���������� �����
		map � �� ����� ����� ����� ���������
		title � ��� ��������� ���� ����� ������ �Hello World!�.
	*/
	
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title:"Hello World!"
	});
	
	initialize1();
	initialize2();
	//initialize3();
})