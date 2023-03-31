const config = require('config');
const mongoose = require('mongoose');

mongoose.connect(config.get('db.conn', {
    useNewUrlParser: true, 
    useUnifiedTopology: true}))
        .then(() => {
            console.log('Connected to MongoDB...')
        })