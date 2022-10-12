const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../public/templates/views')
const partialsPath = path.join(__dirname, '../public/templates/partials')

// setuo handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'Margo'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Margo'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        msg: 'how can i help?',
        name: 'margo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'you must provide address'
        })
    }
        geocode(req.query.address, (error, {lat, lon, location} = {}) => {
            if (error) {
                return res.send({error})
            }
            //forecast(data.lat, data.lon, (error, forecastData) => {
            forecast(lat, lon, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    location,
                    temperature: forecastData,
                    address: req.query.address
                })
    
    })
    
    

    })
})

app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'you must provide search term'

        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})  

app.get('/help/*', (req, res)=>{
    res.render('404' , {
        title: '404',
        name: 'margo',
        errorMsg: 'Help article tot found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'margo',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server running')
})