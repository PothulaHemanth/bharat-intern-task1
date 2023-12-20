const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

mongoose.connect("mongodb://0.0.0.0:27017/registration",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function(callback) {
  console.log("connection succeeded");
});


const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dob: Date,
  acceptTerms: String,
});


const Registration = mongoose.model("Registration", registrationSchema);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/registration.html");
});


app.post("/submit",(req, res) => {
  const { name, email, password, dob, acceptTerms } = req.body;

  const registration = new Registration({
    name,
    email,
    password,
    dob,
    acceptTerms,
  });

  try {
    registration.save();
    res.redirect("/success");
  } catch (error) {
    res.redirect("/error");
  }
});
app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});
app.get("/error", (req, res) => {
  res.sendFile(__dirname + "/error.html");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




