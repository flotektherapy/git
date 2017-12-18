var birds = [];
var birdsLoaded = false;
var selectedBird = -1; 
var init = function(){
    if(birds.length == 0){
            $.getJSON('birds.json', function(response){
            birds = response;
            birdsLoaded = true;
        })
        .error(function(e){
            console.log('Error loading items : ', error);
          });
    }
};

(function () {   
    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;

    // create an object to store the models for each view
    window.APP = {
        models: {
            login: {
                title: 'Login'
            },
            home: {
                title: 'Home'
            },
                options: {
                title: 'Options'
            },
                optionsmm: {
                title: 'Optionsmm'
            },
               chapters: {
                title: 'Chapters'
            },
            birdfamily: {
                title: 'Bird Family'
            },
            birds: {
                title: 'Birds'
            },
            about: {
                title: 'About'
            },
                publisher: {
                title: 'Publishers Notes'         
                },
            photographers: {
                title: 'Photographers'         
                }
  		
        }
    };

    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {  
      
      // hide the splash screen as soon as the app is ready. otherwise
      // Cordova will wait 5 very long seconds to do it for you.
      navigator.splashscreen.hide();

      app = new kendo.mobile.Application(document.body, {
        
        // you can change the default transition (slide, zoom or fade)
        transition: 'fade',
        
        // comment out the following line to get a UI which matches the look
        // and feel of the operating system
        skin: 'flat',

        // the application needs to know which view to load first
        initial: 'views/home.html'
      });

    }, false);

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
                    return (obj.ID_Issue === id);
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
    }
}());