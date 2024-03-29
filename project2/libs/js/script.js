$(window).on('load', function () {
    if (
        $('#preloader').length) {$('#preloader').delay(1000).fadeOut('slow',function () {
            $(this).remove();
        });
    }
});

$(document).ready(function() {
    getAll();
    getDepartments();
    getLocations();
    hideStatusMessages();

    $('#addPersonnelForm').submit(function(e) {
        if ($('#entryDepartment option:selected').val() === "all") {
            $('.alert-warning').css({'display': 'block'});
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
    });

    $('#addDepartmentForm').submit(function(e) {
        e.preventDefault();
        if ($('#addLocationID option:selected').val() === "all") {
            hideStatusMessages();
            $('.alert-warning').css({'display': 'block'});
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
        if ($('#updateLocationID option:selected').val() === "all") {
            $('.warning-pre').css({'display': 'block'});
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
        var id = $('#deleteDepartmenByID').val();
        e.preventDefault();
        hideStatusMessages();
        $.ajax({
            type: "POST",
            url: "libs/php/deleteDepartmentByID.php",
            dataType: 'json',
            data: {departmentID: id},
            success: function(result) { 
                
                $('.alert-success').css({'display': 'block'});
                $('.alert-warning').css({'display': 'none'});
                resetAll();
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    });

    $('#addLocationForm').submit(function(e) {
        e.preventDefault();
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
        
    });

    $('#editLocationForm').submit(function(e) {
        e.preventDefault();
        hideStatusMessages();
        if ($('#editLocationName').val() === "") {
            $('.warning-pre').css({'display': 'block'});
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
        var id = $('#deleteLocationID').val();
        e.preventDefault();
        hideStatusMessages();
        $.ajax({
            type: "POST",
            url: "libs/php/deleteLocationByID.php",
            dataType: 'json',
            data: {locationID: id},
            success: function(result) {
                $('.alert-success').css({'display': 'block'});
                $('.alert-warning').css({'display': 'none'});
                resetAll();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    });
    return false;
});

function showConfirm() {
    $('.warning-confirm').css({'display': 'block'});
}

function checkForDepartmentDependants(id) {
    $.ajax({
        type: "POST",
        url: "libs/php/checkDepartmentHasDependants.php",
        dataType: 'json',
        data: {id: id},
        success: function(result) {

            if (result['status']['code'] === "400") {
                $('.alert-warning').css({'display': 'block'});
                $('.warning-confirm').css({'display': 'none'});
                $('#triggerDepartmentDeleteConfirm').css({'display': 'none'});
            } else {
                $('#triggerDepartmentDeleteConfirm').css({'display': 'block'});
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function checkForLocationDependants(id) {
    $.ajax({
        type: "POST",
        url: "libs/php/checkLocationHasDependants.php",
        dataType: 'json',
        data: {id: id},
        success: function(result) {
            if (result['status']['code'] === "400") {
                $('.alert-warning').css({'display': 'block'});
                $('.warning-confirm').css({'display': 'none'});
                $('#triggerLocationDeleteConfirm').css({'display': 'none'});
            } else {
                $('#triggerLocationDeleteConfirm').css({'display': 'block'});
            } 
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

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

            var data = result['data'];

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
            }).appendTo('#departments');

            departments.forEach(function (department){
                $('<option>', {
                    text: department.name,
                    value: department.id
                }).appendTo(departmentSelect);
            });

            populateDepartmentTable();

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

            var data = result['data'];

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
            }).appendTo('#locations');

            locations.forEach(function (location){
                $('<option>', {
                    text: location.name,
                    value: location.id
                }).appendTo(locationSelect);
            });

            populateLocationTable(data);

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

function populatePersonnelTable(data) {
    var companyDirectoryPersonnel = $("#companyDirectoryPersonnel")
    var directoryBody = $("<tbody></tbody>").appendTo(companyDirectoryPersonnel);
    $('#companyDirectoryPersonnel tbody').empty();

    var directoryResult = data;

    directoryResult.forEach(function (entry){
        var lastName = entry.lastName;
        var fullName = lastName.toUpperCase() + ', ' + entry.firstName;
        var row = $("<tr></tr>").addClass("content").appendTo(directoryBody);
        $('<td></td>').text(fullName).appendTo(row);
        $('<td></td>').text(entry.location).addClass("hideTH").appendTo(row);
        $('<td></td>').text(entry.department).appendTo(row);

        var editTD = $('<td></td>').appendTo(row);
        $('<button></button>').attr('id', 'edit'+entry.id).addClass("btn btn-warning fa fa-2x fa-edit").appendTo(editTD);
        
        var deleteTD = $('<td></td>').appendTo(row);
        $('<button></button>').attr('id', 'delete'+entry.id).addClass("btn btn-danger fa fa-2x fa-trash-o").appendTo(deleteTD);

        $('#edit'+entry.id).click(function() {
            $.ajax({
                type: "GET",
                url: "libs/php/getPersonnelByID.php",
                dataType: 'json',
                data: {editID: entry.id},
                success: function(result) {
                    var personnel = result['data']['personnel'][0];
                    $('#editPersonnelModal').modal('show');
                    hideStatusMessages()
                    
                    $('#editFirstName').attr('value',personnel.firstName);
                    $('#editLastName').attr('value',personnel.lastName);
                    $('#editEmail').attr('value',personnel.email);
                    $('#editDepartmentID option[value='+personnel.departmentID+']').prop('selected', true);
                    $('._personnelID').attr('value', personnel.id);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                },
            }); 
        });

        $('#delete'+entry.id).click(function() {
            $('#deleted').css({'display': 'none'});
            hideStatusMessages()
            $('#deletePersonnelModal').modal('show');
            $('#deleteFirstName').text(entry.firstName);
            $('#deleteLastName').text(entry.lastName);
            $('#deleteEmail').text(entry.email);
            $('#deleteDepartmentID').text(entry.department);
            $('._personnelID').attr('value', entry.id).css({'display': 'none'});
        });
    });
    
};

function populateDepartmentTable() {
    $.ajax({
        type: "GET",
        url: "libs/php/getDepartmentsAndLocations.php",
        dataType: 'json',
        data: {},
        success: function(result) {
            var companyDirectoryDepartment = $("#companyDirectoryDepartment")
            var directoryBody = $("<tbody></tbody>").appendTo(companyDirectoryDepartment);
            $('#companyDirectoryDepartment tbody').empty();

            var directoryResult = result['data'];

            directoryResult.forEach(function (entry){
                var row = $("<tr></tr>").addClass("content").appendTo(directoryBody);
                $('<td></td>').text(entry.name).appendTo(row);
                $('<td></td>').text(entry.location).appendTo(row);

                var editTD = $('<td></td>').appendTo(row);
                $('<button></button>').attr('id', 'editDept'+entry.id).addClass("btn btn-warning fa fa-2x fa-edit").appendTo(editTD);
                
                var deleteTD = $('<td></td>').appendTo(row);
                $('<button></button>').attr('id', 'deleteDept'+entry.id).addClass("btn btn-danger fa fa-2x fa-trash-o").appendTo(deleteTD);

                $('#editDept'+entry.id).click(function() {
                    openUpdateDepartmentModal();
                    $('#updateDepartmentName').val(entry.name);
                    $('#updateDepartmentID').val(entry.id);
                });

                $('#deleteDept'+entry.id).click(function() {
                    $('#deleteDepartmentName').text(entry.name);
                    $('#deleteDepartmenByID').val(entry.id).css({'display': 'none'});
                    checkForDepartmentDependants(entry.id);
                    openDeleteDepartmentModal();
                });
            })

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        },
    });
};

function populateLocationTable(data) {
    var companyDirectoryLocation = $("#companyDirectoryLocation")
    var directoryBody = $("<tbody></tbody>").appendTo(companyDirectoryLocation);
    $('#companyDirectoryLocation tbody').empty();

    var directoryResult = data;

    directoryResult.forEach(function (entry){
        var row = $("<tr></tr>").addClass("content").appendTo(directoryBody);
        $('<td></td>').text(entry.name).appendTo(row);

        var editTD = $('<td></td>').appendTo(row);
        $('<button></button>').attr('id', 'editLoc'+entry.id).addClass("btn btn-warning fa fa-2x fa-edit").appendTo(editTD);
        
        var deleteTD = $('<td></td>').appendTo(row);
        $('<button></button>').attr('id', 'deleteLoc'+entry.id).addClass("btn btn-danger fa fa-2x fa-trash-o").appendTo(deleteTD);

        $('#editLoc'+entry.id).click(function() {
            $('#editLocationName').val(entry.name);
            $('#editLocationID').val(entry.id).css({'display': 'none'});
            openUpdateLocationModal();
        });

        $('#deleteLoc'+entry.id).click(function() {
            var id = entry.id;
            $('#deleteLocationName').text(entry.name);
            $('#deleteLocationID').val(entry.id).css({'display': 'none'});
            checkForLocationDependants(id);
            openDeleteLocationModal();
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
            populatePersonnelTable(data);

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
            location = $('#locations option:selected').val();
        };

        if ($('#departments option:selected').val() === "all") {
            department = '%';
        } else {
            department = $('#departments option:selected').val();
        };

        if ($('#searchQuery').val() === "") {
            name = '%';
        } else {
            name = $('#searchQuery').val();
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
                populatePersonnelTable(data);

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
                populatePersonnelTable(data);

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
                populatePersonnelTable(data);

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