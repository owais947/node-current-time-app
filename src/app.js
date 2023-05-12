const express = require('express')
const hbs = require('hbs')
const path = require('path')
const geoCode = require('./geoCode.js')
const getTime = require('./getTime.js')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Current Time App',
        content : 'Use this website to get Current time of anywhere!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        content : 'About me'
    })
})

app.get('/time', (req, res) => {
    if(!req.query.address){
        res.send({
            error : 'Enter a location.'
        })
    }
    else {
        geoCode(req.query.address, (error, place) => {
            if(error){
                res.send({
                    error : 'Error while connecting....'
                })
            }
            else {
                getTime(place.longitude, place.latitude, (error, curr) => {
                    if(error){
                        res.send({
                            error : 'Error while retrieving time data...'
                        })
                    }
                    else {
                        res.send({
                            current : curr
                        })
                    }
                })
            }
        })
    }
})

app.get('*', (req, res) => {
    res.render('error', {
        title : '404',
        content : 'Link not found...'
    })
})

app.listen('3000', () => {
    console.log('current-time-app running on port 3000...')
})