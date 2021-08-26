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
                    value: feature.properties.iso_a3,
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
function getBorder() {
    optionIso = $('#countrySelect option:selected').val();
    $.ajax({
        url: "libs/php/getCountryBorders.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: optionIso
        },
        success: function(result) {

            if (result.status.name == "ok") {

                console.log(result['data']);

            }
      
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            console.log(optionIso);
        }
    });
};


/* HANDLING MODALS AND COUNTRY BORDER GENERATION */
var modalGeneration = function(isoa3){
    $.ajax({
        url: "libs/php/getRESTCountryInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: isoa3
        },
        success: function(result) {

            //Modal Content
            document.getElementById('countryName').innerText = result['name'];
            document.getElementById("countryCapital").innerText = result['capital'] + ".";
            document.getElementById('countryPopulation').innerText = result['population'].toLocaleString("en-US") + " people.";
            document.getElementById('countryDemonym').innerText = result['demonym'] + ".";
            document.getElementById('countryLanguages').innerText = result["languages"].map(lang => lang.name).join(", ") + ".";
            document.getElementById('countryRegion').innerText = result["region"] + ".";
            document.getElementById('getProtectedPlanet').setAttribute("iso", isoa3);

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


//CREATING CITY MARKERS
var markersGroup = L.layerGroup();

var clusterMarkers = L.markerClusterGroup({
    showCoverageOnHover: false,
});

function shipModal(f,l) {

    var shipMarker = L.AwesomeMarkers.icon({
        icon: 'ship',
        prefix: 'fa',
        markerColor: 'blue'
    });

    l.setIcon(shipMarker);

    l.on('click', function(e) {
        getWeather(e);
        document.getElementById('featureName').innerText = f.properties.name;
        document.getElementById('featureType').innerText = "Port.";
        document.getElementById('featureLinks').hidden = false;
        document.getElementById('featureLinks').innerHTML = "<a href='" + f.properties.website + "' target='_blank'>" + f.properties.website + "</a>";
        $('#modalMarker').modal('show');
    })
};

$.getJSON('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson', function(data) {
    processPortJSON(data);
});  

function processPortJSON(data) {
    // Turn JSON object into geojson object
    var portMarkers = L.geoJson(data, {
        onEachFeature: shipModal
    });
    portMarkers.addTo(clusterMarkers);
}

function airportModal(f,l) {

    var cityMarker = L.AwesomeMarkers.icon({
        icon: 'plane',
        prefix: 'fa',
        markerColor: 'yellow'
    });

    l.setIcon(cityMarker);

    l.on('click', function(e) {
        getWeather(e);
        document.getElementById('featureName').innerText = f.properties.name;
        document.getElementById('featureType').innerText = f.properties.featureclass;
        document.getElementById('featureLinks').hidden = false;
        document.getElementById('featureLinks').innerHTML = "<a href='" + f.properties.wikipedia + "' target='_blank'>" + f.properties.wikipedia + "</a>";
        $('#modalMarker').modal('show');
    })
};

$.getJSON('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson', function(data) {
    processAirportJSON(data);
});  

function processAirportJSON(data) {
    // Turn JSON object into geojson object
    var airportMarkers = L.geoJson(data, {
        onEachFeature: airportModal
    });
    airportMarkers.addTo(clusterMarkers);
};

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
        document.getElementById('featureLinks').hidden = true;
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

$.getJSON('https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places_simple.geojson', function(data) {
    processCitiesJSON(data);
}); 

function processCitiesJSON(data) {
    // Turn JSON object into geojson object
    var citiesMarkers = L.geoJson(data, {
        onEachFeature: citiesModal
    });
    citiesMarkers.addTo(clusterMarkers);
};

function onEachFeature(f, l){
    var isoa3 = f.properties.iso_a3;
    l.on('click', function() {
        modalGeneration(isoa3);
    });
};

mymap.addLayer(clusterMarkers);