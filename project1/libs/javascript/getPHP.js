console.log("getPHP loaded");
$('#countrySearch').click(function() {
    console.log("Button clicked");
    $.ajax({
        url: "libs/php/getCountryISO.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: $('#countrySelect option:selected').val()
        },
        success: function(result) {

            console.log(JSON.stringify(result));
            console.log("JSON stringified");

            if (result.status.name == "ok") {

                console.log("All recieved well.");
                mymap.setView(result['coordinates']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    })
});