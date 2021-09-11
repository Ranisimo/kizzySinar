function dropDownToggle() {
    var x = document.getElementById("dropDownContainer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    };
};

/* function closeDropDown() {
    $('#dropDownContainer').css({"visibility": "hidden", "display": "none"});
}; */

$(document).ready(function() {
    getAll();
    getDepartments();
    getLocations();
    $('.alert-success').css({'visibility': 'hidden'});
    $('.alert-warning').css({'visibility': 'hidden'});

    $('#addPersonnelForm').submit(function(e) {
        if (!confirm('Are you sure you wish to add?')) {
            return false;
        } else { 
            $.ajax({
                type: "POST",
                url: "libs/php/insertPersonnel.php",
                dataType: 'json',
                data: $(this).serialize(),
        
                success: function(result) {
                    
                    $('.alert-success').css({'visibility': 'visible'});
                    $('#submitted').css({'visibility': 'visible'});
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

    $('#addDepartmentForm').submit(function(e) {
        e.preventDefault();
        if (!confirm('Are you sure you wish to add?')) {
            return false;
        } else {
            $.ajax({
                type: "POST",
                url: "libs/php/insertDepartment.php",
                dataType: 'json',
                data: $(this).serialize(),
                success: function(result) { 
                    $('.alert-success').css({'visibility': 'visible'});
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
        if (!confirm('Are you sure you wish to update?')) {
            return false;
        } else {
            $.ajax({
                type: "POST",
                url: "libs/php/updateDepartmentByID.php",
                dataType: 'json',
                data: $(this).serialize(),
                success: function(result) { 
                    $('.alert-success').css({'visibility': 'visible'});
                    $('#departmentUpdated').css({'visibility': 'visible'});
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
        if (!confirm('Are you sure you wish to delete?')) {
            return false;
        } else {
            $.ajax({
                type: "POST",
                url: "libs/php/deleteDepartmentByID.php",
                dataType: 'json',
                data: $(this).serialize(),
                success: function(result) { 

                    resetAll();
                    if (result['status']['code'] === "400") {
                        $('.alert-warning').css({'visibility': 'visible'});
                    } else {
                        $('.alert-success').css({'visibility': 'visible'});
                        $('#departmentDeleted').css({'visibility': 'visible'});
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
            $.ajax({
                type: "POST",
                url: "libs/php/insertLocation.php",
                dataType: 'json',
                data: $(this).serialize(),
                success: function(result) {
                    $('.alert-success').css({'visibility': 'visible'});
                    $('#locationSubmitted').css({'visibility': 'visible'});
                    $("#addLocationForm")[0].reset();
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
        if (!confirm('Are you sure you wish to update?')) {
            return false;
        } else {
            $.ajax({
                type: "POST",
                url: "libs/php/updateLocationByID.php",
                dataType: 'json',
                data: $(this).serialize(),
                success: function(result) {
                    $('.alert-success').css({'visibility': 'visible'});
                    $('#locationUpdated').css({'visibility': 'visible'});
                    $("#editLocationForm")[0].reset();
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
        if (!confirm('Are you sure you wish to delete?')) {
            return false;
        } else {
            $.ajax({
                type: "POST",
                url: "libs/php/deleteLocationByID.php",
                dataType: 'json',
                data: $(this).serialize(),
                success: function(result) {

                    if (result['status']['code'] === "400") {
                        $('.alert-warning').css({'visibility': 'visible'});
                    } else {
                        $('.alert-success').css({'visibility': 'visible'});
                        $('#locationDeleted').css({'visibility': 'visible'});
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

    $('#editPersonnelForm').submit(function(e) {
        e.preventDefault();
        if (!confirm('Are you sure you wish to edit?')) {
            return false;
        } else {    
            $.ajax({
                type: "POST",
                url: "libs/php/updatePersonnelByID.php",
                dataType: 'json',
                data: $(this).serialize(),
        
                success: function(result) {

                    $('.alert-success').css({'visibility': 'visible'});
                    $('#edited').css({'visibility': 'visible'});
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

        
            $.ajax({
                type: "POST",
                url: "libs/php/deletePersonnelByID.php",
                dataType: 'json',
                data: $(this).serialize(),
        
                success: function(result) {

                    $('.alert-success').css({'visibility': 'visible'});
                    $('#deleted').css({'visibility': 'visible'});
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

        $('<td><button></button></td>').text("Edit").attr('id', 'edit'+entry.id).appendTo(row);
        
        $('<td><button></button></td>').text("Delete").attr('id', 'delete'+entry.id).appendTo(row);

        $('#edit'+entry.id).click(function() {
            $('#edited').css({'visibility': 'hidden'});
            hideStatusMessages()
            $('#editPersonnelModal').modal('show');
            $('#editFirstName').attr('value',entry.firstName);
            $('#editLastName').attr('value',entry.lastName);
            $('#editEmail').attr('value',entry.email);
            $('#editDepartmentID option:contains("'+entry.department+'")').prop('selected', true);
            $('._personnelID').attr('value', entry.id);
        });

        $('#delete'+entry.id).click(function() {
            $('#deleted').css({'visibility': 'hidden'});
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
    $('.alert-success').css({'visibility': 'hidden'});
    $('.alert-warning').css({'visibility': 'hidden'});
}

function openAddModal() {
    $('#submitted').css({'visibility': 'hidden'});
    hideStatusMessages();
    $('#addPersonnelModal').modal('show');
};

function openAddLocationModal() {
    $('#locationSubmitted').css({'visibility': 'hidden'});
    hideStatusMessages();
    $('#addLocationModal').modal('show');
};

function openAddDepartmentModal() {
    $('#departmentSubmitted').css({'visibility': 'hidden'});
    hideStatusMessages();
    $('#addDepartmentModal').modal('show');
};

function openDeleteLocationModal() {
    $('#locationDeleted').css({'visibility': 'hidden'});
    hideStatusMessages();
    $('#deleteLocationModal').modal('show');
}

function openDeleteDepartmentModal() {
    $('#departmentDeleted').css({'visibility': 'hidden'});
    hideStatusMessages();
    $('#deleteDepartmentModal').modal('show');
}

function openUpdateLocationModal() {
    $('#locationUpdated').css({'visibility': 'hidden'});
    hideStatusMessages();
    $('#editLocationModal').modal('show');
}

function openUpdateDepartmentModal() {
    $('#departmentUpdated').css({'visibility': 'hidden'});
    hideStatusMessages();
    $('#updateDepartmentModal').modal('show');
}