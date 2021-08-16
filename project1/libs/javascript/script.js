console.log("script.js Loaded.")

//Preloader
$(window).on('load', function () {
    if (
        $('#preloader').length) {$('#preloader').delay(1000).fadeOut('slow',function () {
            $(this).remove();
        });
    }
});

//Loading Map
var mymap = L.map('mapid').locate({setView: true, maxZoom: 16}); //Set Location to Users Location
      L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=nr1yo2LitcA3V1WiGnpQNQTE2ooNfxu7xxHlxldA7OirWsWMyBSLgoSzyVksXpdG', {}).addTo(mymap);
      mymap.attributionControl.addAttribution("<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors");
console.log("Leaflet Map Loaded.")

//Populating <select>
$(function () {
    $.get('libs/json/countryBorders.geo.json').done(function (data) {
      data.features.forEach(function (feature) {
        $("<option>", {
          value: feature.properties.iso_a2,
          text: feature.properties.name
        }).appendTo("#countrySelect");
      });
    });
});
console.log("Select Function Loaded.");

//Mapping Borders + Popups
function addDataToMap(data, mymap) {
    var myStyle = {
        "color": "#36454f",
        "weight": 2,
        "opacity": 0,
        "fillOpacity": 0
    };
    L.geoJson(data, {
            style: myStyle,

            onEachFeature: function (feature, mymap) {
                var popupFeatureName = feature.properties.name;
                var popup = L.popup()
                    .setContent
                        (
                        "<div id='popupContent'>" 
                        + popupFeatureName + 
                        "</div>"
                        )
                    .openOn(mymap);
                var popupOptions =
                    {
                    'maxWidth': '500',
                    'className' : 'custom'
                    }
                mymap.bindPopup(popup, popupOptions)
        }
    }).addTo(mymap);
    
};
$.getJSON("libs/json/countryBorders.geo.json", function(data) { addDataToMap(data, mymap); });