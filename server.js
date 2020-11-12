const express = require('express')
const app = express()

const port = process.env.PORT || 5555
const baseUrl = process.env.BASE_URL || 'http://localhost'

const walk = require('walk')
const cors = require('cors')
// const path = require('path')

app.use(express.static('public'))
app.use(cors())

app.get('/', (req, res) => {
  res.json({
    "/list": "List all musics",
    "/download/:music" : "Retrive Music"
  })
})

app.get('/list', (req, res) => {
  const testFolder = './public/'
  const ALLfiles = [] 

  var walker  = walk.walk(testFolder, { followLinks: false });
  walker.on('file', function(root, stat, next) {
    ALLfiles.push(`${baseUrl}:${port}/${stat.name}`);
    next();
  });

  walker.on('end', function() {
    res.json(ALLfiles);
  });
})

app.get('/download/:music', (req, res) => {
  const file = `${__dirname}/music/${req.params.music}.mp3`
  res.sendFile(file)
})

app.listen(port, () => {
  console.log(`App listening at ${baseUrl}:${port}`)
})