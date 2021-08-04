/* $(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow',function () {
            $(this).remove();
        });
    }
}); */

$('#btnEarthquakeRun').on("click", function() {

    $.ajax({
        url: "libs/php/earthquake.php",
        type: 'POST',
        dataType: 'json',
        data: {
            north: $('#setNorthEQ').val(),
            south: $('#setSouthEQ').val(),
            east: $('#setEastEQ').val(),
            west: $('#setWestEQ').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#firstRow').html(result['data'][0]['datetime']);
                $('#secondRow').html(result['data'][0]['depth']);
                $('#thirdRow').html(result['data'][0]['magnitude']);
                $('#fourthRow').html(result['data'][0]['lng']);
                $('#fifthRow').html(result['data'][0]['lat']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});

/* $('#btnWeatherRun').on("click", function() {

    $.ajax({
        url: "libs/php/weather.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#selCountry').val(),
            lang: $('#selLanguage').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('.firstRow').html(result['data'][0]['datetime']);
                $('.secondRow').html(result['data'][0]['temperature']);
                $('.thirdRow').html(result['data'][0]['humidity']);
                $('.fourthRow').html(result['data'][0]['lng']);
                $('.fitfhRow').html(result['data'][0]['lat']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

});

$('#btnWikipediaSearch').on("click", function() {

    $.ajax({
        url: "libs/php/getCountryInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#selCountry').val(),
            lang: $('#selLanguage').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('.firstRow').html(result['data'][0]['datetime']);
                $('.secondRow').html(result['data'][0]['temperature']);
                $('.thirdRow').html(result['data'][0]['humidity']);
                $('.fourthRow').html(result['data'][0]['lng']);
                $('.fitfhRow').html(result['data'][0]['lat']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 

}); */