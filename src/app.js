/*jslint es6 */
const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const PORT =process.env.PORT || 3000;
const app = express();

const publicDirPath = path.join(__dirname, '../public');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    //res.send('Hello world');
    res.render('index', {
        title: 'home page',
        name: 'abhijeet navgire'
    });
});

app.get('/about(us)?', (req, res) => {
    res.send('About Us');
});

app.get('/contact(page)?(us)', (req, res) => {
    res.send('Contact page');
});

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        res.statusCode = 400;
        res.send({
            code: 400,
            error: "You must provide search string"
        });
    }

    geocode(req.query.search, (error, {latitude, longitude, place_name: place} = {}) => {
        if (error) {
            res.statusCode = 400,
            res.send({
                code: 404,
                error: error
            });
            return false;
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.statusCode = 400,

                console.log(error);
                res.send({
                    code: 404,
                    error: error
                });
                return false;
            }

            res.send({
                latitude: latitude,
                longitude: longitude,
                temperature: forecastData.temperature,
                summary: forecastData.summary,
                rainProbability: forecastData.rainProbability
            });
        });
    });
});

app.get('*', (req, res) => {
    res.statusCode = 404;
    res.statusMessage = 'PAGE NOT FOUND!';
    res.send('404 Page not found!');
});

app.listen(PORT, (error) => {
    if (error) throw error;

    console.log(`Server is running at ${PORT} port`);
});