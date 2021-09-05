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
            result['data'].forEach(function (feature) {
                $("<option>", {
                    value: feature.iso_a2,
                    text: feature.name
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
        icon: 'fa-globe-americas fa-2x',
        title: 'Open Country Information',
        onClick: function onEachFeature(f, l){
                var isoa2 = $('#countrySelect option:selected').val();
                modalGeneration(isoa2);
        }
    }]
});

var weatherInformation = L.easyButton({
    position: 'bottomright',
    states: [{
        stateName: 'open-weather-modal',
        icon: 'fa-cloud-sun-rain fa-2x',
        title: 'Open Weather Information',
        onClick: function onEachFeature(f, l) {
            var isoa2 = $('#countrySelect option:selected').text(); 
            weatherModal(isoa2);
        }
    }]
});

var holidayInformation = L.easyButton({
    position: 'bottomright',
    states: [{
        stateName: 'open-weather-modal',
        icon: 'fa-calendar-day fa-2x',
        title: 'Open Weather Information',
        onClick: function onEachFeature(f, l) {
            var isoa2 = $('#countrySelect option:selected').val(); 
            holidayModal(isoa2);
        }
    }]
});

var COVIDInformation = L.easyButton({
    position: 'bottomright',
    states: [{
        stateName: 'open-weather-modal',
        icon: 'fa-virus fa-2x',
        title: 'Open Weather Information',
        onClick: function onEachFeature(f, l) {
            var isoa2 = $('#countrySelect option:selected').val(); 
            covidModal(isoa2);
        }
    }]
});

weatherInformation.button.style.cssText = "height: 35px;width:37px;padding: 5px;color: orange;";
countryInformation.button.style.cssText = "height: 35px;width:37px;padding: 5px;color: green;";
holidayInformation.button.style.cssText = "height: 35px;width:37px;padding: 5px;color: red;";
COVIDInformation.button.style.cssText = "height: 35px;width:37px;padding: 5px;color: lightblue;";

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
                GeoJSONLayer.addData( geoJSONFeature ).setStyle( myStyle ).addTo( mymap );
                countryInformation.addTo( mymap );
                weatherInformation.addTo( mymap );
                holidayInformation.addTo( mymap );
                COVIDInformation.addTo( mymap );
                mymap.fitBounds(GeoJSONLayer.getBounds());

                addVisibleCityMarkers( isoa2 );
                webcamMarkers( isoa2 );
                clusterMarkers.addTo( mymap );
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

