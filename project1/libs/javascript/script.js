console.log("script.js Loaded.")
$(window).on('load', function () {
    if (
        $('#preloader').length) {$('#preloader').delay(1000).fadeOut('slow',function () {
            $(this).remove();
        });
    }
});


var mymap = L.map('mapid').setView([48.85661, 2.3515], 11);
      L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=nr1yo2LitcA3V1WiGnpQNQTE2ooNfxu7xxHlxldA7OirWsWMyBSLgoSzyVksXpdG', {}).addTo(mymap);
      mymap.attributionControl.addAttribution("<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors");
console.log("Leaflet Map Loaded.")


$(document).ready(function() {
    console.log("Select Function Loaded.");
    $.ajax({
      url: 'libs/php/getCountryISO.php',
      type: 'POST',
      dataType: 'json',
      success: function(data) {
          console.log(JSON.stringify(data));
          console.log("JSON stringified");
        //$.each(data, function(key, countryName) {
            //var option = new Option(countryName, countryName);
            //$(option).html(countryName);
            //$("#countrySelect").append(option);
        //})
      }});
  });