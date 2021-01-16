const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//Define handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Index'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must have to provide address'
        })
    }
    geocode(req.query.address, (error, geocode_data = {}) => {
        if(error){
            return res.send({error})
        }
        
        forecast(geocode_data.latitude, geocode_data.longitude, (error, forecast_data) => {
            if(error){
                return res.send({error})
            }
            
            res.send({
                location: geocode_data.location,
                temperature: forecast_data
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must have to provide serach term'
        })
    }
    res.send({
        product: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404'
    })
})

app.listen(port,() => {
    console.log('Server is UP on port '+ port)
})

