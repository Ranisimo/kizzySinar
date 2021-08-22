$('#countrySearch').click(function() {
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
    })
});