const config = require('config');
const mongoose = require('mongoose');

module.exports = mongoose.connect(config.get('db.conn'), {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
})
.then(() => {
        console.log('Connected to MongoDB...')
    })
.catch((err) => {
    console.error(`Error connecting to MongoDB: \n${err}`);
})