const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        proxy('/data/get-trails', {
            target: 'https://www.hikingproject.com',
            changeOrigin: true
        })
    ),

    app.use(
        proxy('/data/2.5/forecast', {
            target: 'https://api.openweathermap.org',
            changeOrigin: true
        })
    )
}

//http://localhost:3000/data/get-trails?lat=0&lon=0&minLength=1&maxDistance=10&sort=&maxResults=50&key=200749828-0bd185ee7af374a0fb370047ff15cc20