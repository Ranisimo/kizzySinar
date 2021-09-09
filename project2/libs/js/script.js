function openDropDown() {
    console.log("Howdy");
    document.getElementById('dropDownContainer').style.visibility="visible";
    document.getElementById('dropDownContainer').style.display="block";
};

function closeDropDown() {
    console.log("Goodbye");
    document.getElementById('dropDownContainer').style.visibility="hidden";
    document.getElementById('dropDownContainer').style.display="none";
};

$(document).ready(function() {
    getAll();
    getDepartments();
    getLocations();
});

function getDepartments() {
    $.ajax({
        type: "GET",
        url: "libs/php/getAllDepartments.php",
        dataType: 'json',
        data: {},
        success: function(result) {
            var departments = result['data'];
            var departmentSelect = $('#departments')

            departments.forEach(function (department){
                $('<option>', {
                    text: department.name,
                    value: department.id
                }).appendTo(departmentSelect);
            });

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }

    })
};

function getLocations() {
    $.ajax({
        type: "GET",
        url: "libs/php/getAllLocations.php",
        dataType: 'json',
        data: {},
        success: function(result) {
            var locations = result['data'];
            var locationSelect = $('#locations');
            console.log(locations)

            locations.forEach(function (location){
                $('<option>', {
                    text: location.name,
                    value: location.id
                }).appendTo(locationSelect);
            });

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }

    })
};

function getAll() {
    $('#locations').prop('selectedIndex',0);
    $('#departments').prop('selectedIndex',0);
    $.ajax({
        type: "GET",
        url: "libs/php/getAll.php",
        dataType: 'json',
        data: {},
        success: function(result) {
            var directoryBody = $("<tbody></tbody>").appendTo('#companyDirectory');
            $('#companyDirectory tbody').empty();

            var directoryResult = result['data'];

            directoryResult.forEach(function (entry){
                var row = $("<tr></tr>").addClass("content").appendTo(directoryBody);
                $('<td></td>').text(entry.firstName).appendTo(row);
                $('<td></td>').text(entry.lastName).appendTo(row);
                $('<td></td>').text(entry.location).appendTo(row);
                $('<td></td>').text(entry.department).appendTo(row);
                $('<button></button>').text("Edit").attr('id', entry.id).appendTo(row);
            });

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }

    })
};

function startSearch(){
    var name = '';
    var department = '';
    var location = '';

    if ($('#any').is(':checked')) {
        if ($('#locations option:selected').val() === "all") {
            location = '%';
        } else {
            location = $('#locations option:selected').val()
        };

        if ($('#departments option:selected').val() === "all") {
            department = '%';
        } else {
            department = $('#departments option:selected').val()
        };

        if ($('#searchQuery').val() === "") {
            name = '%';
        } else {
            name = $('#searchQuery').val()
        };

        $.ajax({
            type: "GET",
            url: "libs/php/getPersonnelByName+Loc+Dep.php",
            dataType: 'json',
            data: {
                name: name,
                department: department,
                location: location
            },
            success: function(result) {

                var directoryBody = $("<tbody></tbody>").appendTo('#companyDirectory');
                $('#companyDirectory tbody').empty();

                var directoryResult = result['data']['personnel'];

                directoryResult.forEach(function (entry){
                    var row = $("<tr></tr>").addClass("content").appendTo(directoryBody);
                    $('<td></td>').text(entry.firstName).appendTo(row);
                    $('<td></td>').text(entry.lastName).appendTo(row);
                    $('<td></td>').text(entry.location).appendTo(row);
                    $('<td></td>').text(entry.department).appendTo(row);

                    $('<button></button>').text("Edit").attr('id', entry.id).appendTo(row);
                });

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }

        })
    } else if ($('#forename').is(':checked')){
        if ($('#locations option:selected').val() === "all") {
            location = '%';
        } else {
            location = $('#locations option:selected').val()
        };

        if ($('#departments option:selected').val() === "all") {
            department = '%';
        } else {
            department = $('#departments option:selected').val()
        };

        $.ajax({
            type: "GET",
            url: "libs/php/getPersonnelByFirstName+Loc+Dep.php",
            dataType: 'json',
            data: {
                name: $('#searchQuery').val(),
                department: department,
                location: location
            },
            success: function(result) {

                var directoryBody = $("<tbody></tbody>").appendTo('#companyDirectory');
                $('#companyDirectory tbody').empty();

                var directoryResult = result['data']['personnel'];

                directoryResult.forEach(function (entry){
                    var row = $("<tr></tr>").addClass("content").appendTo(directoryBody);
                    $('<td></td>').text(entry.firstName).appendTo(row);
                    $('<td></td>').text(entry.lastName).appendTo(row);
                    $('<td></td>').text(entry.location).appendTo(row);
                    $('<td></td>').text(entry.department).appendTo(row);

                    $('<button></button>').text("Edit").attr('id', entry.id).appendTo(row);
                });

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }

        })
    } else if ($('#surname').is(':checked')){

        if ($('#locations option:selected').val() === "all") {
            location = '%';
        } else {
            location = $('#locations option:selected').val()
        };

        if ($('#departments option:selected').val() === "all") {
            department = '%';
        } else {
            department = $('#departments option:selected').val()
        };

        $.ajax({
            type: "GET",
            url: "libs/php/getPersonnelByLastName+Loc+Dep.php",
            dataType: 'json',
            data: {
                name: $('#searchQuery').val(),
                department: department,
                location: location
            },
            success: function(result) {

                var directoryBody = $("<tbody></tbody>").appendTo('#companyDirectory');
                $('#companyDirectory tbody').empty();

                var directoryResult = result['data']['personnel'];

                directoryResult.forEach(function (entry){
                    var row = $("<tr></tr>").addClass("content").appendTo(directoryBody);
                    $('<td></td>').text(entry.firstName).appendTo(row);
                    $('<td></td>').text(entry.lastName).appendTo(row);
                    $('<td></td>').text(entry.location).appendTo(row);
                    $('<td></td>').text(entry.department).appendTo(row);

                    $('<button></button>').text("Edit").attr('id', entry.id).appendTo(row);
                });

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }

        })
    }
};