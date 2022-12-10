const express = require('express');
const app = express();
const flash = require('express-flash')

const logger = require('morgan')

require('dotenv').config({path: './config/.env'})

//routes
const mainRoutes = require('./routes/main')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(logger('dev'))

app.use('/', mainRoutes)

const PORT = 8000;
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT || PORT}`)
})