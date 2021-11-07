const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const path = require('path')

const app = express()
const route = require("./routes/route");

moment.tz('Asia/Jakarta');
require('dotenv').config()

const PORT = process.env.PORT || 2323


//#region MIDLEWARE
// static
app.use(`/${process.env.IMAGE_PATH}`, express.static(path.join(__dirname, process.env.IMAGE_PATH)))
// enable cors origin
app.use(cors())
// parse application/json
app.use(bodyParser.json({limit : "100mb"}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit : "100mb", extended: false }))

// let setCache = function (req, res, next) {
//     const period = 60 * 60 * 24 * 30        // 1 month 
  
//     // if (req.method == 'GET') {
//     //   res.set('Cache-control', `public, max-age=${period}`)
//     // } else {
//     //   res.set('Cache-control', `no-store`)
//     // }

//     res.set('Cache-control', `public, max-age=${period}`)

//     // remember to call next() to pass on the request
//     next()
//   }
// app.use(setCache)
//#endregion



//#region ENDPOINT
app.get('/', (req, res) => {
    return res.json({
        code: 0,
        description: 'backend-api product catalog apps 🚀🚀🚀',
        author: 'ichsankurnia 😎',
    })
})

app.use('/api/', route)

/** Not found handler */
/** The 404 Route (ALWAYS Keep this as the last route) */
app.get('*', function(req, res){
    return res.status(404).json({code: 404, message: 'URL Not Found', data: null});
});
app.post('*', function(req, res){
    return res.status(404).json({code: 404, message: 'URL Not Found', data: null});
});
app.patch('*', function(req, res){
    return res.status(404).json({code: 404, message: 'URL Not Found', data: null});
});
app.delete('*', function(req, res){
    return res.status(404).json({code: 404, message: 'URL Not Found', data: null});
});

/** Error request handler */
app.use((err, req, res, next) => {
    console.log(err)
    
    let response = {
        code: err.status,  
        message: err.message, 
        data: null
    };

    return res.send(response);
})
//#endregion


app.listen(PORT, () => {
    console.log('Server running on port :', PORT)
})