$('.text-success').css({'visibility': 'visible'});
$(document).ready(function() {
    getAll();
    getDepartments();
    getLocations();
    hideStatusMessages();

    $('#addPersonnelForm').submit(function(e) {
        if ($('#entryDepartment option:selected').val() === "all") {
            $('.alert-warning').css({'display': 'block'});
            return false;
        } else if (!confirm('Are you sure you wish to add?')) {
            return false;
        } else { 
            hideStatusMessages();
            $.ajax({
                type: "POST",
                url: "libs/php/insertPersonnel.php",
                dataType: 'json',
                data: $(this).serialize(),
        
                success: function(result) {
                    
                    $('.alert-success').css({'display': 'block'});
                    $('#submitted').css({'display': 'block'});
                    $("#addPersonnelForm")[0].reset();
                    resetAll();
        
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
        
            });
        }   
    });

    $('#editPersonnelForm').submit(function(e) {
        e.preventDefault();
        if ($('#editDepartmentID option:selected').val() === "all") {
            hideStatusMessages();
            $('.alert-warning').css({'display': 'block'});
            return false;
        } else if (!confirm('Are you sure you wish to edit?')) {
            return false;
        } else {    
            hideStatusMessages();
            $.ajax({
                type: "POST",
                url: "libs/php/updatePersonnelByID.php",
                dataType: 'json',
                data: $(this).serialize(),
        
                success: function(result) {

                    $('.alert-success').css({'display': 'block'});
                    $('#edited').css({'display': 'block'});
                    resetAll();

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
        
            });
        }
    });

    $('#deletePersonnelForm').submit(function(e) {
        e.preventDefault();
        if (!confirm('Are you sure you wish to delete?')) {
            return false;
        } else {

            var personnelID = $("#personnelID").attr('value')

            hideStatusMessages();
            $.ajax({
                type: "POST",
                url: "libs/php/deletePersonnelByID.php",
                dataType: 'json',
                data: $(this).serialize(),
        
                success: function(result) {

                    $('.alert-success').css({'display': 'block'});
                    $('#deleted').css({'display': 'block'});
                    resetAll();

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
        
            });
        }
    });

    $('#addDepartmentForm').submit(function(e) {
        e.preventDefault();
        if ($('#addLocationID option:selected').val() === "all") {
            hideStatusMessages();
            $('.alert-warning').css({'display': 'block'});
            return false;
        } else if (!confirm('Are you sure you wish to add?')) {
            return false;
        } else {
            hideStatusMessages();
            $.ajax({
                type: "POST",
                url: "libs/php/insertDepartment.php",
                dataType: 'json',
                data: $(this).serialize(),
                success: function(result) { 
                    $('.alert-success').css({'display': 'block'});
                    $("#addDepartmentForm")[0].reset();
                    resetAll();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }
    });

    $('#updateDepartmentForm').submit(function(e) {
        e.preventDefault();
        hideStatusMessages();
        if ($('#updateLocationID option:selected').val() === "all" || $('#updateDepartmentID option:selected').val() === "all") {
            $('.warning-pre').css({'display': 'block'});
            return false;
        } else if (!confirm('Are you sure you wish to update?')) {
            return false;
        } else {
            hideStatusMessages();
            $.ajax({
                type: "POST",
                url: "libs/php/updateDepartmentByID.php",
                dataType: 'json',
                data: $(this).serialize(),
                success: function(result) { 
                    $('.alert-success').css({'display': 'block'});
                    $('#departmentUpdated').css({'display': 'block'});
                    $("#updateDepartmentForm")[0].reset();
                    resetAll();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }
    });

    $('#deleteDepartmentForm').submit(function(e) {
        e.preventDefault();
        if ($('.errorfix option:selected').val() === "all") {
            $('.warning-pre').css({'display': 'block'});
            return false;
        } else if (!confirm('Are you sure you wish to delete?')) {
            return false;
        } else {
            hideStatusMessages();
            $.ajax({
                type: "POST",
                url: "libs/php/deleteDepartmentByID.php",
                dataType: 'json',
                data: $(this).serialize(),
                success: function(result) { 
                    
                    if (result['status']['code'] === "400") {
                        $('.alert-warning').css({'display': 'block'});
                        $('.warning-pre').css({'display': 'none'});
                    } else {
                        $('.alert-success').css({'display': 'block'});
                        $('.alert-warning').css({'display': 'none'});
                        $('#departmentDeleted').css({'display': 'block'});
                        $("#deleteDepartmentForm")[0].reset();
                        resetAll();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }
    });

    $('#addLocationForm').submit(function(e) {
        e.preventDefault();
        if (!confirm('Are you sure you wish to add?')) {
            return false;
        } else {
            hideStatusMessages();
            $.ajax({
                type: "POST",
                url: "libs/php/insertLocation.php",
                dataType: 'json',
                data: $(this).serialize(),
                success: function(result) {
                    $('.alert-success').css({'display': 'block'});
                    $('#locationSubmitted').css({'display': 'block'});
                    $("#addLocationForm")[0].reset();
                    resetAll();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }
    });

    $('#editLocationForm').submit(function(e) {
        e.preventDefault();
        hideStatusMessages();
        if ($('#editLocationByID option:selected').val() === "all") {
            $('.warning-pre').css({'display': 'block'});
            return false;
        } else if (!confirm('Are you sure you wish to update?')) {
            return false;
        } else {
            hideStatusMessages();
            $.ajax({
                type: "POST",
                url: "libs/php/updateLocationByID.php",
                dataType: 'json',
                data: $(this).serialize(),
                success: function(result) {
                    $('.alert-success').css({'display': 'block'});
                    $('#locationUpdated').css({'display': 'block'});
                    $("#editLocationForm")[0].reset();
                    resetAll();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }
    });

    $('#deleteLocationForm').submit(function(e) {
        e.preventDefault();
        if ($('#deleteLocationID option:selected').val() === "all") {
            $('.warning-pre').css({'display': 'block'});
            return false;
        } else if (!confirm('Are you sure you wish to delete?')) {
            return false;
        } else {
            hideStatusMessages();
            $.ajax({
                type: "POST",
                url: "libs/php/deleteLocationByID.php",
                dataType: 'json',
                data: $(this).serialize(),
                success: function(result) {

                    if (result['status']['code'] === "400") {
                        $('.alert-warning').css({'display': 'block'});
                        $('.warning-pre').css({'display': 'none'});
                    } else {
                        $('.alert-success').css({'display': 'block'});
                        $('.alert-warning').css({'display': 'none'});
                        $('#locationDeleted').css({'display': 'block'});
                        $("#deleteLocationForm")[0].reset();
                        resetAll();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }
    });
    return false;
});

function getDepartments() {
    $.ajax({
        type: "GET",
        url: "libs/php/getAllDepartments.php",
        dataType: 'json',
        data: {},
        success: function(result) {
            var departments = result['data'];
            var departmentSelect = $('._departments');
            departmentSelect.empty();

            $('<option>', {
                text: 'Select from Department',
                value: 'all',
                id: 'placeholderDepartment',
                disabled: true,
                selected: true
            }).appendTo(departmentSelect);

            $('<option>', {
                text: 'All Departments',
                value: 'all'
            }).appendTo(departmentSelect);

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
            var locationSelect = $('._locations');
            locationSelect.empty();

            $('<option>', {
                text: 'Select a Location',
                value: 'all',
                id: 'placeholderLocation',
                disabled: true,
                selected: true
            }).appendTo(locationSelect);

            $('<option>', {
                text: 'All Locations',
                value: 'all'
            }).appendTo(locationSelect);

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

function resetAll() {
    getAll();
    getLocations();
    getDepartments();
    $('#searchQuery').val('');
    $('#any').prop("checked", true);
}

function populateTable(data) {
    var directoryBody = $("<tbody></tbody>").appendTo('#companyDirectory');
    $('#companyDirectory tbody').empty();

    var directoryResult = data;

    directoryResult.forEach(function (entry){
        var row = $("<tr></tr>").addClass("content").appendTo(directoryBody);
        $('<td></td>').text(entry.firstName).appendTo(row);
        $('<td></td>').text(entry.lastName).appendTo(row);
        $('<td></td>').text(entry.location).appendTo(row);
        $('<td></td>').text(entry.department).appendTo(row);

        var editTD = $('<td></td>').appendTo(row);
        $('<button></button>').text("Edit").attr('id', 'edit'+entry.id).addClass("btn-warning").appendTo(editTD);
        
        var deleteTD = $('<td></td>').appendTo(row);
        $('<button></button>').text("Delete").attr('id', 'delete'+entry.id).addClass("btn-danger").appendTo(deleteTD);

        $('#edit'+entry.id).click(function() {
            $('#edited').css({'display': 'none'});
            hideStatusMessages()
            $('#editPersonnelModal').modal('show');
            $('#editFirstName').attr('value',entry.firstName);
            $('#editLastName').attr('value',entry.lastName);
            $('#editEmail').attr('value',entry.email);
            $('#editDepartmentID option:contains("'+entry.department+'")').prop('selected', true);
            $('._personnelID').attr('value', entry.id);
        });

        $('#delete'+entry.id).click(function() {
            $('#deleted').css({'display': 'none'});
            hideStatusMessages()
            $('#deletePersonnelModal').modal('show');
            $('#deleteFirstName').text(entry.firstName);
            $('#deleteLastName').text(entry.lastName);
            $('#deleteEmail').text(entry.email);
            $('#deleteDepartmentID').text(entry.department);
            $('._personnelID').attr('value', entry.id);
        });
    });
}

function getAll() {
    $('#locations').prop('selectedIndex',0);
    $('#departments').prop('selectedIndex',0);
    $.ajax({
        type: "GET",
        url: "libs/php/getAll.php",
        dataType: 'json',
        data: {},
        success: function(result) {

            var data = result['data']
            populateTable(data);

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

                var data = result['data']['personnel'];
                populateTable(data);

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

                var data = result['data']['personnel'];
                populateTable(data);

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

                var data = result['data']['personnel'];
                populateTable(data);

            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }

        })
    }
};

function hideStatusMessages() {
    $('.alert').css({'display': 'none'});
    $('.text-success').css({'display': 'none'});
}

function openAddModal() {
    hideStatusMessages();
    $('#addPersonnelModal').modal('show');
};

function openAddLocationModal() {
    hideStatusMessages();
    $('#addLocationModal').modal('show');
};

function openAddDepartmentModal() {
    hideStatusMessages();
    $('#addDepartmentModal').modal('show');
};

function openDeleteLocationModal() {
    hideStatusMessages();
    $('#deleteLocationModal').modal('show');
}

function openDeleteDepartmentModal() {
    hideStatusMessages();
    $('#deleteDepartmentModal').modal('show');
}

function openUpdateLocationModal() {
    hideStatusMessages();
    $('#editLocationModal').modal('show');
}

function openUpdateDepartmentModal() {
    hideStatusMessages();
    $('#updateDepartmentModal').modal('show');
}

$('#updateDepartmentID').change(function() {
    $('#updateDepartmentName').attr('value', $('#updateDepartmentID option:selected').text());
});