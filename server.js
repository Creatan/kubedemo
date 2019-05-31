const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

dotenv.config()

const port = process.env.PORT || 3000

mongoose.connect(process.env.DBURI, { useNewUrlParser: true })

const movieSchema = mongoose.Schema({
  name: String,
  year: String,
  director: String,
})

const movieModel = mongoose.model('movie', movieSchema)

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const movies = await movieModel.find({}).exec()
  res.render('index', {movies})
})
app.post('/', async (req, res) => {
  const movie = new movieModel({
    name: req.body.name,
    year: req.body.year,
    director: req.body.director
  })
  await movie.save()

  const movies = await movieModel.find({}).exec()
  res.render('index', {movies})
})

app.listen(port)
console.log(`Listening to port ${port}`)