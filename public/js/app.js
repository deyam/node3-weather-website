console.log('Client side javascript file is loaded!N')

// // fetch('http://api.weatherstack.com/current?access_key=09c65ecdbc12e3315f1fc29ad22beee3&query=30.05611,31.23944').then( (response) => {
//     fetch('http://localhost:3000/weather?address=boston').then( (response) => {
//         response.json().then((data) => {
//             if (data.error) {
//                 console.log(data.error)
//             } else {
//                 console.log(data.locatioin)
//                 console.log(data.forecast)
//             }
//         // console.log(data)
//         // console.log(data.location)
//         // console.log(data.current.temperature)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// Change
// messageOne.textContent = 'From Javascript'
// add event listener to the element ...

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
 messageOne.textContent = 'Loading...'
 messageTwo.textContent =''   
    fetch('http://localhost:3000/weather?address='+location).then( (response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
    })
})



})
