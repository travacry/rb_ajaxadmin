$(function(){
/*
 <div id="city_get"></div>
 <div id="country_get"></div>
 <div id="subway_get"></div>
 <div id="currency_get"></div>
 <div id="phoneType_get"></div>

 <div id="address_get"></div>
 <div id="company_get"></div>
 <div id="addressRating_get"></div>
 <div id="category_get"></div>
 <div id="dish_get"></div>
 <div id="dishRating_get"></div>
 <div id="dishReview_get"></div>
 <div id="language_get"></div>
 <div id="like_get"></div>
 <div id="member_get"></div>
 <div id="news.get"></div>
 <div id="offer_get"></div>
 <div id="option_get"></div>
 <div id="promo_get"></div>
 <div id="unit_get"></div>

*/
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
    ajaxDriver.setCbOKReq("fixed", "cityGet", function(data){ fixed["city.get"] = data; ++count_res; if(count_res == capacity) initPage(); });
    ajaxDriver.setCbOKReq("fixed", "countryGet", function(data){ fixed["country.get"] = data; ++count_res; if(count_res == capacity) initPage();   });
    ajaxDriver.setCbOKReq("fixed", "subwayGet", function(data){ fixed["subway.get"] = data; ++count_res; if(count_res == capacity) initPage();  });
    ajaxDriver.setCbOKReq("fixed", "currencyGet", function(data){ fixed["currency.get"] = data; ++count_res; if(count_res == capacity) initPage(); });
    ajaxDriver.setCbOKReq("fixed", "phoneTypeGet", function(data){ fixed["phoneType.get"] = data;  ++count_res; if(count_res == capacity) initPage();  });

    ajaxDriver.setCbErrReq("fixed", "cityGet", function(xhr, textStatus){ console.log("cityGet"); } );
    ajaxDriver.setCbErrReq("fixed", "countryGet", function(xhr, textStatus){ console.log("countryGet"); } );
    ajaxDriver.setCbErrReq("fixed", "subwayGet", function(xhr, textStatus){ console.log("subwayGet"); } );
    ajaxDriver.setCbErrReq("fixed", "currencyGet", function(xhr, textStatus){ console.log("currencyGet"); } );
    ajaxDriver.setCbErrReq("fixed", "phoneTypeGet", function(xhr, textStatus){ console.log("phoneTypeGet"); } );

    ajaxDriver.setPackTimeout("fixed", 60000); //3min
    ajaxDriver.sendPack("fixed");
}

getStaticData();

function initPage(){
    console.log("staticComplite");
    console.dir(fixed);
    getNext();
}

var dynamic = {};
function getNext(){
    var ajaxDriver = new ajax_driver();

    ajaxDriver.addPack("dynamic");

    var ajaxObj = {    id : "addressGet", pack_id : "dynamic",    data :  {   method: "address.get", company_ids: 1 }   }
    ajaxDriver.addReq(ajaxObj);
    var ajaxObj = {    id : "companyGet", pack_id : "dynamic",    data :  {   method: "company.get", limit: 1}   }
    ajaxDriver.addReq(ajaxObj);
    //var ajaxObj = {    id : "addressRatingGet", pack_id : "dynamic",    data :  {   method: "addressRating.get", address_id: 2 }   } // -
    //ajaxDriver.addReq(ajaxObj);
    var ajaxObj = {    id : "categoryGet", pack_id : "dynamic",    data :  {   method: "category.get" }   }
    ajaxDriver.addReq(ajaxObj);
    //var ajaxObj = {    id : "dish_get", pack_id : "dynamic",    data :  {   method: "dish.get" }   }  // -
    //ajaxDriver.addReq(ajaxObj);
    var ajaxObj = {    id : "dishRating_get", pack_id : "dynamic",    data :  {   method: "dishRating.get"}   }
    ajaxDriver.addReq(ajaxObj);
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

    ajaxDriver.setCbOKReq("dynamic", "addressGet", function(data){ dynamic["address.get"] = data; console.log("return(address) = "); console.dir(data.response);  });
    ajaxDriver.setCbOKReq("dynamic", "companyGet", function(data){ dynamic["company.get"] = data; console.log("return(company) = "); console.dir(data.response); });
    ajaxDriver.setCbOKReq("dynamic", "categoryGet", function(data){ dynamic["category.get"] = data; console.log("return(category) = "); console.dir(data.response); });
    ajaxDriver.setCbOKReq("dynamic", "dishRatingGet", function(data){ dynamic["dishRating.get"] = data; console.log("return(dishRating) = "); console.dir(data.response); });
    /*
    ajaxDriver.setCbOKReq("dynamic", "languageGet", function(data){ dynamic["language.get"] = data;   });
    ajaxDriver.setCbOKReq("dynamic", "newsGet", function(data){ dynamic["news.get"] = data;   });
    ajaxDriver.setCbOKReq("dynamic", "offerGet", function(data){ dynamic["offer.get"] = data;   });
    ajaxDriver.setCbOKReq("dynamic", "optionGet", function(data){ dynamic["option.get"] = data;   });
    ajaxDriver.setCbOKReq("dynamic", "promoGet", function(data){ dynamic["promo.get"] = data;   });
    ajaxDriver.setCbOKReq("dynamic", "unitGet", function(data){ dynamic["unit.get"] = data;   });
    */
    ajaxDriver.setCbErrReq("dynamic", "addressGet", function(xhr, textStatus){ console.log("address"); } );
    ajaxDriver.setCbErrReq("dynamic", "companyGet", function(xhr, textStatus){ console.log("company"); } );
    ajaxDriver.setCbErrReq("dynamic", "categoryGet", function(xhr, textStatus){ console.log("category"); } );
    ajaxDriver.setCbErrReq("dynamic", "dishRatingGet", function(xhr, textStatus){ console.log("dishRating"); } );
    /*
    ajaxDriver.setCbErrReq("dynamic", "languageGet", function(xhr, textStatus){ console.log("language"); } );
    ajaxDriver.setCbErrReq("dynamic", "newsGet", function(xhr, textStatus){ console.log("news"); } );
    ajaxDriver.setCbErrReq("dynamic", "offerGet", function(xhr, textStatus){ console.log("offer"); } );
    ajaxDriver.setCbErrReq("dynamic", "optionGet", function(xhr, textStatus){ console.log("option"); } );
    ajaxDriver.setCbErrReq("dynamic", "promoGet", function(xhr, textStatus){ console.log("promo"); } );
    ajaxDriver.setCbErrReq("dynamic", "unitGet", function(xhr, textStatus){ console.log("unit"); } );
    */

    ajaxDriver.setPackTimeout("dynamic", 60000); //3min
    ajaxDriver.sendPack("dynamic");
}
})