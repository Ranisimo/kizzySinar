console.log("js Script loaded");

$(window).on('load', function () {
    if (
        $('#preloader').length) {$('#preloader').delay(1000).fadeOut('slow',function () {
            $(this).remove();
        });
    }
});

$('#btnEarthquakeRun').click(function() {
    console.log("Button clicked");
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
            console.log("JSON stringified");

            if (result.status.name == "ok") {

                $('#firstRowTitle').html('Date and Time:');
                $('#secondRowTitle').html('Depth:');
                $('#thirdRowTitle').html('Magnitude:');
                $('#fourthRowTitle').html('Longitude:');
                $('#fifthRowTitle').html('Latitude:');
                $('#firstRow').html(result['data'][0]['datetime']);
                $('#secondRow').html(result['data'][0]['depth']);
                $('#thirdRow').html(result['data'][0]['magnitude']);
                $('#fourthRow').html(result['data'][0]['lng']);
                $('#fifthRow').html(result['data'][0]['lat']); 

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    }); 

});

$('#btnWeatherRun').click(function() {

    $.ajax({
        url: "libs/php/weather.php",
        type: 'POST',
        dataType: 'json',
        data: {
            north: $('#setNorthW').val(),
            south: $('#setSouthW').val(),
            east: $('#setEastW').val(),
            west: $('#setWestW').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#firstRowTitle').html('Date and Time:');
                $('#secondRowTitle').html('Temperature:');
                $('#thirdRowTitle').html('Humidity:');
                $('#fourthRowTitle').html('Longitude:');
                $('#fifthRowTitle').html('Latitude:');
                $('#firstRow').html(result['data'][0]['datetime']);
                $('#secondRow').html(result['data'][0]['temperature']);
                $('#thirdRow').html(result['data'][0]['humidity']);
                $('#fourthRow').html(result['data'][0]['lng']);
                $('#fifthRow').html(result['data'][0]['lat']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    }); 

});

$('#btnWikipediaRun').click(function() {

    $.ajax({
        url: "libs/php/wikipediaSearch.php",
        type: 'POST',
        dataType: 'json',
        data: {
            q: $('#setPlaceNameWiki').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));

            if (result.status.name == "ok") {

                $('#firstRowTitle').html('Title:');
                $('#secondRowTitle').html('Summary:');
                $('#thirdRowTitle').html('Feature:');
                $('#fourthRowTitle').html('Country Code:');
                $('#fifthRowTitle').html('URL:');
                $('#firstRow').html(result['data'][0]['title']);
                $('#secondRow').html(result['data'][0]['summary']);
                $('#thirdRow').html(result['data'][0]['feature']);
                $('#fourthRow').html(result['data'][0]['countryCode']);
                $('#fifthRow').html(result['data'][0]['wikipediaUrl']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    }); 

}); 
