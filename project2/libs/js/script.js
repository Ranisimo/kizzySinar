console.log("Howdy")
document.getElementById('advancedDropDown').hidden = true;

var element = document.getElementById('dropDown')
element.addEventListener('click', function(){
    document.getElementById('advancedDropDown').hidden = false;
});