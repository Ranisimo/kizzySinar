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
var mymap = new L.map('mapid', { zoomControl: false }).setView([24.05179, -74.53138], 10); //Set Location to Users Location
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
    };
    navigator.geolocation.getCurrentPosition(getUserLocation);
});

function getUserLocation(position) {
    var userPositionlat = position.coords.latitude;
    var userPositionlng = position.coords.longitude;
    
    $.ajax({
        url: 'libs/php/userLocationLatLng.php',
        type: 'POST',
        dataType: 'json',
        data: {
            lat: userPositionlat,
            lng: userPositionlng
        },

        success: function(result) {

            isoa2 = result['data'];

            $('#countrySelect option[value=' +isoa2+']').prop("selected", true).change();

        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    })
};

var GeoJSONLayer = new L.GeoJSON();

var countryInformation = L.easyButton({
    position: 'bottomright',
    states: [{
        stateName: 'open-country-modal',
        icon: 'fa-globe',
        title: 'Open Country Information',
        onClick: function onEachFeature(f, l){
                var isoa2 = $('#countrySelect option:selected').val();
                modalGeneration(isoa2);
        }
    }]
});

var clusterMarkers = L.markerClusterGroup({
    showCoverageOnHover: false,
});

$('#countrySelect').change(function() {
    var isoa2 = $('#countrySelect option:selected').val();
    $.ajax({
        url: "libs/php/getCountryBorders.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: isoa2
        },
        success: function(result) {

            if (result.status.name == "ok") {

                GeoJSONLayer.clearLayers();
                clusterMarkers.clearLayers();

                var geoJSONFeature = result['data'];
                GeoJSONLayer.addData(geoJSONFeature).setStyle(myStyle).addTo(mymap);
                countryInformation.addTo( mymap );
                mymap.fitBounds(GeoJSONLayer.getBounds());

                addVisibleCityMarkers(isoa2);
                clusterMarkers.addTo(mymap);
            }
    
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
});

function addVisibleCityMarkers() {
    var isoa2 = $('#countrySelect option:selected').val();
    $.ajax({
        url: "libs/php/getCityMarkers.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: isoa2
        },
        success: function(result) {
                
            var citiesMarkers = L.geoJson(result, {
                onEachFeature: citiesModal
            });
            citiesMarkers.addTo(clusterMarkers);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    })
};

function onEachFeature(f, l){
    var isoa2 = $('#countrySelect option:selected').val();
    l.on('click', function() {
        modalGeneration(isoa2);
    });
};

var myStyle = {
    "color": "#36454f",
    "weight": 2,
    "opacity": 0.5,
    "fillOpacity": 0
};


/* HANDLING MODALS AND COUNTRY BORDER GENERATION */
var modalGeneration = function(isoa2){
    $.ajax({
        url: "libs/php/getRESTCountryInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: isoa2
        },
        success: function(result) {

            //Modal Content
            document.getElementById('countryName').innerText = result['name'];
            document.getElementById("countryCapital").innerText = result['capital'] + ".";
            document.getElementById('countryPopulation').innerText = result['population'].toLocaleString("en-US") + " people.";
            document.getElementById('countryDemonym').innerText = result['demonym'] + ".";
            document.getElementById('countryLanguages').innerText = result["languages"].map(lang => lang.name).join(", ") + ".";
            document.getElementById('countryRegion').innerText = result["region"] + ".";
            document.getElementById('getProtectedPlanet').setAttribute("iso", result["isoa3"]);

            document.getElementById('countryInfoProtectedPlanet').style.display = "none";

            $('#modalPopup').modal('show');

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}

document.getElementById('getProtectedPlanet').addEventListener('click', getProtectedPlanetAPI);

function getProtectedPlanetAPI() {
    var isoa3 = document.getElementById('getProtectedPlanet').getAttribute('iso');
    $.ajax({
        url: "libs/php/getProtectedPlanet.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: isoa3
        },
        success: function(result) {
            
            document.getElementById('countryLandArea').innerText = result['landarea'].toLocaleString("en-US") + " km2";
            document.getElementById('countryMarineArea').innerText = result['marinearea'].toLocaleString("en-US") + " km2";
            document.getElementById('countryProtectedLandArea').innerText = result['palandarea'].toLocaleString("en-US") + " km2";
            document.getElementById('countryProtectedMarineArea').innerText = result['pamarinearea'].toLocaleString("en-US") + " km2";
            document.getElementById('countryPercentageofLandProtected').innerText = result['percentpalandarea'].toLocaleString("en-US") + " %";
            document.getElementById('countryPercentageofMarineProtected').innerText = result['percentpamarinearea'].toLocaleString("en-US") + " %";

            document.getElementById('countryInfoProtectedPlanet').style.display = "block";
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
}; 


//CREATING MARKERS
function citiesModal(f,l) {

    var cityMarker = L.AwesomeMarkers.icon({
        icon: 'city',
        prefix: 'fa',
        markerColor: 'gray'
    });

    l.setIcon(cityMarker);

    l.on('click', function(e) {
        getWeather(e);
        document.getElementById('featureName').innerText = f.properties.name;
        document.getElementById('featureType').innerText = "City.";
        $('#modalMarker').modal('show');
    })
};

var getWeather = function(e) {
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
                
                document.getElementById('cityWeather').innerText = result['weather'][0]['main'] + ", " + result['weather'][0]['description'];

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }   
    });
};