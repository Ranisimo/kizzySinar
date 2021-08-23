/* INITIAL STAGE SETTING */
//Preloader
$(window).on('load', function () {
    if (
        $('#preloader').length) {$('#preloader').delay(1000).fadeOut('slow',function () {
            $(this).remove();
        });
    }
});

//Loading Map
var mymap = new L.map('mapid', { zoomControl: false }).locate({setView: true, maxZoom: 16}); //Set Location to Users Location
    L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=nr1yo2LitcA3V1WiGnpQNQTE2ooNfxu7xxHlxldA7OirWsWMyBSLgoSzyVksXpdG', {zoomControl: false}).addTo(mymap);
    mymap.attributionControl.addAttribution("<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors");
    L.control.zoom({position:'bottomright'}).addTo(mymap);



/* HANDLING THE SEARCH QUERY */

//Populating <select>
$(document).ready(function() {
    $.ajax({
        url: 'libs/php/populateSelect.php',
        type: 'POST',
        dataType: 'json',
        success: function(result) {
            result['data'].features.forEach(function (feature) {
                $("<option>", {
                    value: feature.properties.iso_a2,
                    text: feature.properties.name
                }).appendTo("#countrySelect");
            });
            sortSelectOptions();
        }
    });
    function sortSelectOptions() {
        $("#countrySelect").append($("#countrySelect option")
            .remove().sort(function(a, b) {
                var at = $(a).text(),
                    bt = $(b).text();
                return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
            })
        );
    }
});

//Setting mymap.setView to <option> selected
function setView() {
    $.ajax({
        url: "libs/php/locateCountry.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: $('#countrySelect option:selected').val()
        },
        success: function(result) {

            if (result.status.name == "ok") {

                mymap.setView(result['coordinates']);

            }
      
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
};


/* HANDLING MODALS AND COUNTRY BORDER GENERATION */

//var weather = "";

function onEachFeature(f, l){
    var isoa3 = f.properties.iso_a3;
    l.on('click', function() {
        $.ajax({
            url: "libs/php/getRESTCountryInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                iso: isoa3
            },
            success: function(result) {

                //Modal Content
                document.getElementById('countryName').innerText = f.properties.name;
                document.getElementById("countryCapital").innerText = result['capital'] + ".";
                document.getElementById('countryPopulation').innerText = result['population'].toLocaleString("en-US") + " people.";
                document.getElementById('countryDemonym').innerText = result['demonym'] + ".";
                document.getElementById('countryLanguages').innerText = result["languages"].map(lang => lang.name).join(", ") + ".";
                document.getElementById('countryRegion').innerText = result["region"] + ".";
                
                document.getElementById('getProtectedPlanet').addEventListener('click', getProtectedPlanetAPI);

                document.getElementById('countryInfoProtectedPlanet').hidden = true;

                $('#modalPopup').modal('show');

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });

        var getProtectedPlanetAPI = function() {
        $.ajax({
            url: "libs/php/getProtectedPlanet.php",
            type: 'POST',
            dataType: 'json',
            data: {
                iso: isoa3
            },
            success: function(result) {

                document.getElementById('countryInfoProtectedPlanet').hidden = false;

                document.getElementById('countryLandArea').innerText = result['landarea'].toLocaleString("en-US") + " km2";
                document.getElementById('countryMarineArea').innerText = result['marinearea'].toLocaleString("en-US") + " km2";
                document.getElementById('countryProtectedLandArea').innerText = result['palandarea'].toLocaleString("en-US") + " km2";
                document.getElementById('countryProtectedMarineArea').innerText = result['pamarinearea'].toLocaleString("en-US") + " km2";
                document.getElementById('countryPercentageofLandProtected').innerText = result['percentpalandarea'].toLocaleString("en-US") + " %";
                document.getElementById('countryPercentageofMarineProtected').innerText = result['percentpamarinearea'].toLocaleString("en-US") + " %";
                
    
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });
        }; 
    });
};

var myStyle = {
    "color": "#36454f",
    "weight": 2,
    "opacity": 0,
    "fillOpacity": 0
};

var geoJSONLayer = new L.GeoJSON.AJAX('vendors/json/countryBorders.geo.json',{
    style: myStyle, 
    onEachFeature: onEachFeature
}).addTo(mymap);


/* var updateWeather = geoJSONLayer.on('click', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    
    $.ajax({
        url: "libs/php/getWeatherData.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: lat,
            lng: lng
        },
        success: function(result) {
                
                weather = result['weather'];
                console.log(weather);   

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }   
    });
}); */