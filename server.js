const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URI;

const connectDatabase = async () => {
  try {    
    await mongoose.connect(uri);

    console.log("connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDatabase();

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

// Routes
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // check email
    const user = await User.findOne({ email: email });

    if (user) {
      // check password
      if (password === user.password) {
        res.send({ message: "Login successfully", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "Please login to proceed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/signup", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email: email }).exec();

    if (existingUser) {
      return res.send({ message: "User is already registered" });
    }

    // Create a new user
    const user = new User({
      fname,
      lname,
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    res.send({ message: "Account has been created!! Please Login" });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(8000, () => {
  console.log("Server starting at 8000");
});