function webcamMarkers() {
    var isoa2 = $('#countrySelect option:selected').val();
    $.ajax({
        url: "libs/php/getWindyAPI.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: isoa2
        },
        success: function(result) {
            var webcams = result['data']['webcams'];

            webcams.forEach(function(webcam) {
                var longitude = webcam.location.longitude;
                var latitude = webcam.location.latitude;

                var webcamMarker = L.AwesomeMarkers.icon({
                    icon: 'camera',
                    prefix: 'fa',
                    markerColor: 'blue'
                });

                var webcamMarkers = L.marker([latitude,longitude], {
                    icon: webcamMarker
                }).on('click', function(e){

                    document.getElementById('webcamName').innerText = webcam.title;
                    if (webcam.player.live.available) {
                        document.getElementById('webcamNote').innerText = "Live video feed";
                        document.getElementById('webcamViewport').src = webcam.player.live.embed;
                    } else if (webcam.player.month.available) {
                        document.getElementById('webcamNote').innerText = "Past month timelapse video";
                        document.getElementById('webcamViewport').src = webcam.player.month.embed;
                    } else if (webcam.player.day.available) {
                        document.getElementById('webcamNote').innerText = "Past day timelapse video";
                        document.getElementById('webcamViewport').src = webcam.player.day.embed;
                    } else {
                        document.getElementById('webcamViewport').src = "";
                        document.getElementById('webcamViewport').innerText = "Webcam footage is not available.";
                    };

                    $('#modalWebcam').modal('show');
                    mymap.setView(e.latlng, 13);
                });
                webcamMarkers.addTo(clusterMarkers);
            });

        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
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

            e = result['name'];
            capital = result['capital'];

            //Modal Content
            document.getElementById('countryName').innerText = result['name'];
            document.getElementById("countryCapital").innerText = result['capital'] + ".";

            getWikiInfo(capital);

            document.getElementById('countryPopulation').innerText = result['population'].toLocaleString("en-US") + " people.";
            document.getElementById('countryDemonym').innerText = result['demonym'] + ".";
            document.getElementById('countryLanguages').innerText = result["languages"].map(lang => lang.name).join(", ") + ".";
            document.getElementById('countryRegion').innerText = result["region"] + ".";
            document.getElementById('countryCurrency').innerText = result["currency"][0]["symbol"] + " " + result["currency"][0]["code"] + ", " + result["currency"][0]["name"] + ".";

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

var weatherModal = function(isoa2){
    $.ajax({
        url: "libs/php/getWeatherData.php",
        type: 'POST',
        dataType: 'json',
        data: {
            q: isoa2
        },
        success: function(result) {

            document.getElementById('weatherPlaceName').innerText = 'Weather in ' + isoa2;
            document.getElementById('currentWeather').innerText = result['weather'][0]['main'] + ', ' + result['weather'][0]['description'];
            document.getElementById('weatherTemperature').innerText = result['temps']['temp'] + '°C';
            document.getElementById('weatherFeelsLike').innerText = result['temps']['feels_like'] + '°C';
            document.getElementById('weatherLowTemperature').innerText = result['temps']['temp_min'] + '°C';
            document.getElementById('weatherHighTemperature').innerText = result['temps']['temp_max'] + '°C';
            document.getElementById('weatherHumidity').innerText = result['temps']['humidity'] + '%';
            document.getElementById('weatherWindSpeed').innerText = result['wind']['speed'] + 'm/s';
            document.getElementById('weatherWindGust').innerText = result['wind']['gust'] + 'm/s';

            var unixTimestampSunrise = result['sys']['sunrise'];
            var unixTimestampSunset = result['sys']['sunset'];
            var sunriseDate = new Date(unixTimestampSunrise * 1000);
            var sunsetDate = new Date(unixTimestampSunset * 1000);
            document.getElementById('weatherSunSet').innerText = sunriseDate;
            document.getElementById('weatherSunRise').innerText = sunsetDate;

            $('#modalWeather').modal('show');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
};

var holidayModal = function(isoa2){
    $.ajax({
        url: "libs/php/getHolidayAPI.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: isoa2
        },
        success: function(result) {

            var holidayTable = $("<tbody></tbody>").appendTo('#holidayTable');
            $('#holidayTable tbody').empty();

            var holidayList = result['data']['holidays'];

            document.getElementById('holidayTitle').innerText = "Holidays in " + $('#countrySelect option:selected').text();

            holidayList.forEach(function (holiday){
                var rowHeader = $("<tr></tr>").appendTo(holidayTable);
                $('<td></td>').text(holiday.name).appendTo(rowHeader);
                $('<td></td>').text(holiday.weekday.date.name).appendTo(rowHeader);
                $('<td></td>').text(holiday.date).appendTo(rowHeader);
                if (holiday.public) {
                    $('<td></td>').text('Public holiday').appendTo(rowHeader);
                } else {
                    $('<td></td>').text('Not a public holiday').appendTo(rowHeader);
                };
            });
           
            $('#modalHoliday').modal('show');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
};

var covidModal = function(isoa2){
    var isoa2 = $('#countrySelect option:selected').val();
    $.ajax({
        url: "libs/php/getCOVIDStatsAPI.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: isoa2
        },
        success: function(result) {

            document.getElementById('countryCOVIDName').innerText = "COVID Stats in " + $('#countrySelect option:selected').text();

            document.getElementById('COVIDDailyConfirmed').innerText = result['data']['dailyConfirmed'].toLocaleString("en-US");
            document.getElementById('COVIDDailyDeaths').innerText = result['data']['dailyDeaths'].toLocaleString("en-US");
            document.getElementById('COVIDActive').innerText = result['data']['activeCases'].toLocaleString("en-US");
            document.getElementById('COVIDCritical').innerText = result['data']['totalCritical'].toLocaleString("en-US");
            document.getElementById('COVIDTotalCases').innerText = result['data']['totalConfirmed'].toLocaleString("en-US");
            document.getElementById('COVIDTotalDeaths').innerText = result['data']['totalDeaths'].toLocaleString("en-US");
            document.getElementById('COVIDTotalRecovered').innerText = result['data']['totalRecovered'].toLocaleString("en-US");
            document.getElementById('COVIDLastUpdated').innerText = result['data']['lastUpdated'];

            $('#modalCOVID').modal('show');
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
        var name = f.properties.name;
        document.getElementById('featureName').innerText = f.properties.name;
        document.getElementById('featureType').innerText = "City.";
        getWikiInfo(name);
        $('#modalMarker').modal('show');
        mymap.setView(e.latlng, 13);
    })
};

var getWikiInfo = function(e) {
    $.ajax({
        url: "libs/php/getWikiInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            q: e
        },
        success: function(result) {
            
            document.getElementById("countryCapitalWikiLink").href = 'https://' + result['data'][0]['wikipediaUrl'];
            document.getElementById('cityWikiLink').href = 'https://' + result['data'][0]['wikipediaUrl'];
            document.getElementById('citySummary').innerText = result['data'][0]['summary'];

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }   
    });
}