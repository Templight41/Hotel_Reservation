const urlParams = new URLSearchParams(location.search);

let members = urlParams.get("members");
let date = urlParams.get("date");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// let todayDate = `${new Date().getDate().toString()} ${months[new Date().getMonth().toString()]} ${new Date().getFullYear().toString()}`;
// let nextDate = `${new Date().getDate()} ${months[new Date().getMonth().toString()]} ${new Date().getFullYear().toString()}`;

// function nextDayFunc() {
//     if(new Date().getMonth() <= 7) {
//         console.log("first half year")
//         if(new Date().getMonth() == 1) {
//             //leap year
//             if(new Date().getFullYear() % 4 == 0) {
//                 if(new Date().getDate() == 29) {
//                     nextDate = `${1} ${months[new Date().getMonth() + 1]} ${new Date().getFullYear().toString()}`;
//                 } else {
//                     nextDate = `${new Date().getDate() + 1} ${months[new Date().getMonth()]} ${new Date().getFullYear().toString()}`;
//                 }
//             } else {
//                 if(new Date().getDate() == 28) {
//                     nextDate = `${1} ${months[new Date().getMonth() + 1]} ${new Date().getFullYear().toString()}`;
//                 } else {
//                     nextDate = `${new Date().getDate() + 1} ${months[new Date().getMonth()]} ${new Date().getFullYear().toString()}`;
//                 }
//             }
//         } else if(new Date().getMonth() % 2 == 0) {
//             if(new Date().getDate() == 31) {
//                 nextDate = `${1} ${months[new Date().getMonth() + 1]} ${new Date().getFullYear().toString()}`;
//             } else {
//                 nextDate = `${new Date().getDate() + 1} ${months[new Date().getMonth()]} ${new Date().getFullYear().toString()}`;
//             }
//         } else {
//             if(new Date().getDate() == 30) {
//                 nextDate = `${1} ${months[new Date().getMonth() + 1]} ${new Date().getFullYear().toString()}`;
//             } else {
//                 nextDate = `${new Date().getDate() + 1} ${months[new Date().getMonth()]} ${new Date().getFullYear().toString()}`;
//             }
//         }
//     } else {
//         console.log("second half year")
//         if(new Date().getMonth() % 2 == 0) {
//             if(new Date().getDate() == 30) {
//                 nextDate = `${1} ${months[new Date().getMonth() + 1]} ${new Date().getFullYear().toString()}`;
//             } else {
//                 nextDate = `${new Date().getDate() + 1} ${months[new Date().getMonth()]} ${new Date().getFullYear().toString()}`;
//             }
//         } else {
//             if(new Date().getDate() == 31) {
//                 nextDate = `${1} ${months[new Date().getMonth() + 1]} ${new Date().getFullYear().toString()}`;
//             } else {
//                 nextDate = `${new Date().getDate() + 1} ${months[new Date().getMonth()]} ${new Date().getFullYear().toString()}`;
//             }
//         }
//     }
// }

//setting date value in config part
let todayDateArr = urlParams.get("start").split("-");
let nextDateArr = urlParams.get("end").split("-")

let todayDate = todayDateArr[2] + " " + months[todayDateArr[1] - 1] + " " + todayDateArr[0];
let nextDate = nextDateArr[2] + " " + months[nextDateArr[1] - 1] + " " + nextDateArr[0];

document.querySelector("#date-start-select-display").innerHTML = todayDate + " - " + nextDate;

document.querySelector("#dateIn").value = urlParams.get("start");
document.querySelector("#dateOut").value = urlParams.get("end");


if(members>0) {
    document.querySelector("#num-of-adults").innerHTML = members;    
}

// document.querySelector("#date-start-select-display").innerHTML = todayDate + " - " + nextDate;


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


startDate = urlParams.get("start");
endDate = urlParams.get("end")



if(startDate == undefined || startDate == null || endDate == undefined || endDate == null) {
    
    //date select feature
    dateButton()
    // urlParams.append("start",new Date().toISOString().split('T')[0])
    // window.location.search = urlParams

} else if(!members || members<=0) {

    //number of people select feature
    urlParams.append("members",1)
    window.location.search = urlParams

} else {

    //whole page logic


}