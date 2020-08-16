const path = require('path')
const express = require('express')
const hbs = require('hbs',)
const author = 'Deya Motawie'
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public/'))
const app =  express()
// Define paths for express config

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Deya Motawie'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Deya Motawie'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        helpText: 'Help Me',
        title: 'Help',
        name: author
    })
})
// app.get('/',(req,res) => {
//     res.send('<h1>Weather</h1>')
// })
// app.get('/help', (req,res) => {
//     res.send({
//         name: 'Deya',
//         age:50
//     }
//     )
// })
// app.get('/about', (req,res) => {
//     res.send('<h1>About</h1>')
// })
app.get('/weather', (req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address for the weather'
        })} else
    // } else {
    //     res.send({
    //         forecast: 'It is snowing',
    //         location: 'Philadelphia',
    //         address: req.query.address
    //     })
    // }
    {   
        const address = req.query.address
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({error})
                return console.log(error)
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                    return console.log(error)
                }
    
                console.log(location)
                console.log(forecastData)
                res.send ({
                    forecast: forecastData,
                    location,
                    address
                })
            })
        })
    }

    // res.send({
    //     forecast: 'Snowing',
    //     Location:'Philadelphia'
     })
// app.com
//app.com/help
//app.com/about

app.get('/products',(req,res) => {
    if (!req.query.search) {
       return  res.send({
            error: 'You must providd a search term'
        })
    }
    console.log( req.query)
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res) => {
// res.send('Help article not found!')
res.render('404',{
    title: '404',
    errorMessage: "Help Article not found!",
    name: author
})


})
app.get('*',(req,res) => {
    // res.send('My 404 Page...')
    res.render('404',{
        title: '404',
        errorMessage: "Page not found!",
        name: author
    })
    
})
app.listen(3000,() => {
    console.log('Server is up on port 3000.')
})