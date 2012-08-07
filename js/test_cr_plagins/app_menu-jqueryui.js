/* Пример

 var company_data = {};
 var address_data = {};


 company_data[1] = { id: 1, logo: "js/test_cr_plagins/img/company/logo_company1.jpg", priceLevel: "3", name: "Компания 1" };
 company_data[2] = { id: 2, logo: "js/test_cr_plagins/img/company/logo_company2.jpg", priceLevel: "4", name: "Компания 2" };

 address_data[1] = {};
 address_data[2] = {};

 address_data[1][1] = { id: 1, logo: "js/test_cr_plagins/img/address/logo_resto1.jpg", favorite: "15", address: "Новый арбат 11 1", subway: "Смоленская", rating: "3.79", rating_count: "500", count_review: "122" };
 address_data[1][2] = { id: 2, logo: "js/test_cr_plagins/img/address/logo_resto2.jpg", favorite: "120", address: "Новый арбат 11 1", subway: "Смоленская", rating: "4", rating_count: "1200", count_review: "300" };

 address_data[2][1] = { id: 3, logo: "js/test_cr_plagins/img/address/logo_resto3.jpg", favorite: "345", address: "Новый арбат 22 2", subway: "Смоленская", rating: "2", rating_count: "432", count_review: "123" };
 address_data[2][2] = { id: 4, logo: "js/test_cr_plagins/img/address/logo_resto4.jpg", favorite: "34", address: "Новый арбат 22 2", subway: "Смоленская", rating: "5", rating_count: "3331", count_review: "534" };
 address_data[2][3] = { id: 5, logo: "js/test_cr_plagins/img/address/logo_resto5.jpg", favorite: "555", address: "Новый арбат 22 2", subway: "Смоленская", rating: "1", rating_count: "1223", count_review: "22" };

 $(function(){
 $("#app_menu").app_menu({ company_data: company_data, address_data: address_data });
 $("#app_menu").app_menu("update");
 })

 */

