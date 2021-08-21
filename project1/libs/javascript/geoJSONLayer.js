//For each country, a popup is bound.
function onEachFeature(f,l){
    var isoa3 = f.properties.iso_a3;
    var popupContent = "";
    
    $.ajax({
            url: "libs/php/getRESTCountryInfo.php",
            type: 'POST',
            dataType: 'json',
            data: {
                iso: isoa3
            },
            success: function(result) {
               // console.log(JSON.stringify(result));
               // console.log("JSON stringified");
            
                let pop = result["population"];
                let popStr = pop.toLocaleString("en-US");
                
                //Popup Content

                var popupCreateContainingDivElement = document.createElement("div");
                    popupCreateContainingDivElement.className = "container";

                var popupCreateMainDivElement = document.createElement("div");
                    popupCreateMainDivElement.className = "container";

                var popupCreateCountryNameHeading = document.createElement("div");
                    popupCreateCountryNameHeading.innerHTML = f.properties.name;
                    popupCreateCountryNameHeading.className = "h3";

                var popupCreateCapitalTR = document.createElement("div");
                    popupCreateCapitalTR.className = "row";
                    var popupCreateCapitalTD = document.createElement("div");
                        popupCreateCapitalTD.className = "col";
                        popupCreateCapitalTD.innerText = "Capital:";
                    var popupCreateCapitalResultTD = document.createElement("div");
                        popupCreateCapitalResultTD.className = "col";
                        popupCreateCapitalResultTD.innerText = result["capital"];
                popupCreateCapitalTR.appendChild(popupCreateCapitalTD);
                popupCreateCapitalTR.appendChild(popupCreateCapitalResultTD);

                var popupCreatePopulationTR = document.createElement("div");
                    popupCreatePopulationTR.className = "row";
                    var popupCreatePopulationTD = document.createElement("div");
                        popupCreatePopulationTD.className = "col";
                        popupCreatePopulationTD.innerText = "Population:";
                    var popupCreatePopulationResultTD = document.createElement("div");
                        popupCreatePopulationResultTD.className = "col";
                        popupCreatePopulationResultTD.innerText = popStr;
                popupCreatePopulationTR.appendChild(popupCreatePopulationTD);
                popupCreatePopulationTR.appendChild(popupCreatePopulationResultTD);

                var popupCreateDemonymTR = document.createElement("div");
                    popupCreateDemonymTR.className = "row";
                    var popupCreateDemonymTD = document.createElement("div");
                        popupCreateDemonymTD.className = "col";
                        popupCreateDemonymTD.innerText = "Demonym:"
                    var popupCreateDemonymResultTD = document.createElement("div");
                        popupCreateDemonymResultTD.className = "col";
                        popupCreateDemonymResultTD.innerText = result["demonym"];
                popupCreateDemonymTR.appendChild(popupCreateDemonymTD);
                popupCreateDemonymTR.appendChild(popupCreateDemonymResultTD);

                var popupCreateLanguagesTR = document.createElement("div");
                    popupCreateLanguagesTR.className = "row";
                    var popupCreateLanguagesTD = document.createElement("div");
                        popupCreateLanguagesTD.className = "col";
                        popupCreateLanguagesTD.innerText = "Languages:";
                    var popupCreateLanguagesResultTD = document.createElement("div");
                        popupCreateLanguagesResultTD.className = "col";
                        popupCreateLanguagesResultTD.innerText = result["languages"];
                popupCreateLanguagesTR.appendChild(popupCreateLanguagesTD);
                popupCreateLanguagesTR.appendChild(popupCreateLanguagesResultTD);

                var popupCreateRegionTR = document.createElement("div");
                    popupCreateRegionTR.className = "row";
                    var popupCreateRegionTD = document.createElement("div");
                        popupCreateRegionTD.className = "col";
                        popupCreateRegionTD.innerText = "Region:";
                    var popupCreateRegionResultTD = document.createElement("div");
                        popupCreateRegionResultTD.className = "col";
                        popupCreateRegionResultTD.innerText = result["region"];
                popupCreateRegionTR.appendChild(popupCreateRegionTD);
                popupCreateRegionTR.appendChild(popupCreateRegionResultTD);

                var popupCreateAdditionalInfoButton = document.createElement("button");
                    popupCreateAdditionalInfoButton.innerHTML = "Protected Planet";
                    popupCreateAdditionalInfoButton.onclick = getProtectedPlanetAPI;
                    

                popupCreateMainDivElement.appendChild(popupCreateCountryNameHeading);
                popupCreateMainDivElement.appendChild(popupCreateCapitalTR);
                popupCreateMainDivElement.appendChild(popupCreatePopulationTR);
                popupCreateMainDivElement.appendChild(popupCreateDemonymTR);
                popupCreateMainDivElement.appendChild(popupCreateLanguagesTR);
                popupCreateMainDivElement.appendChild(popupCreateRegionTR);
                popupCreateMainDivElement.appendChild(popupCreateAdditionalInfoButton);

                popupCreateContainingDivElement.appendChild(popupCreateMainDivElement);



                var expandedSection = document.createElement("div");
                    expandedSection.className = "container";
                    expandedSection.id = "expandedSection";
                
                popupCreateContainingDivElement.appendChild(expandedSection);


                if (result.status.name == "ok") {

                    popupContent = popupCreateContainingDivElement;
                    //Second Attempt
                    /*"<div class='container' id='appendButton'>" +
                        "<div class='h3'>" + f.properties.name + "</div>" +
                        "<div class='row'>" +
                            "<div class='col'>Capital:</div>" +
                            "<div class='col'>" + result["capital"] + "</div>" +
                        "</div>" +
                        "<div class='row'>" +
                            "<div class='col'>Population:</div>" +
                            "<div class='col'>" + popStr + "</div>" +
                        "</div>" +
                        "<div class='row'>" +
                            "<div class='col'>Demonym:</div>" +
                            "<div class='col'>" + result["demonym"] + "</div>" +
                        "</div>" +
                        "<div class='row'>" +
                            "<div class='col'>Language:</div>" +
                            "<div class='col'>" + result["languages"] + "</div>" +
                        "</div>" +
                        "<div class='row'>" +
                            "<div class='col'>Region:</div>" +
                            "<div class='col'>" + result["region"] + "</div>" +
                        "</div><br/>" + "<button onclick='getProtectedPlanetAPI(f)' id='APIButton'>Protected Planet</button>" + //Button didn't work
                    "</div>";*/
                    
                    //Initial Attempt
                    /*"<table><tr><th class='display-4'>" + f.properties.name + "</th></tr>" + 
                    "<tr><td class='font-weight-bold'>Capital:</td><td>" + result["capital"] + "</td></tr>" +
                    "<tr><td class='font-weight-bold'>Population:</td><td>" + popStr + "</td></tr>" +
                    "<tr><td class='font-weight-bold'>Demonym:</td><td>" + result["demonym"] + "</td></tr>" +
                    "<tr><td class='font-weight-bold'>Languages:</td><td>" + result["languages"] + "</td></tr>" +
                    "<tr><td class='font-weight-bold'>Region:</td><td>" + result["region"] + "</td></tr>";*/

                    var popupOptions =
                        {
                        'minWidth': '300',
                        'className' : 'custom'
                        }
                    l.bindPopup(popupContent, popupOptions);
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
            }
    });
    var getProtectedPlanetAPI = function() {
        console.log("Button clicked");
        console.log(isoa3);
    
        $.ajax({
            url: "libs/php/getProtectedPlanet.php",
            type: 'POST',
            dataType: 'json',
            data: {
                iso: isoa3
            },
            success: function(result) {
    

                    var MarineProtectedArea = document.createElement("div");
                        MarineProtectedArea.className = "row";
                        var MarineProtectedAreaTD = document.createElement("div");
                            MarineProtectedAreaTD.className = "col";
                            MarineProtectedAreaTD.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
                    MarineProtectedArea.appendChild(MarineProtectedAreaTD);
    
                expandedSection.appendChild(MarineProtectedArea);
    
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