/// <reference path="jquery-2.1.3.intellisense.js" />

/* Bird Book app */
function start_app() {
    get_issues();


}

function get_issues() {

    var issues = [];
    var gCnt = 0;
  //  var issues;
  


    $.ajax({
        url: "scripts/issues.json",
        //force to handle it as text
        dataType: "JSON",
        success: function (data) {
       var jsonSTR = JSON.stringify(data);
   
       var jsonT = JSON.parse(jsonSTR);
  
     tbl    =  new_Table(100, 3, jsonT, 0);

     $('#main_div').html(tbl);
     $('#main_div').show();
         //   alert('no:' + ALen);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error" + errorThrown);
        }
    });


  

}



function new_Table(rows, clmns, jsonDB, IorIL) {
    var rSTR, cStr, i, rc, cc;
    var itemCnt = 0;
    var tbl = $("<Table/>");
    var grdDIV = $('<div/>');
    rSTR = '';
    var arrpi = [], ALen;
 // alert('len: ' +  jsonDB.length);
    for (key in jsonDB) {

        arrpi.push(key);
    }

    ALen = arrpi.length;
    rows = ALen / 3;
 //   alert('' + ALen);
    for (i = 0; i < ALen; i++) {
    for (rc = 0; rc < rows; rc++) {
        rSTR = "<tr >";
        cStr = '';
        for (cc = 0; cc < clmns; cc++) {
          
            if (IorIL == 0) {
                try {

                  //  grdDIV.append('');
                    cStr += "<td class='ui-block' onclick='show_id(" + jsonDB[itemCnt].ID_Issue + ")'>";
                    cStr += jsonDB[itemCnt].Issues;
                } catch (e) { }

                itemCnt += 1;

                cStr += "</td>";
            }
            else if (IorIL == 1) {
                try {
                    cStr += "<td class='ui-btn' onclick='show_bird(" + jsonDB[itemCnt].ID_Bird + ")'> ";
                    try {
                        cStr += "<img src='" + curl + "' height='40' style='float:left; margin:0;' />"
                    }
                    catch (e) { }
                    cStr += jsonDB[itemCnt].Main_Heading;
                    curl = "images/" + jsonDB[itemCnt].imgFriendlyName + "_web.jpg";

                  

                } catch (e) { }

               
              
                itemCnt += 1;
                //var bimg = new Image;
                //bimg.src = url;
                //bimg.height = 40;

              
                cStr += "</td>";

            }
        }
        rSTR += cStr;
        rSTR += '</tr>';

        tbl.append(rSTR);
    }
 
    }
    return tbl;
  

}

function show_issue_birds(id) {
    var jsonBB = [];
    $.ajax({
        url: "scripts/birds.json",
        //force to handle it as text
        dataType: "JSON",
        success: function (data) {
            var jsonSTR2 = JSON.stringify(data);
          //  alert(jsonSTR2);
            var jsonT2 = JSON.parse(jsonSTR2);
            jsonT2 = jsonT2.filter(function (obj) {
                return (obj.ID_Issue == id);
            });
          //  alert(jsonT2);
            isList = new_Table(jsonT2.length, 1, jsonT2, 1);
            $('#issue_div').html(isList);
            $('#main_div').hide(500, function (e) {
                $('#issue_div').show(200);
            })
            //   alert('no:' + ALen);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error" + errorThrown);
        }
    });
    //issue_div
}
var _url;
function UrlExists(url) {
    $('<img src="' + url + '">').load(function () {
        add_photo(url);
        return 'yes';
    }).bind('error', function () {
        return 'no';
    });
}

function show_bird(id) {
    var bImg;
    $.ajax({
        url: "scripts/birds.json",
        //force to handle it as text
        dataType: "JSON",
        success: function (data) {
            var jsonSTR2 = JSON.stringify(data);
            //  alert(jsonSTR2);
            var jsonT2 = JSON.parse(jsonSTR2);
            jsonT2 = jsonT2.filter(function (obj) {
                return (obj.ID_Bird == id);
            });
          

            var bSTR = "<table style='width:100%;'><tr><td ><strong>" + jsonT2[0].Main_Heading + "</strong></td><td style='text-align:right;'><img height='16' src='images/map.png' id='mapIMG" + jsonT2[0].ID_Bird + "' class='img_map' /><img src='images/information.png' id='infoIMG" + jsonT2[0].ID_Bird + "' class='img_info' Title='Show all info' />";
            bSTR += " <img src='images/play.png' id='callIMG" + jsonT2[0].ID_Bird + "' class='img_info' Title='Show all info' /></td></tr></table>";

           
         
            cUrl = "images/" + jsonT2[0].imgFriendlyName + "_web.jpg";
            cURL1 = "images/" + jsonT2[0].imgFriendlyName + "_web1.jpg";
            cURL2 = "images/" + jsonT2[0].imgFriendlyName + "_web2.jpg";
            cURL3 = "images/" + jsonT2[0].imgFriendlyName + "_web_h.jpg";
            var doAdd = UrlExists(cUrl);
            doAdd = UrlExists(cURL1);
            doAdd = UrlExists(cURL2);
            doAdd = UrlExists(cURL3);
  
        
            bSTR += "<div id='map" + jsonT2[0].ID_Bird + "' style='display:none;'>map div<br/><br/></div>";
            bSTR += "<div id='info" + jsonT2[0].ID_Bird + "' style='display:none;'>" + jsonT2[0].Body_Content + "<br/><br/></div>";
            bSTR += "<div id='call" + jsonT2[0].ID_Bird + "' style='display:none;'>" + jsonT2[0].Body_Content + "<br/><br/></div>";
         
            $('#bird_div').append(bSTR);

            $('#issue_div').hide(100, function (e) {
                $('#bird_div').show(100);
            })

            $('#mapIMG' + jsonT2[0].ID_Bird).on('click', function () {
                alert('map');
                $('#map' + jsonT2[0].ID_Bird).toggle();

            });
            $('#infoIMG' + jsonT2[0].ID_Bird).on('click', function () {
                $('#info' + jsonT2[0].ID_Bird).toggle();

            });
            $('#infoIMG' + jsonT2[0].ID_Bird).on('click', function () {
                $('#info' + jsonT2[0].ID_Bird).toggle();

            });
            //   alert('no:' + ALen);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("error" + errorThrown);
        }
    });
}



function add_photo(url) {
   // alert('ap:' + url);
    var bimg = new Image;
    bimg.src = url;
    bimg.width = screen.width;

    $('#bird_div').prepend(bimg);
}

function ImageExist(url) {
    _url = url;
    var img = new Image();
    img.src = url;
    return img.height != 0;
}


function show_id(id) {
    show_issue_birds(id);
 //   alert('id clicked: ' + id);
}