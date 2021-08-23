/* INITIAL STAGE SETTING */

//Preloader
$(window).on('load', function () {
    if (
        $('#preloader').length) {$('#preloader').delay(8000).fadeOut('slow',function () {
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

var weather = ""; //glabal variable

function onEachFeature(f, l){
    var isoa3 = f.properties.iso_a3;
    
    $.ajax({
            url: "libs/php/getRESTCountryInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                iso: isoa3
            },
            success: function(result) {
                //Formats the population string accordingly
                let pop = result['population'];
                let popStr = pop.toLocaleString("en-US");
                
                //Popup Content

                //Holds two divs, one for the REST Countries API, second for the Protected Planet API
                var popupCreateContainingModal = document.createElement("div");
                    popupCreateContainingModal.className = "modal-content";

                var popupCreateMainDivElement = document.createElement("div");
                    popupCreateMainDivElement.className = "container-fluid";

                var popupCreateCountryNameHeading = document.createElement("div");
                    popupCreateCountryNameHeading.innerHTML = f.properties.name;
                    popupCreateCountryNameHeading.className = "modal-title";

                var popupCreateCapitalTR = document.createElement("div");
                    popupCreateCapitalTR.className = "row";
                    var popupCreateCapitalTD = document.createElement("div");
                        popupCreateCapitalTD.className = "col font-weight-bold";
                        popupCreateCapitalTD.innerText = "Capital:";
                    var popupCreateCapitalResultTD = document.createElement("div");
                        popupCreateCapitalResultTD.className = "col";
                        popupCreateCapitalResultTD.innerText = result['capital'];
                popupCreateCapitalTR.appendChild(popupCreateCapitalTD);
                popupCreateCapitalTR.appendChild(popupCreateCapitalResultTD);

                var popupCreatePopulationTR = document.createElement("div");
                    popupCreatePopulationTR.className = "row";
                    var popupCreatePopulationTD = document.createElement("div");
                        popupCreatePopulationTD.className = "col font-weight-bold";
                        popupCreatePopulationTD.innerText = "Population:";
                    var popupCreatePopulationResultTD = document.createElement("div");
                        popupCreatePopulationResultTD.className = "col";
                        popupCreatePopulationResultTD.innerText = popStr;
                popupCreatePopulationTR.appendChild(popupCreatePopulationTD);
                popupCreatePopulationTR.appendChild(popupCreatePopulationResultTD);

                var popupCreateDemonymTR = document.createElement("div");
                    popupCreateDemonymTR.className = "row";
                    var popupCreateDemonymTD = document.createElement("div");
                        popupCreateDemonymTD.className = "col font-weight-bold";
                        popupCreateDemonymTD.innerText = "Demonym:"
                    var popupCreateDemonymResultTD = document.createElement("div");
                        popupCreateDemonymResultTD.className = "col";
                        popupCreateDemonymResultTD.innerText = result["demonym"];
                popupCreateDemonymTR.appendChild(popupCreateDemonymTD);
                popupCreateDemonymTR.appendChild(popupCreateDemonymResultTD);

                var popupCreateLanguagesTR = document.createElement("div");
                    popupCreateLanguagesTR.className = "row";
                    var popupCreateLanguagesTD = document.createElement("div");
                        popupCreateLanguagesTD.className = "col font-weight-bold";
                        popupCreateLanguagesTD.innerText = "Languages:";
                    var popupCreateLanguagesResultTD = document.createElement("div");
                        popupCreateLanguagesResultTD.className = "col";
                        popupCreateLanguagesResultTD.innerHTML = result["languages"].map(lang => lang.name).join(", ") + ".";
                popupCreateLanguagesTR.appendChild(popupCreateLanguagesTD);
                popupCreateLanguagesTR.appendChild(popupCreateLanguagesResultTD);

                var popupCreateRegionTR = document.createElement("div");
                    popupCreateRegionTR.className = "row";
                    var popupCreateRegionTD = document.createElement("div");
                        popupCreateRegionTD.className = "col font-weight-bold";
                        popupCreateRegionTD.innerText = "Region:";
                    var popupCreateRegionResultTD = document.createElement("div");
                        popupCreateRegionResultTD.className = "col";
                        popupCreateRegionResultTD.innerText = result["region"];
                popupCreateRegionTR.appendChild(popupCreateRegionTD);
                popupCreateRegionTR.appendChild(popupCreateRegionResultTD);


                popupCreateMainDivElement.appendChild(popupCreateCountryNameHeading);
                popupCreateMainDivElement.appendChild(popupCreateCapitalTR);
                popupCreateMainDivElement.appendChild(popupCreatePopulationTR);
                popupCreateMainDivElement.appendChild(popupCreateDemonymTR);
                popupCreateMainDivElement.appendChild(popupCreateLanguagesTR);
                popupCreateMainDivElement.appendChild(popupCreateRegionTR);

                popupCreateContainingModal.appendChild(popupCreateMainDivElement);

                //Section that contains OpenWeather API Data
                var weatherSection = document.createElement("div");
                    weatherSection.className = "container-fluid";
                    weatherSection.id = "weatherSection";
                    var weatherMain = document.createElement("div");
                        weatherMain.className = "row";
                        var weatherMainTD = document.createElement("div");
                            weatherMainTD.className = "col font-weight-bold";
                            weatherMainTD.innerText = "Weather:";
                        var weatherMainResultTD = document.createElement("div");
                            weatherMainResultTD.className = "col font-weight-bold";
                            weatherMainResultTD.innerText = updateWeather;
                weatherMain.appendChild(weatherMainTD);
                weatherMain.appendChild(weatherMainResultTD);

                weatherSection.appendChild(weatherMain);
                
                popupCreateContainingModal.appendChild(weatherSection);
                
                //Section that contains Protected Planet API Data
                var expandedSection = document.createElement("div");
                    expandedSection.className = "container-fluid";
                    expandedSection.id = "expandedSection";
                    expandedSection.hidden = true;
                
                popupCreateContainingModal.appendChild(expandedSection);

                //Button disables after first click to prevent multiple API calls
                var popupCreateAdditionalInfoButton = document.createElement("button");
                    popupCreateAdditionalInfoButton.innerHTML = "Protected Planet";
                    popupCreateAdditionalInfoButton.onclick = getProtectedPlanetAPI;
                    popupCreateAdditionalInfoButton.addEventListener("click", function() {
                        var x = this;
                        if (x.style.display === "none") {
                          x.style.display = "block";
                        } else {
                          x.style.display = "none";
                        }
                    });
                
                popupCreateContainingModal.appendChild(popupCreateAdditionalInfoButton);
                

                $('#modalPopup').modal();
            
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

                expandedSection.hidden = false;
                
                var protectedPlanetTitle = document.createElement("div");
                    protectedPlanetTitle.innerHTML = "Protected Planet";
                    protectedPlanetTitle.className = "h4";

                var LandArea = document.createElement("div");
                    LandArea.className = "row";
                    var LandAreaTD = document.createElement("div");
                        LandAreaTD.className = "col font-weight-bold";
                        LandAreaTD.innerText = "Land Area:"
                    var LandAreaResultTD = document.createElement("div");
                        LandAreaResultTD.className = "col";
                        LandAreaResultTD.innerText = (Math.round(result['landarea'] * 100) / 100).toLocaleString("en-US")  + " km2";
                    LandArea.appendChild(LandAreaTD);
                    LandArea.appendChild(LandAreaResultTD);

                var MarineArea = document.createElement("div");
                    MarineArea.className = "row";
                    var MarineAreaTD = document.createElement("div");
                        MarineAreaTD.className = "col font-weight-bold";
                        MarineAreaTD.innerText = "Marine Area:"
                    var MarineAreaResultTD = document.createElement("div");
                        MarineAreaResultTD.className = "col";
                        MarineAreaResultTD.innerText = (Math.round(result['marinearea'] * 100) / 100).toLocaleString("en-US")  + " km2";
                    MarineArea.appendChild(MarineAreaTD);
                    MarineArea.appendChild(MarineAreaResultTD);

                var LandProtectedArea = document.createElement("div");
                    LandProtectedArea.className = "row";
                    var LandProtectedAreaTD = document.createElement("div");
                        LandProtectedAreaTD.className = "col font-weight-bold";
                        LandProtectedAreaTD.innerText = "Protected Land Area:";
                    var LandProtectedAreaResultTD = document.createElement("div");
                        LandProtectedAreaResultTD.className = "col";
                        LandProtectedAreaResultTD.innerText = (Math.round(result['palandarea'] * 100) / 100).toLocaleString("en-US")  + " km2";
                    LandProtectedArea.appendChild(LandProtectedAreaTD);
                    LandProtectedArea.appendChild(LandProtectedAreaResultTD);

                var MarineProtectedArea = document.createElement("div");
                    MarineProtectedArea.className = "row";
                    var MarineProtectedAreaTD = document.createElement("div");
                        MarineProtectedAreaTD.className = "col font-weight-bold";
                        MarineProtectedAreaTD.innerText = "Protected Marine Area:";
                    var MarineProtectedAreaResultTD = document.createElement("div");
                        MarineProtectedAreaResultTD.className = "col";
                        MarineProtectedAreaResultTD.innerText = (Math.round(result['pamarinearea'] * 100) / 100).toLocaleString("en-US")  + " km2";
                    MarineProtectedArea.appendChild(MarineProtectedAreaTD);
                    MarineProtectedArea.appendChild(MarineProtectedAreaResultTD);

                var PercentLandProtectedArea = document.createElement("div");
                    PercentLandProtectedArea.className = "row";
                    var PercentLandProtectedAreaTD = document.createElement("div");
                        PercentLandProtectedAreaTD.className = "col font-weight-bold";
                        PercentLandProtectedAreaTD.innerText = "Percent of Land Protected:";
                    var PercentLandProtectedAreaResultTD = document.createElement("div");
                        PercentLandProtectedAreaResultTD.className = "col";
                        PercentLandProtectedAreaResultTD.innerText = (Math.round(result['percentpalandarea'] * 100) / 100).toLocaleString("en-US")  + " %";
                    PercentLandProtectedArea.appendChild(PercentLandProtectedAreaTD);
                    PercentLandProtectedArea.appendChild(PercentLandProtectedAreaResultTD);

                var PercentMarineProtectedArea = document.createElement("div");
                    PercentMarineProtectedArea.className = "row";
                    var PercentMarineProtectedAreaTD = document.createElement("div");
                        PercentMarineProtectedAreaTD.className = "col font-weight-bold";
                        PercentMarineProtectedAreaTD.innerText = "Percent of Marine Protected:";
                    var PercentMarineProtectedAreaResultTD = document.createElement("div");
                        PercentMarineProtectedAreaResultTD.className = "col";
                        PercentMarineProtectedAreaResultTD.innerText = (Math.round(result['percentpamarinearea'] * 100) / 100).toLocaleString("en-US")  + " %";
                    PercentMarineProtectedArea.appendChild(PercentMarineProtectedAreaTD);
                    PercentMarineProtectedArea.appendChild(PercentMarineProtectedAreaResultTD);

                var linkProtectedPlanet = document.createElement("div");
                var aTag = document.createElement("a");
                    var link = "https://www.protectedplanet.net/country/" + isoa3;
                    aTag.href = link;
                    aTag.target = "_blank";
                    aTag.innerText = "View more here";
                linkProtectedPlanet.appendChild(aTag);

                expandedSection.appendChild(protectedPlanetTitle);
                expandedSection.appendChild(LandArea);
                expandedSection.appendChild(MarineArea);
                expandedSection.appendChild(LandProtectedArea);
                expandedSection.appendChild(MarineProtectedArea);
                expandedSection.appendChild(PercentLandProtectedArea);
                expandedSection.appendChild(PercentMarineProtectedArea);
                expandedSection.appendChild(linkProtectedPlanet);
    
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
        });

    };
};

var myStyle = {
    "color": "#36454f",
    "weight": 2,
    "opacity": 0,
    "fillOpacity": 0
};

var geoJSONLayer = new L.GeoJSON.AJAX('libs/json/countryBorders.geo.json',{
    style: myStyle, 
    onEachFeature: onEachFeature
}).addTo(mymap);

var updateWeather = geoJSONLayer.on('click', function(e) {
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
});