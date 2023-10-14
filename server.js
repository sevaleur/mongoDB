const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()

// Mongo 
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('database'))

// APP
/* const formData = require('express-form-data')
app.use(formData.parse()) */
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ROUTES 
app.get('/', async(req, res) => 
{
    console.log('server svarer')
    return res.status(200).json({message: 'velkommen'})
})

app.use('/people', require('./routes/people.routes'))
app.use('/product', require('./routes/product.routes'))
app.use(cors({origin: true}))
app.use(express.static('public'))

// No match 
app.get('*', async(req, res) => 
{
    res.status(404).json({message: 'Siden findes ikke'})
})

// LISTEN 
app.listen(process.env.PORT, () => console.log('Server startet - lytter på port: ' + process.env.PORT))