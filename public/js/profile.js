const topButton = document.querySelector("#my-account-anchor")
topButton.innerHTML = "Book a room"
topButton.href = "/booking/new"
// topButton.style.backgroundColor = "#8d7535"

axios.post('/booking/room')
.then((res) => {
    return res.data.room;
})
.then((roomData) => {
    document.querySelectorAll('.booking-right-container').forEach((item, index) => {
        // console.log(item.id)
        
        for(room of roomData) {
            if(room.id == item.id) {
                // console.log(room.image)
                document.querySelectorAll(`#${item.id} img`).forEach(image => image.setAttribute('src', room.img))
                document.querySelectorAll(`#${item.id} h4`).forEach(roomName => roomName.innerText = room.name)
            }
        }
    
        // roomImg.setAttribute('src', roomData[index].image)
    })
})



function deleteBooking(orderid) {
    axios.delete(`/booking/${orderid}`)
    .then((res) => {
        window.location.href = "/profile"
    })
    .catch((err) => {
        window.location.href = "/profile"
    })
}