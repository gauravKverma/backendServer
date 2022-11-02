const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./schema/userSchema");
const app = express();

app.use(express.json());
app.use(cors());
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://gauravverma:gaurav112233@cluster0.hldpuc5.mongodb.net/?retryWrites=true&w=majority";


app.get("/", (req,res) => {
  res.send("Hello");
})

app.get("/register" , async (req,res) => {
  let data=await UserModel.find({});
  res.send(data);
})
app.post("/register", (req, res) => {
  let data = req.body;
  const user = new UserModel(data);
  user.save();
  res.send("user saved");
});
app.post("/login", async (req, res) => {
  let data = req.body;
  let user = await UserModel.find({ email: data.email });
  console.log(user);
  if (user.length !== 0) {
    res.send("logged in");
  } else {
    res.send("error");
  }
});

app.post("/calculateBMI", async (req, res) => {
  let data = req.body;
  let { height, weight } = data;
  let BMI = weight / height;
  console.log(BMI);
  if (BMI > 18.5 && BMI < 24.9) {
    return res.send("Normal Weight");
  } else if (BMI > 25 && BMI < 29.9) {
    return res.send("Overweight");
  } else if (BMI > 30 && BMI < 34.9) {
    return res.send("Obesity");
  } else if (BMI > 35 && BMI < 39.9) {
    return res.send("Extreme Obesity");
  } else if (BMI < 18.5) {
    return res.send("Underweight");
  }
});

app.listen(process.env.PORT || 8000, async () => {
  await mongoose.connect(uri);
  console.log("server running");
});
