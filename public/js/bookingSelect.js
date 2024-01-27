const urlParams = new URLSearchParams(location.search);

let members = urlParams.get("members");
let date = urlParams.get("date");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


document.querySelector("#dateIn").value = urlParams.get("start");
document.querySelector("#dateOut").value = urlParams.get("end");


if(members>0) {
    document.querySelector("#num-of-adults").innerHTML = members;    
}

document.getElementById("dateIn").setAttribute('min', new Date().toISOString().split('T')[0]);
document.getElementById("dateOut").setAttribute('min', document.getElementById("dateIn").value);

function dateChange() {
    //setting min value of date
    document.getElementById("dateIn").setAttribute('min', new Date().toISOString().split('T')[0]);
    document.getElementById("dateOut").setAttribute('min', document.getElementById("dateIn").value);

    noOfNights()
    console.log(numberOfNights)

    if(numberOfNights <= 0) {
        document.querySelector(".date-selector-error").innerHTML = "Check-out date must be greater than Check-in date"
        document.querySelector(".date-selector-error").className += " visible";
    } else {
        document.querySelector(".date-selector-error").className += "date-selector-error";
    }

    startDate = document.querySelector("#dateIn").value;
    endDate = document.querySelector("#dateOut").value;
}


function dateSelect() {
    startDate = document.querySelector("#dateIn").value;
    endDate = document.querySelector("#dateOut").value;

    console.log(startDate + endDate)

    if(startDate == "" && endDate == "") {
        document.querySelector(".date-selector-error").innerHTML = "Enter both Check-IN and OUT dates";
        document.querySelector(".date-selector-error").className += " visible";
        
    } else {
        urlParams.set("start", startDate);
        urlParams.set("end", endDate);
    
        window.location.search = urlParams
    }
}

function dateButton() {
    document.querySelector(".date-select-overlay-container").className += " overlay-visible";
}
document.querySelector("body").addEventListener("click", (e) => {
    if (((startDate != undefined && endDate != undefined) || (startDate != null && endDate != null)) && (numberOfNights > 0)) {
        if(e.target.className == "date-select-overlay-container overlay-visible") {
            document.querySelector(".date-select-overlay-container").className = "date-select-overlay-container"
        };
    }
})

function dateCheck() {
    if(numberOfNights <= 0) {
        document.querySelector(".date-selector-error").innerHTML = "Check-out date must be greater than Check-in date"
        document.querySelector(".date-selector-error").className += " visible";
    } else {
        document.querySelector(".date-selector-error").className += "date-selector-error";
    }
}



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

function noOfNights() {
    if(document.querySelector("#dateIn").value != "" && document.querySelector("#dateOut").value != "") {
        let date1 = new Date(`${document.querySelector("#dateIn").value.split("-")[1]}/${document.querySelector("#dateIn").value.split("-")[2]}/${document.querySelector("#dateIn").value.split("-")[0]}`)
        let date2 = new Date(`${document.querySelector("#dateOut").value.split("-")[1]}/${document.querySelector("#dateOut").value.split("-")[2]}/${document.querySelector("#dateOut").value.split("-")[0]}`)
    
        let timeDiff = date2.getTime() - date1.getTime();
        numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    }
}

let selectedRoom = "none";
let roomList;
let numberOfNights;



let roomSelectButton = (e) => {
    for(roomContainers of document.querySelectorAll(".room-containers")) {
        roomContainers.className = "room-containers"
    }
    for(selectButton of document.querySelectorAll(".selectButtons")) {
        selectButton.innerText = "Select room"
    }
    for(room of roomList) {
        if(room.id == e.attributes.room.value) {
            selectedRoom = room
            document.querySelector(`#${selectedRoom.id}id`).innerText = "Selected"
            document.querySelector(".room-final-pricing-container").className += " final-pricing-visible"
            document.querySelector("#room-price").innerHTML = `&#x20b9; ${selectedRoom.price*numberOfNights*members}.00`
            document.querySelector("#room-tax").innerHTML = `&#x20b9; ${selectedRoom.price*numberOfNights*members*18/100}`
            document.querySelector("#final-price").innerHTML = `&#x20b9; ${selectedRoom.price*numberOfNights*members}.00`
        }
    }
    document.querySelector(`#${selectedRoom.id}`).className += " room-containers-selected"
    document.querySelector("#continue-button").setAttribute("allowed", "true")
    document.querySelector("#continue-button").className += " button-allowed"

}

let finalPrice;
let orderId;
let options;


document.getElementById("continue-button").addEventListener("click", (e) => {
    if(e.target.attributes.allowed.value == "true") {
        
        e.target.innerText = "Please wait"
        axios.post(`/booking/pay/${selectedRoom.id}/${members}/${numberOfNights}`)
        .then((res) => {
            finalPrice = res.data.amount
            orderId = res.data.orderId
        })
        .then((res => {
            options = {
                "key": "rzp_test_rC5dGfmyCS928D", // Enter the Key ID generated from the Dashboard
                "amount": `${finalPrice}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Arsanya",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": `/booking/success/?roomId=${selectedRoom.id}&bookedOn=${new Date().toISOString().split('T')[0]}&checkIn=${startDate}&checkOut=${endDate}&nights=${numberOfNights}&amount=${finalPrice}`,
                // "prefill": {
                //     "name": userName,
                //     "email": userEmail
                // },
                "theme": {
                    "color": "#3399cc"
                },
            };
        }))
        .then((res) => {
            e.target.innerText = "Confirm"
            let rzp1 = new Razorpay(options);
            rzp1.open();
            e.preventDefault();
        })


        
    }
})


startDate = urlParams.get("start");
endDate = urlParams.get("end");


noOfNights()

if(startDate == undefined || startDate == null || endDate == undefined || endDate == null || numberOfNights <= 0) {
    
    //date select feature
    dateButton()
    dateCheck()

} else if(!members || members<=0) {

    //number of people select feature
    urlParams.set("members",1)
    window.location.search = urlParams

} else {

    //whole page logic

    dateCheck()
    noOfNights()

    document.querySelector("#date-start-select-display").innerText = `${startDate} - ${endDate}`
    document.querySelector(".members-select-container input").setAttribute("value", members);

    axios.post(`/booking/room`)
    .then((res) => {
        roomList = res.data.room;
    })

    document.querySelector("#check-in-out-date").innerHTML = `${startDate} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg> ${endDate}`
    document.querySelector("#number-of-adults").innerHTML = `${members} adult(s)`
    document.querySelector("#no-of-nights").innerHTML = `${numberOfNights} night(s)`


}