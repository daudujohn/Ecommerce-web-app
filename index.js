const express = require('express')
const app = express()

PORT = process.env['PORT'] || 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})