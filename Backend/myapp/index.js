const express = require("express");
const Users = require('./src/models/users.js')
const Details = require('./src/models/details.js')
require("dotenv").config();
const app = express();
const port = 3003;
const usersRouter = require('./src/routes/users.js');
const detailsRouter = require('./src/routes/details.js');

// Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://ecestnrkl:9A2UKcsc6ckqUSYj@webtechlabcluster.c0ei7hp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());
app.use('/users', usersRouter);
app.use('/details', detailsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/check", (req, res) => {
  res.status(200).send("Funktioniert.")
} )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

const main = async () => {
  //const details = await Details.findById('63c7283be9617973d0b75ff8')
  //await details.populate('owner').execPopulate()
  //console.log(details.owner)

  const users = await Users.findById('63c7283be9617973d0b75ff8')
  await users.populate('details').execPopulate()
  console.log(users.details)
}
