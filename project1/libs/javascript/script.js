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

//Populating <select>
$(function () {
    $.get('libs/json/countryBorders.geo.json').done(function (data) {
      data.features.forEach(function (feature) {
        $("<option>", {
          value: feature.properties.iso_a3,
          text: feature.properties.name
        }).appendTo("#countrySelect");
      });
    });
});