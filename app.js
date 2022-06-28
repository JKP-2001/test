const express = require('express')
const app = express()

const port = 5000

app.set('view engine','ejs');
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/Placement");

//for serving static files
app.use(express.static(__dirname + '/public'));
app.use(express.json());





app.use("/api/student",require("./Routes/Student"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})