const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000
require('dotenv').config()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


console.log(process.env.mongoURI) 

mongoose
    .connect(process.env.mongoURI, {useNewUrlParser: true,  useUnifiedTopology: true})
    .then( () =>console.log('MongoDb Conneced..'))
    .catch( (err) => {
});


app.get('/', (req, res) => {
    res.send('Test 123') // for all the react stuff
})

app.use('/posts', require('./routes/posts_route'))


app.listen(PORT, err =>{
    if(err) throw err;
    console.log(`Server is running on ${PORT}`)
})

