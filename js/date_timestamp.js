/*
 10
 var str = "10/28/2008"
 var timestamp = StrDateToTimestamp(str);
 console.log("timestamp = ", timestamp);

 console.log("timestamp = ", TimestampToStrDate(timestamp));
 */
function DateTimestamp(){
    var self = this;
    function DateToTimestamp(year, month, day) {
        return (Date.UTC(year, month, day, 00, 00, 00) / 1000);
    }

    self.StrDateToTimestamp = function(str){
        var reg_exp = /^([0-9]{2})[/]([0-9]{2})[/]([0-9]{4})$/;
        var ObjDate = str.match(reg_exp);
        return DateToTimestamp(ObjDate[3], ObjDate[1], ObjDate[2]);
    }

    self.TimestampToStrDate = function(unix_timestamp){
        var ObjDataTs = new Date(unix_timestamp * 1000);

        var openingDay = ('0'+ObjDataTs.getDate()).slice(-2);
        var openingMonth = ('0'+ObjDataTs.getMonth()).slice(-2);
        var openingYear = ObjDataTs.getFullYear();
        return openingMonth + "/" + openingDay + "/" + openingYear;
    }
}

var DT = new DateTimestamp();
