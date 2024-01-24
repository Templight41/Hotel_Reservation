const urlParams = new URLSearchParams(location.search);

let members = urlParams.get("members");
let date = urlParams.get("date");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


document.querySelector("#dateIn").value = urlParams.get("start");
document.querySelector("#dateOut").value = urlParams.get("end");


if(members>0) {
    document.querySelector("#num-of-adults").innerHTML = members;    
}


let startDate = new Date().toISOString().split('T')[0];
document.getElementById("dateIn").setAttribute('min', startDate);

let endDate = new Date().toISOString().split('T')[0];
document.getElementById("dateOut").setAttribute('min', startDate);

function dateChange() {
    //setting min value of date
    startDate = new Date().toISOString().split('T')[0];
    document.getElementById("dateIn").setAttribute('min', startDate);
    
    endDate = new Date().toISOString().split('T')[0];
    document.getElementById("dateOut").setAttribute('min', document.getElementById("dateIn").value);

    //storing value of dates
    let nextDateArr = document.getElementById("dateOut").value.split("-")
    console.log(nextDateArr)

    nextDate = nextDateArr[2] + " " + months[nextDateArr[1] - 1] + "" + nextDateArr[0];
    document.querySelector("#date-start-select-display").innerHTML = todayDate + " - " + nextDate;

    startDate = document.querySelector("#dateIn").value;
    endDate = document.querySelector("#dateOut").value;
}

function dateSelect() {
    startDate = document.querySelector("#dateIn").value;
    endDate = document.querySelector("#dateOut").value;

    if(startDate == "" && endDate == "") {
        document.querySelector(".date-selector-error").innerHTML = "Enter both Check-IN and OUT dates";
        document.querySelector(".date-selector-error").className += " visible";
        
    } else {
        urlParams.set("start", startDate);
        urlParams.set("end", endDate);

        document.querySelector(".date-selector-error").className = ".date-selector-error";
    
        window.location.search = urlParams
    }
}

function dateButton() {
    document.querySelector(".date-select-overlay-container").className += " overlay-visible";
}
document.querySelector("body").addEventListener("click", (e) => {
    if (startDate != undefined || startDate != null || endDate != undefined || endDate != null) {
        if(e.target.className == "date-select-overlay-container overlay-visible") document.querySelector(".date-select-overlay-container").className = "date-select-overlay-container";
    }
})



function membersButton() {
    if(document.querySelector("#members-select-container").attributes.visible.value == "0") {
        document.querySelector("#members-select-container").className += " members-select-container-visible";
        document.querySelector("#members-select-container").setAttribute("visible", 1)
    } else {
        document.querySelector("#members-select-container").className = "members-select-container";    
        document.querySelector("#members-select-container").setAttribute("visible", 0)       
    }
}
document.querySelector("#members-select-container input").addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        urlParams.set("members",e.target.value)
        window.location.search = urlParams
    }
})



startDate = urlParams.get("start");
endDate = urlParams.get("end");



if(startDate == undefined || startDate == null || endDate == undefined || endDate == null) {
    
    //date select feature
    dateButton()

} else if(!members || members<=0) {

    //number of people select feature
    urlParams.set("members",1)
    window.location.search = urlParams

} else {

    //whole page logic
    document.querySelector("#date-start-select-display").innerText = `${startDate} - ${endDate}`
    document.querySelector(".members-select-container input").setAttribute("value", members);

}