$.widget("rb.app_menu", {
	options: {
		width: "170px",
		height: "561px",
        company_data: "",
        address_data: ""
	},

	_create: function() {
        //var html = new EJS({url: 'templates/app_menu/app_menu.ejs'}).render({options: this.options, type: "loader"});
        //this.element.append(html);
    },

    loader: function(){
        var html = new EJS({url: 'templates/app_menu/app_menu.ejs'}).render({options: this.options, type: "loader"});
        $("#app_menu").append(html);

    },

    update: function(){
        var $this = $(this),    data = $this.data('app_menu');

        if (!data) {
            $(this).data('app_menu', {
                company_data: this.options.company_data,
                address_data: this.options.address_data
            });

            console.log(this.options);
            var html = new EJS({url: 'templates/app_menu/app_menu.ejs'}).render({options: this.options, type: "update"});
            this.element.append(html);
        }

        var data =  $(this).data('app_menu');

        if ((data.company_data != "")&&(data.address_data != "")){
            for (var next in data.company_data){
                $("#listCompany").append('<option id ="' + data.company_data[next].id + '">' + data.company_data[next].name + '</option>');
            }
        }

        //<основной виджет : компания + адрес

        //компания

        var name_company = "";
        var id_company = 0;
        $("#listCompany").change(function(){
            $("#listCompany option:selected").each(function () {
                name_company = $(this).text();
                id_company = $(this).attr("id");
                changeCompany();
                addlistAddress();
                $("#listAddress").trigger('change');
            });
        }).trigger('change');

        function changeCompany(){
            for (var next in data.company_data){
                if (data.company_data[next].id == id_company){
                    var logo = data.company_data[next].logo;
                    var html = '<img src="' + logo +'" alt="Логотип" class="passe-partout">';
                    $("#company_logo").html(html);
                    var count = data.company_data[next].priceLevel;
                    $("#priceLevel").text(priceLevelToImage(count));
                    break;
                }
            }
        }

        //адрес

        function addlistAddress(){
            $("#listAddress").html("");
            for (var next in data.address_data){
                if (id_company == next){
                    for (var next in data.address_data[id_company]){
                        $("#listAddress").append('<option id="'+ data.address_data[id_company][next].id +'">' + data.address_data[id_company][next].address + '</option>');
                    }
                }
            }
        }

        var name_address = "";
        var id_address = 0;
        $("#listAddress").change(function(){
            $("#listAddress option:selected").each(function () {
                name_address = $(this).text();
                id_address = $(this).attr("id");
                changeAddress();
            });
        }).trigger('change');


        function changeAddress(){
            for (var next in data.address_data){
                for (var next_ in data.address_data[next]){
                    if (data.address_data[next][next_].id == id_address){
                        var logo = data.address_data[id_company][next_].logo;
                        var html = '<img src="' + logo +'" alt="Логотип" class="passe-partout">';
                        $("#address_logo").html(html);

                        $("#address_subway").html(data.address_data[id_company][next_].subway);
                        $("#address_rating").html(data.address_data[id_company][next_].rating);
                        $("#rating_count").html(data.address_data[id_company][next_].rating_count);
                        $("#address_count_review").html(data.address_data[id_company][next_].count_review);
                        $("#favourite").text(data.address_data[id_company][next_].favorite);

                        break;
                    }
                }
            }
        }

        function priceLevelToImage(count){
            var img = "";
            while( count > 0){
                img += "$";
                --count;
            }
            return img;
        }

        //основной виджет : компания + адрес>

        //<меню
        $(".menu a").each(function(){
            var str = $(this).attr("id");
            var namePage = str.substring(2, str.length);

            $(this).bind("click", function(){

                $(".menu").attr("selectpage", namePage);
                $(".menu").attr("id_Company", id_company);
                $(".menu").attr("id_Address", id_address);
	            $(this).trigger("selectpage");


            });
        });

        //меню>
    },

	onBindSelectPage: function(){
		//$(".menu").bind("selectpage", function(){ console.log("sp"); } );
		$(this).bind("selectpage", function(){ console.log("sp"); } );

	},

	destroy: function() {
        $(this).removeData('app_menu');
        this.element.next().remove();
        $(window).unbind("click");
        $("#app_menu").html("");
	},

	_setOption: function(key, value){

	}

});
/*
var company_data = {};
var address_data = {};

company_data[1] = { id: 1, logo: "js/test_cr_plagins/img/company/logo_company1.jpg", priceLevel: "3", name: "Компания 1" };
company_data[2] = { id: 2, logo: "js/test_cr_plagins/img/company/logo_company2.jpg", priceLevel: "4", name: "Компания 2" };

address_data[1] = {};
address_data[2] = {};

address_data[1][1] = { id: 1, logo: "js/test_cr_plagins/img/address/logo_resto1.jpg", favorite: "15", address: "Новый арбат 11 1", subway: "Смоленская", rating: "3.79", rating_count: "500", count_review: "122" };
address_data[1][2] = { id: 2, logo: "js/test_cr_plagins/img/address/logo_resto2.jpg", favorite: "120", address: "Новый арбат 11 1", subway: "Смоленская", rating: "4", rating_count: "1200", count_review: "300" };

address_data[2][1] = { id: 3, logo: "js/test_cr_plagins/img/address/logo_resto3.jpg", favorite: "345", address: "Новый арбат 22 2", subway: "Смоленская", rating: "2", rating_count: "432", count_review: "123" };
address_data[2][2] = { id: 4, logo: "js/test_cr_plagins/img/address/logo_resto4.jpg", favorite: "34", address: "Новый арбат 22 2", subway: "Смоленская", rating: "5", rating_count: "3331", count_review: "534" };
address_data[2][3] = { id: 5, logo: "js/test_cr_plagins/img/address/logo_resto5.jpg", favorite: "555", address: "Новый арбат 22 2", subway: "Смоленская", rating: "1", rating_count: "1223", count_review: "22" };
*/
$(function(){
	console.log(1);

	//$(".left").app_menu({ company_data: company_data, address_data: address_data });
	//$(".left").app_menu("loader");

    //$("#app_menu").app_menu("loader");
    //$("#app_menu").app_menu({ company_data: company_data, address_data: address_data });
    //$("#app_menu").app_menu("loader");
    //$("#app_menu").app_menu("destroy");
    //$("#app_menu").app_menu("update");
})
