////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
    trava , randge 50m
*/
function g_map(){

    var self = this;
    /**
     * Определяем параметры карты
     */
    function initialize_map(){
        self.thePoint = new google.maps.LatLng(0, 0);
        self.mapOpts = {
            zoom: 12,
            center: self.thePoint,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scaleControl: true,
            scrollwheel: false
        }
        self.map = new google.maps.Map(document.getElementById("map_canvas"), self.mapOpts);
    }

    /**
     * Создание окружности
     */
    function createCircle() {
        self.circle = new google.maps.Circle({radius: 50, center: self.thePoint});
        self.map.fitBounds(self.circle.getBounds());
    }

    initialize_map();
    createCircle()
    // Определение параметров окружности
    self.play = function(){
        var radius = 50; //50 m
        self.circle.setRadius(radius);
        self.circle.setCenter(self.map.getCenter());
        self.map.fitBounds(self.circle.getBounds());
        self.map.circleRadius = radius;
    }

    self.play();

    /**
     * Геокодирование
     */
    self.geocoder = new google.maps.Geocoder();
    self.geocode = function(opts){
        function geocodeResult(response, status) {
            if (status == google.maps.GeocoderStatus.OK && response[0]) {
                if ($("#address_right").text() != "")
                    $("#address_right").text(response[0].formatted_address);

                //map.fitBounds(response[0].geometry.viewport);
                self.map.setCenter(response[0].geometry.location);
                self.play();
            } else {
                alert("D'oh! " + status);
            }
        } // удаляем лишние пробельные символы из строки адреса
        if(opts.address && opts.address.trim) opts.address = opts.address.trim();
        if(opts.address || opts.latLng) self.geocoder.geocode(opts, geocodeResult);
    }

    google.maps.event.addListener(self.map, 'rightclick', function(eve){
        //self.geocode({latLng: eve.latLng});
    });


    google.maps.event.addListener( self.circle, 'click', function(event) {
            console.dir(event);
        placeMarker(event.latLng);
    });

    function placeMarker(location) {
        if (typeof(self.marker)!= "undefined")
            self.marker.setMap(null);

        self.marker = new google.maps.Marker({
            position: location,
            map: self.map
        });

        $("#latitude_address").val(location["$a"]);
        $("#longitude_address").val(location["ab"]);
    }

    //установка по координатам сервера + проверка на адрес

    self.geocode({address: $("#address_right").val() });
    self.circle.setMap(self.map);

    var svr_locPos = new google.maps.LatLng( $("#current_latitude").val() , $("#current_longitude").val() );
    placeMarker(svr_locPos);

    $("#test_api_googlemap_right").bind('click', function() { self.geocode({address: $("#address_right").val() }); self.circle.setMap(self.map); });
    $("#test_api_googlemap_left").bind('click', function() { self.geocode({address: $("#address_left").val() }); self.circle.setMap(self.map); });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////