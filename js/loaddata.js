$(function(){

    /* Инициализация, загрузка всех данных. */

    var timeout_fixed = 60000;
    var timeout_mainmenu_get_ids = 70000;
    var timeout_mainmenu = 60000;
    var timeout_dynamic = 60000;

    var procent = (timeout_fixed + timeout_mainmenu_get_ids + timeout_mainmenu + timeout_dynamic)/100;
//Для лоадера
    var timeout_fixed_poc_loaderbar = timeout_fixed/procent;
    var timeout_ids_poc_loaderbar = timeout_mainmenu_get_ids/procent;
    var timeout_mainmenu_poc_loaderbar = timeout_mainmenu/procent;
    var timeout_dynamic_poc_loaderbar = timeout_dynamic/procent;

    var fixed = {};
    function getStaticData(){
        var ajaxDriver = new ajax_driver();

        var count_res = 0;
        var capacity = 5;
        //статич
        var ajaxObj_cityGet = {    id : "cityGet", pack_id : "fixed",    data :  {   method: "city.get"}   }
        var ajaxObj_countryGet = {    id : "countryGet", pack_id : "fixed",    data :  {   method: "country.get"}   }
        var ajaxObj_subwayGet = {    id : "subwayGet", pack_id : "fixed",    data :  {   method: "subway.get"}   }
        var ajaxObj_currencyGet = {    id : "currencyGet", pack_id : "fixed",    data :  {   method: "currency.get"}   }
        var ajaxObj_phoneTypeGet = {    id : "phoneTypeGet", pack_id : "fixed",    data :  {   method: "phoneType.get"}   }

        ajaxDriver.addPack("fixed");

        ajaxDriver.addReq(ajaxObj_cityGet);
        ajaxDriver.addReq(ajaxObj_countryGet);
        ajaxDriver.addReq(ajaxObj_subwayGet);
        ajaxDriver.addReq(ajaxObj_currencyGet);
        ajaxDriver.addReq(ajaxObj_phoneTypeGet);

        //ajax_dr.setCbOKReq(1,2, function(data){ console.dir(data); });
        ajaxDriver.setCbOKReq("fixed", "cityGet", function(data){ saveData(data, "city.get"); });
        ajaxDriver.setCbOKReq("fixed", "countryGet", function(data){ saveData(data, "country.get");   });
        ajaxDriver.setCbOKReq("fixed", "subwayGet", function(data){ saveData(data, "subway.get");  });
        ajaxDriver.setCbOKReq("fixed", "currencyGet", function(data){ saveData(data, "currency.get"); });
        ajaxDriver.setCbOKReq("fixed", "phoneTypeGet", function(data){ saveData(data, "phoneType.get");  });

        ajaxDriver.setCbErrReq("fixed", "cityGet", function(xhr, textStatus){ console.log("cityGet"); } );
        ajaxDriver.setCbErrReq("fixed", "countryGet", function(xhr, textStatus){ console.log("countryGet"); } );
        ajaxDriver.setCbErrReq("fixed", "subwayGet", function(xhr, textStatus){ console.log("subwayGet"); } );
        ajaxDriver.setCbErrReq("fixed", "currencyGet", function(xhr, textStatus){ console.log("currencyGet"); } );
        ajaxDriver.setCbErrReq("fixed", "phoneTypeGet", function(xhr, textStatus){ console.log("phoneTypeGet"); } );

        ajaxDriver.setPackTimeout("fixed", timeout_fixed); //2min
        //ajaxDriver.sendPack("fixed");

        function saveData(data, name_param){
            if (typeof(data.error) == "undefined"){
                fixed[name_param + ""] = data;
                ++count_res;
                if(count_res == capacity) initStatic();
            } else {
                console.log("error : ", name_param, "msg : ", data.error.message);
            }
        }
    }

    getStaticData();

    function initStatic(){
        console.log("staticComplite");
        console.dir(fixed);
        getMainMenuData();
    }

    var mainmenu = {};
    function getMainMenuData(){

        var ajaxDriver = new ajax_driver();

        ajaxDriver.addPack("mainmenu");
        var ajaxObj = {    id : "companyGet", pack_id : "mainmenu",    data :  {   method: "company.get", limit: 2}   }
        ajaxDriver.addReq(ajaxObj);
        ajaxDriver.setCbOKReq("mainmenu", "companyGet", function(data){ setIdsAddress(data, "company.get"); });
        ajaxDriver.setCbErrReq("mainmenu", "companyGet", function(xhr, textStatus){ console.log("companyget"); } );

        ajaxDriver.setPackTimeout("mainmenu", timeout_mainmenu_get_ids); //2min
        //ajaxDriver.sendPack("mainmenu");

        var count_res = 0;
        var capacity = 2;

        function setIdsAddress(data, name_param){
            if (typeof(data.error) == "undefined"){
                var ids = "";
                for (var next in data.response){
                    ids += data.response[next].id;
                    ids += ",";
                }
                if( ids != null && ids.length > 1 )
                    ids = ids.substring(0, ids.length - 1);

                var ajaxObj = {    id : "addressGet", pack_id : "mainmenu",    data :  {   method: "address.get", company_ids: ids }   }

                ajaxDriver.addReq(ajaxObj);
                ajaxDriver.setCbOKReq("mainmenu", "addressGet", function(data){ saveData(data, "address.get"); });
                ajaxDriver.setCbErrReq("mainmenu", "addressGet", function(xhr, textStatus){ console.log("companyget"); } );

                ajaxDriver.setCbOKReq("mainmenu", "companyGet", function(data){ saveData(data, "company.get"); });
                ajaxDriver.setCbErrReq("mainmenu", "companyGet", function(xhr, textStatus){ console.log("companyget"); } );

                ajaxDriver.setPackTimeout("mainmenu", timeout_mainmenu); //2min
                //ajaxDriver.sendPack("mainmenu");
            } else {
                console.log("error : ", name_param, "msg : ", data.error.message);
            }
        }
        function saveData(data, name_param){
            if (typeof(data.error) == "undefined"){
                mainmenu[name_param + ""] = data;
                ++count_res;
                if(count_res == capacity) initMainMenuData();
            } else {
                console.log("error : ", name_param, "msg : ", data.error.message);
            }
        }
    }

    function initMainMenuData(){
        console.log("mainmenu");
        console.dir(mainmenu);
        getDynamicData();
    }

    var dynamic = {};
    function getDynamicData(){
        var count_res = 0;
        var capacity = 1;

        var ajaxDriver = new ajax_driver();

        ajaxDriver.addPack("dynamic");

        //var ajaxObj = {    id : "addressRatingGet", pack_id : "dynamic",    data :  {   method: "addressRating.get", address_id: 2 }   } // -
        //ajaxDriver.addReq(ajaxObj);
        var ajaxObj = {    id : "categoryGet", pack_id : "dynamic",    data :  {   method: "category.get" }   }
        ajaxDriver.addReq(ajaxObj);
        //var ajaxObj = {    id : "dish_get", pack_id : "dynamic",    data :  {   method: "dish.get" }   }  // -
        //ajaxDriver.addReq(ajaxObj);

        //var ajaxObj = {    id : "dishRatingGet", pack_id : "dynamic",    data :  {   method: "dishRating.get"}   }
        //ajaxDriver.addReq(ajaxObj);
        /*
         //var ajaxObj = {    id : "dishReview_get", pack_id : "dynamic",    data :  {   method: "dishReview.get"}   }  // -
         //ajaxDriver.addReq(ajaxObj);
         var ajaxObj = {    id : "language_get", pack_id : "dynamic",    data :  {   method: "language.get"}   }
         ajaxDriver.addReq(ajaxObj);
         //var ajaxObj = {    id : "like_get", pack_id : "dynamic",    data :  {   method: "like.get"}   } // -
         //ajaxDriver.addReq(ajaxObj);
         //var ajaxObj = {    id : "member_get", pack_id : "dynamic",    data :  {   method: "member.get"}   } // -
         //ajaxDriver.addReq(ajaxObj);
         var ajaxObj = {    id : "news.get", pack_id : "dynamic",    data :  {   method: "news.get"}   }
         ajaxDriver.addReq(ajaxObj);
         var ajaxObj = {    id : "offer_get", pack_id : "dynamic",    data :  {   method: "offer.get"}   }
         ajaxDriver.addReq(ajaxObj);
         var ajaxObj = {    id : "option_get", pack_id : "dynamic",    data :  {   method: "option.get"}   }
         ajaxDriver.addReq(ajaxObj);
         var ajaxObj = {    id : "promo_get", pack_id : "dynamic",    data :  {   method: "promo.get"}   }
         ajaxDriver.addReq(ajaxObj);
         var ajaxObj = {    id : "unit_get", pack_id : "dynamic",    data :  {   method: "unit.get"}   }
         ajaxDriver.addReq(ajaxObj);
         */

        ajaxDriver.setCbOKReq("dynamic", "categoryGet", function(data){ saveData(data, "category.get"); });
        //ajaxDriver.setCbOKReq("dynamic", "dishRatingGet", function(data){ saveData(data, "dishRating.get"); });
        /*
         ajaxDriver.setCbOKReq("dynamic", "languageGet", function(data){ dynamic["language.get"] = data;   });
         ajaxDriver.setCbOKReq("dynamic", "newsGet", function(data){ dynamic["news.get"] = data;   });
         ajaxDriver.setCbOKReq("dynamic", "offerGet", function(data){ dynamic["offer.get"] = data;   });
         ajaxDriver.setCbOKReq("dynamic", "optionGet", function(data){ dynamic["option.get"] = data;   });
         ajaxDriver.setCbOKReq("dynamic", "promoGet", function(data){ dynamic["promo.get"] = data;   });
         ajaxDriver.setCbOKReq("dynamic", "unitGet", function(data){ dynamic["unit.get"] = data;   });
         */

        ajaxDriver.setCbErrReq("dynamic", "categoryGet", function(xhr, textStatus){ console.log("category"); } );
        //ajaxDriver.setCbErrReq("dynamic", "dishRatingGet", function(xhr, textStatus){ console.log("dishRating"); } );
        /*
         ajaxDriver.setCbErrReq("dynamic", "languageGet", function(xhr, textStatus){ console.log("language"); } );
         ajaxDriver.setCbErrReq("dynamic", "newsGet", function(xhr, textStatus){ console.log("news"); } );
         ajaxDriver.setCbErrReq("dynamic", "offerGet", function(xhr, textStatus){ console.log("offer"); } );
         ajaxDriver.setCbErrReq("dynamic", "optionGet", function(xhr, textStatus){ console.log("option"); } );
         ajaxDriver.setCbErrReq("dynamic", "promoGet", function(xhr, textStatus){ console.log("promo"); } );
         ajaxDriver.setCbErrReq("dynamic", "unitGet", function(xhr, textStatus){ console.log("unit"); } );
         */

        ajaxDriver.setPackTimeout("dynamic", timeout_dynamic);
        //ajaxDriver.sendPack("dynamic");

        function saveData(data, name_param){
            if (typeof(data.error) == "undefined"){
                dynamic[name_param + ""] = data;
                ++count_res;
                if(count_res == capacity) initDynamic();
            } else {
                console.log("error : ", name_param, "msg : ", data.error.message);
            }
        }
    }

    function initDynamic(){
        console.log("dynamicComplite");
        console.dir(dynamic);
    }
})
