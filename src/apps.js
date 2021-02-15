const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const rootDir = express.static(path.join(__dirname,'../public'));
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs'); //app.set command needs to look exactly like this to make the hbs libraries available.
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use('',rootDir);


// the next three app.get() functions use the .hbs files to render the title (index), about and help pages !!
app.get('',(req, res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Chad Leonard'
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        title: 'About This website',
        desc: 'This is who we are!',
        name: 'Chad Leonard'
    })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        title: 'Help Page',
        desc: 'Can we be of assistance!',
        name: 'Chad Leonard'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'you must provide an address!!'
        });
    };
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location,
                longitude: longitude,
                latitude: latitude
                });
        });
    });
});



app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        });
    };
    console.log(req.query.search)
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404 Page',
        message: 'Help article not found.',
        name: 'Chad Leonard'
    });
});

app.get('*', (req, res) => {
    res.render('error',{
        title: '404 Page',
        message: 'Page not found.',
        name: 'Chad Leonard'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000.')
});