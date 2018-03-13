'use strict';

const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()
app.disable('x-powered-by')

app.set('port', (process.env.PORT || 3000))


app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'))


app.listen(app.get('port'), () => console.log(`Listening on: http://localhost:${app.get('port')}`))
