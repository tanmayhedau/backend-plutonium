const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://tannmayhedau619:Tanmay%40619@cluster0.fw1xhuw.mongodb.net/tanmayhedau619-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("mera mongo chalne laga"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});






