// const geocode = require('./utils/geocode');
// const forecast = require('./utils/forecast');
let address = ''
const mapKey = 'pk.eyJ1IjoidG9tYXNwaW5jaCIsImEiOiJja2t1NjVheXIxMjF5MnZwNnJzY2I1eXRzIn0.4dRJSUrpwy8zANdvBcSA0A';
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
        + address 
        + '.json?access_token='
        + mapKey
        + '&limit=1'
const api_key = '724a6b0d7155f15f17d1ca834d82fb47';

console.log('clientside javascript is loaded!')



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#pOne')
const messageTwo = document.querySelector('#pTwo')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() // use this to prevent browser from refreshing
    let location = searchElement.value

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((res) => {
        res.json().then((data) => {    
            if (data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })   
    })

})